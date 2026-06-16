import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { question, session_id } = await req.json()

    if (!question?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Question is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // 1. Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // 2. Embed the question using OpenAI
    const embeddingRes = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: question,
      }),
    })

    const embeddingData = await embeddingRes.json()
    const embedding = embeddingData.data[0].embedding

    // 3. Search for relevant chunks using pgvector
    const { data: chunks, error: searchError } = await supabase.rpc(
      'match_article_chunks',
      {
        query_embedding: embedding,
        match_threshold: 0.5,
        match_count: 5,
      }
    )

    if (searchError) throw searchError

    // 4. Build context from retrieved chunks
    let context = ''
    const citedArticleIds: string[] = []

    if (chunks && chunks.length > 0) {
      context = chunks
        .map((chunk: any, i: number) => {
          if (!citedArticleIds.includes(chunk.article_id)) {
            citedArticleIds.push(chunk.article_id)
          }
          return `[Source ${i + 1}]: ${chunk.chunk_text}`
        })
        .join('\n\n')
    }

    // 5. Call Claude API
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': Deno.env.get('ANTHROPIC_API_KEY')!,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        system: `You are a helpful assistant for international students in South Korea. 
You answer questions about visas, work permits, student life, and related topics.

IMPORTANT RULES:
- Only answer based on the provided context sources below.
- If the context does not contain enough information, say so honestly.
- Always recommend verifying important information with the university international office or Korea Immigration Service (1345).
- Never give definitive legal advice.
- Be friendly, clear, and concise.
- Respond in the same language the user writes in (English, Korean, or Nepali).

CONTEXT FROM KNOWLEDGE BASE:
${context || 'No relevant articles found for this question.'}`,
        messages: [
          { role: 'user', content: question }
        ],
      }),
    })

    const claudeData = await claudeRes.json()
    const answer = claudeData.content[0].text

    // 6. Save messages to database if session_id provided
    if (session_id) {
      await supabase.from('chat_messages').insert([
        {
          session_id,
          role: 'user',
          content: question,
          cited_article_ids: [],
        },
        {
          session_id,
          role: 'assistant',
          content: answer,
          cited_article_ids: citedArticleIds,
        },
      ])
    }

    return new Response(
      JSON.stringify({
        answer,
        cited_article_ids: citedArticleIds,
        sources_found: chunks?.length || 0,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Chat function error:', error)
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})