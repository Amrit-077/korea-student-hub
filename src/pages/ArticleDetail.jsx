import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const languages = [
  { key: 'en', label: 'English' },
  { key: 'ko', label: '한국어' },
  { key: 'ne', label: 'नेपाली' },
]

export default function ArticleDetail() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [lang, setLang] = useState('en')
  const [bookmarked, setBookmarked] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error || !data) {
        setNotFound(true)
      } else {
        setArticle(data)
      }
      setLoading(false)
    }
    fetchArticle()
  }, [slug])

  useEffect(() => {
    if (!user || !article) return
    const checkBookmark = async () => {
      const { data } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('article_id', article.id)
        .single()
      setBookmarked(!!data)
    }
    checkBookmark()
  }, [user, article])

  const toggleBookmark = async () => {
    if (!user || !article) return
    if (bookmarked) {
      await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('article_id', article.id)
      setBookmarked(false)
    } else {
      await supabase
        .from('bookmarks')
        .insert({ user_id: user.id, article_id: article.id })
      setBookmarked(true)
    }
  }

  const submitFeedback = async () => {
    if (!feedbackText.trim() || !article) return
    await supabase.from('feedback').insert({
      user_id: user?.id || null,
      article_id: article.id,
      message: feedbackText,
    })
    setFeedbackSent(true)
    setFeedbackText('')
    setFeedbackOpen(false)
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-sm text-neutral-700">
        Loading article...
      </div>
    )
  }

  if (notFound) return <Navigate to="/knowledge-base" replace />

  const title = article[`title_${lang}`] || article.title_en
  const content = article[`content_${lang}`] || article.content_en

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/knowledge-base" className="text-sm text-primary-600 hover:underline">
        ← Back to Knowledge Base
      </Link>

      <Card>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <Badge category={article.category} className="mb-2" />
            <h1 className="text-xl font-bold text-secondary-700">{title}</h1>
          </div>
          {user && (
            <button
              onClick={toggleBookmark}
              className="text-xl shrink-0 mt-1"
              title={bookmarked ? 'Remove bookmark' : 'Bookmark this article'}
            >
              {bookmarked ? '🔖' : '📄'}
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-5">
          {languages.map((l) => (
            <button
              key={l.key}
              onClick={() => setLang(l.key)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                lang === l.key
                  ? 'bg-secondary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="prose prose-sm max-w-none text-neutral-700 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>

        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-neutral-100">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-neutral-100 text-neutral-700 rounded-full px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
          <p className="text-xs text-neutral-700/50">
            Last verified: {new Date(article.last_verified_at).toLocaleDateString()}
            {article.source_url && (
              <>
                {' '}·{' '}
                
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Official source
                </a>
              </>
            )}
          </p>
          <button
            onClick={() => setFeedbackOpen(!feedbackOpen)}
            className="text-xs text-neutral-700/50 hover:text-primary-600 transition-colors"
          >
            Report issue
          </button>
        </div>

        {feedbackOpen && (
          <div className="mt-4 space-y-2">
            {feedbackSent ? (
              <p className="text-sm text-green-600">Thanks for the feedback!</p>
            ) : (
              <>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="What's incorrect or outdated?"
                  rows={3}
                  className="w-full text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
                <Button variant="outline" onClick={submitFeedback}>
                  Submit feedback
                </Button>
              </>
            )}
          </div>
        )}
      </Card>

      <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 text-sm text-orange-700">
        ⚠️ This is general guidance only. Always verify with your university's international
        office or the Korea Immigration Service (☎ 1345).
      </div>
    </div>
  )
}