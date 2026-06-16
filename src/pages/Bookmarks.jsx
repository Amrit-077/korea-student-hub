import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import PageHeader from '../components/shared/PageHeader'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'

export default function Bookmarks() {
  const { user } = useAuth()
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchBookmarks = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          id,
          article:articles (
            id, slug, category, title_en, tags
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error) setBookmarks(data || [])
      setLoading(false)
    }
    fetchBookmarks()
  }, [user])

  const removeBookmark = async (bookmarkId) => {
    await supabase.from('bookmarks').delete().eq('id', bookmarkId)
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bookmarks"
        subtitle="Articles you saved for later"
      />

      {loading ? (
        <p className="text-sm text-neutral-700 text-center py-8">Loading...</p>
      ) : bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-700 text-sm mb-3">No bookmarks yet.</p>
          <Link
            to="/knowledge-base"
            className="text-primary-600 text-sm font-medium hover:underline"
          >
            Browse the Knowledge Base →
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {bookmarks.map((b) => (
            <Card key={b.id} className="relative">
              <button
                onClick={() => removeBookmark(b.id)}
                className="absolute top-4 right-4 text-neutral-700/30 hover:text-primary-500 text-lg"
                title="Remove bookmark"
              >
                ×
              </button>
              <Link to={`/knowledge-base/${b.article.slug}`}>
                <Badge category={b.article.category} className="mb-2" />
                <h3 className="font-semibold text-neutral-900 pr-6 leading-snug">
                  {b.article.title_en}
                </h3>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}