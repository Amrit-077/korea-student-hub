import { useParams, Link, Navigate } from 'react-router-dom'
import { events } from '../data/events'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function EventDetail() {
  const { id } = useParams()
  const event = events.find((e) => e.id === id)

  if (!event) return <Navigate to="/events" replace />

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/events" className="text-sm text-primary-600 hover:underline">
        ← Back to events
      </Link>

      <Card>
        <div className="mb-4">
          <span className="text-xs font-medium bg-secondary-500/10 text-secondary-700 rounded-full px-2.5 py-1">
            {event.category}
          </span>
        </div>
        <h1 className="text-xl font-bold text-secondary-700 mb-4">{event.title}</h1>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-neutral-50 rounded-lg p-3">
            <p className="text-xs text-neutral-700/60 mb-0.5">Date & Time</p>
            <p className="text-sm font-medium">📅 {event.date} at {event.time}</p>
          </div>
          <div className="bg-neutral-50 rounded-lg p-3">
            <p className="text-xs text-neutral-700/60 mb-0.5">Location</p>
            <p className="text-sm font-medium">📍 {event.location}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-2">About this event</h2>
          <p className="text-sm text-neutral-700 leading-relaxed">{event.description}</p>
        </div>

        <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
          <p className="text-sm font-medium">
            {event.free ? (
              <span className="text-green-600">✅ Free event</span>
            ) : (
              <span className="text-orange-600">🎫 {event.price}</span>
            )}
          </p>
          <Button variant="primary">Register Now</Button>
        </div>
      </Card>
    </div>
  )
}