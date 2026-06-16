import { Link } from 'react-router-dom'

const categoryColors = {
  social: 'bg-primary-50 text-primary-700',
  education: 'bg-secondary-500/10 text-secondary-700',
  cultural: 'bg-orange-50 text-orange-700',
}

export default function EventCard({ event }) {
  const date = new Date(event.date)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })

  return (
    <Link to={`/events/${event.id}`}>
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 hover:shadow-md transition-shadow flex gap-4">
        <div className="shrink-0 text-center bg-secondary-500/10 rounded-lg px-3 py-2 w-14">
          <p className="text-xs font-medium text-secondary-600 uppercase">{month}</p>
          <p className="text-xl font-bold text-secondary-700">{day}</p>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-neutral-900 text-sm leading-snug">{event.title}</h3>
            <span className={`shrink-0 text-xs rounded-full px-2 py-0.5 font-medium ${categoryColors[event.category] || 'bg-neutral-100 text-neutral-700'}`}>
              {event.category}
            </span>
          </div>
          <p className="text-xs text-neutral-700 mt-1">
            🕐 {event.time} &nbsp;·&nbsp; 📍 {event.location}
          </p>
          {event.free ? (
            <span className="mt-2 inline-block text-xs text-green-600 font-medium">Free</span>
          ) : (
            <span className="mt-2 inline-block text-xs text-orange-600 font-medium">{event.price}</span>
          )}
        </div>
      </div>
    </Link>
  )
}