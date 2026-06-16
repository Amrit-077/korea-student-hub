import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { announcements } from '../data/announcements'
import { events } from '../data/events'
import DashboardCard from '../components/shared/DashboardCard'
import EventCard from '../components/shared/EventCard'

const quickActions = [
  { label: 'Visa Guide', icon: '🛂', to: '/visa/d2' },
  { label: 'Work Permit', icon: '💼', to: '/visa/work-permit' },
  { label: 'Find Jobs', icon: '🔍', to: '/jobs' },
  { label: 'AI Assistant', icon: '🤖', to: '/assistant' },
  { label: 'Events', icon: '📅', to: '/events' },
  { label: 'Community', icon: '💬', to: '/community' },
]

const stats = [
  { title: 'Active Visa Guides', value: '4', icon: '🛂', color: 'secondary' },
  { title: 'Job Listings', value: '6', icon: '💼', color: 'primary' },
  { title: 'Upcoming Events', value: '4', icon: '📅', color: 'green' },
  { title: 'Minimum Wage', value: '₩10,030', subtitle: 'Per hour (2025)', icon: '💰', color: 'orange' },
]

const categoryBadge = {
  visa: 'bg-primary-50 text-primary-700',
  work: 'bg-secondary-500/10 text-secondary-700',
  education: 'bg-green-50 text-green-700',
}

export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Student'
  const upcomingEvents = events.slice(0, 2)

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-secondary-700 to-secondary-500 rounded-2xl p-6 text-white">
        <p className="text-secondary-100 text-sm mb-1">Welcome back 👋</p>
        <h1 className="text-2xl font-bold mb-2">{firstName}</h1>
        <p className="text-secondary-100 text-sm">
          Here's what's new for international students in Korea.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <DashboardCard key={s.title} {...s} />
        ))}
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-base font-semibold text-neutral-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="flex flex-col items-center gap-2 bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-md transition-shadow text-center"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium text-neutral-700 leading-tight">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Announcements */}
        <section>
          <h2 className="text-base font-semibold text-neutral-900 mb-3">
            Latest Announcements
          </h2>
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm divide-y divide-neutral-100">
            {announcements.map((a) => (
              <div key={a.id} className="px-4 py-3 flex items-start gap-3">
                {a.important && (
                  <span className="mt-0.5 shrink-0 w-2 h-2 rounded-full bg-primary-500" />
                )}
                <div className={a.important ? '' : 'ml-5'}>
                  <p className="text-sm text-neutral-900 leading-snug">{a.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryBadge[a.category] || 'bg-neutral-100 text-neutral-700'}`}>
                      {a.category}
                    </span>
                    <span className="text-xs text-neutral-700/50">{a.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-neutral-900">Upcoming Events</h2>
            <Link to="/events" className="text-xs text-primary-600 font-medium hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}