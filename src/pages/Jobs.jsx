import { useState } from 'react'
import { jobs } from '../data/jobs'
import JobCard from '../components/shared/JobCard'
import SearchBar from '../components/shared/SearchBar'
import FilterPanel from '../components/shared/FilterPanel'
import PageHeader from '../components/shared/PageHeader'

const cityFilters = [
  { label: 'All cities', value: 'all' },
  { label: 'Ulsan', value: 'ulsan' },
  { label: 'Busan', value: 'busan' },
  { label: 'Seoul', value: 'seoul' },
]

const typeFilters = [
  { label: 'All types', value: 'all' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Full-time', value: 'full-time' },
]

export default function Jobs() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('all')
  const [type, setType] = useState('all')

  const filtered = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
    const matchesCity = city === 'all' || job.city === city
    const matchesType = type === 'all' || job.type === type
    return matchesSearch && matchesCity && matchesType
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Part-Time Job Board"
        subtitle="Jobs available for international students with D-2 or D-4 visas"
      />

      <div className="bg-primary-50 border border-primary-100 rounded-xl px-4 py-3 text-sm text-primary-700">
        ⚠️ You must have a valid work permit (체류자격외활동허가) before starting any job.
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search jobs or companies..."
      />

      <div className="space-y-3">
        <FilterPanel filters={cityFilters} activeFilter={city} onFilterChange={setCity} />
        <FilterPanel filters={typeFilters} activeFilter={type} onFilterChange={setType} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-neutral-700">
          No jobs match your search. Try different filters.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}