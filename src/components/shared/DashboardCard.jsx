export default function DashboardCard({ title, value, subtitle, icon, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary-50 text-primary-600',
    secondary: 'bg-secondary-500/10 text-secondary-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-neutral-700/60 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-neutral-700/60 mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={`rounded-lg p-2.5 text-xl ${colors[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}