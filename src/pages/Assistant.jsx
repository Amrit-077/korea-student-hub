import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import Button from '../components/ui/Button'
import PageHeader from '../components/shared/PageHeader'

const SUGGESTED_QUESTIONS = [
  'How do I apply for a work permit?',
  'What documents do I need for D-2 visa extension?',
  'How many hours can I work per week?',
  'How do I register my ARC card?',
  'What is the minimum wage in Korea?',
]

function Message({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-3`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center text-white text-sm shrink-0 mt-1">
          🤖
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-primary-500 text-white rounded-tr-sm'
            : 'bg-white border border-neutral-200 text-neutral-900 rounded-tl-sm'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.role === 'assistant' && (
          <p className="mt-2 pt-2 border-t border-neutral-100 text-xs text-neutral-700/50">
            ⚠️ General guidance only. Verify with your university or call 1345.
          </p>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm shrink-0 mt-1 font-semibold">
          U
        </div>
      )}
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start gap-3">
      <div className="w-8 h-8 rounded-full bg-secondary-500 flex items-center justify-center text-white text-sm shrink-0">
        🤖
      </div>
      <div className="bg-white border border-neutral-200 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

export default function Assistant() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([
    {
      id: '0',
      role: 'assistant',
      content: `Hi! I'm your Korea Student Hub AI Assistant. I can answer questions about visas, work permits, ARC registration, and student life in Korea.\n\nWhat would you like to know?`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)

  // Create chat session on mount
  useEffect(() => {
    if (!user) return
    const createSession = async () => {
      const { data } = await supabase
        .from('chat_sessions')
        .insert({ user_id: user.id, title: 'AI Assistant Chat' })
        .select()
        .single()
      if (data) setSessionId(data.id)
    }
    createSession()
  }, [user])

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (question) => {
    const text = question || input.trim()
    if (!text || loading) return

    setInput('')
    setError(null)

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: text },
    ])
    setLoading(true)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('chat', {
        body: { question: text, session_id: sessionId },
      })

      if (fnError) throw fnError

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.answer,
        },
      ])
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again or contact us if the issue persists.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-12rem)]">
      <PageHeader
        title="AI Assistant"
        subtitle="Ask me anything about student life in Korea"
      />

      {/* Suggested questions */}
      {messages.length === 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="text-xs bg-white border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-700 hover:border-primary-300 hover:text-primary-600 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-1">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {loading && <TypingIndicator />}
        {error && (
          <p className="text-center text-xs text-primary-600">{error}</p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-neutral-200 pt-4">
        {!user && (
          <div className="mb-3 text-center text-sm text-neutral-700">
            <Link to="/login" className="text-primary-600 font-medium">
              Log in
            </Link>{' '}
            to save your chat history.
          </div>
        )}
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about visas, work permits, student life..."
            rows={2}
            className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
          <Button
            variant="primary"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="self-end px-5"
          >
            Send
          </Button>
        </div>
        <p className="text-xs text-neutral-700/40 mt-2 text-center">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}