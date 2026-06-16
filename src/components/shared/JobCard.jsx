import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'

export default function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`}>
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-900 truncate">{job.title}</h3>
            <p className="text-sm text-neutral-700 mt-0.5">{job.company}</p>
          </div>
          <span className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
            job.type === 'part-time'
              ? 'bg-primary-50 text-primary-700'
              : 'bg-secondary-500/10 text-secondary-700'
          }`}>
            {job.type === 'part-time' ? 'Part-time' : 'Full-time'}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-700">
          <span>📍 {job.location}</span>
          <span>💰 {job.salary}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.visaEligible.map((v) => (
            <span
              key={v}
              className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-700"
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}