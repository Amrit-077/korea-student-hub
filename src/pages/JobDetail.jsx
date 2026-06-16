import { useParams, Link, Navigate } from 'react-router-dom'
import { jobs } from '../data/jobs'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function JobDetail() {
  const { id } = useParams()
  const job = jobs.find((j) => j.id === id)

  if (!job) return <Navigate to="/jobs" replace />

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/jobs" className="text-sm text-primary-600 hover:underline">
        ← Back to jobs
      </Link>

      <Card>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h1 className="text-xl font-bold text-secondary-700">{job.title}</h1>
            <p className="text-neutral-700 mt-0.5">{job.company}</p>
          </div>
          <span className={`shrink-0 text-xs rounded-full px-3 py-1 font-medium ${
            job.type === 'part-time'
              ? 'bg-primary-50 text-primary-700'
              : 'bg-secondary-500/10 text-secondary-700'
          }`}>
            {job.type}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-neutral-50 rounded-lg p-3">
            <p className="text-xs text-neutral-700/60 mb-0.5">Location</p>
            <p className="text-sm font-medium">📍 {job.location}</p>
          </div>
          <div className="bg-neutral-50 rounded-lg p-3">
            <p className="text-xs text-neutral-700/60 mb-0.5">Salary</p>
            <p className="text-sm font-medium">💰 {job.salary}</p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">Visa Eligibility</h2>
          <div className="flex gap-2">
            {job.visaEligible.map((v) => (
              <span key={v} className="text-xs bg-neutral-100 text-neutral-700 rounded-full px-2.5 py-1 font-medium">
                {v}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">Description</h2>
          <p className="text-sm text-neutral-700 leading-relaxed">{job.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-2">Requirements</h2>
          <ul className="space-y-1.5">
            {job.requirements.map((req, i) => (
              <li key={i} className="text-sm text-neutral-700 flex items-center gap-2">
                <span className="text-primary-500">✓</span> {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-neutral-100 pt-4">
          <p className="text-xs text-neutral-700/60 mb-3">
            Posted: {job.postedAt} · Always verify work permit eligibility before applying.
          </p>
          <Button variant="primary" className="w-full">
            Apply / Contact Employer
          </Button>
        </div>
      </Card>
    </div>
  )
}