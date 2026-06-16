import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import PageHeader from '../components/shared/PageHeader'
import SearchBar from '../components/shared/SearchBar'
import FilterPanel from '../components/shared/FilterPanel'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'

const categoryFilters = [
  { label: 'All', value: 'all' },
  { label: 'Visa', value: 'visa' },
  { label: 'Work Permit', value: 'work_permit' },
  { label: 'General', value: 'general' },
]

export default function KnowledgeBase() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      let query = supabase
        .from('articles')
        .select('id, slug, category, title_en, tags, last_verified_at')
        .order('created_at', { ascending: false })

      if (category !== 'all') {
        query = query.eq('category', category)
      }

      if (search.trim()) {
        query = query.ilike('title_en', `%${search}%`)
      }

      const { data, error } = await query
      if (!error) setArticles(data || [])
      setLoading(false)
    }

    fetchArticles()
  }, [category, search])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Base"
        subtitle="Verified guides for international students in Korea"
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search articles..."
      />

      <FilterPanel
        filters={categoryFilters}
        activeFilter={category}
        onFilterChange={setCategory}
      />

      {loading ? (
        <div className="text-center py-12 text-neutral-700 text-sm">
          Loading articles...
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 text-neutral-700 text-sm">
          No articles found. Try a different search or filter.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {articles.map((article) => (
            <Link key={article.id} to={`/knowledge-base/${article.slug}`}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <Badge category={article.category} className="mb-3" />
                <h3 className="font-semibold text-neutral-900 mb-2 leading-snug">
                  {article.title_en}
                </h3>
                {article.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-neutral-100 text-neutral-700 rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-neutral-700/50 mt-3">
                  Verified: {new Date(article.last_verified_at).toLocaleDateString()}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}