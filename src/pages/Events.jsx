import { events } from '../data/events'
import EventCard from '../components/shared/EventCard'
import PageHeader from '../components/shared/PageHeader'

export default function Events() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Events"
        subtitle="Meetups, workshops, and cultural events for international students"
      />
      <div className="space-y-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}