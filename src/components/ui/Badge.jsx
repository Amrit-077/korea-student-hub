const categoryStyles = {
  visa: 'bg-primary-50 text-primary-700',
  work_permit: 'bg-secondary-500/10 text-secondary-700',
  general: 'bg-neutral-100 text-neutral-700',
}

const categoryLabels = {
  visa: 'Visa',
  work_permit: 'Work Permit',
  general: 'General',
}

export default function Badge({ category, children, className = '' }) {
  const style = categoryStyles[category] || categoryStyles.general
  const label = children || categoryLabels[category] || category

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${style} ${className}`}
    >
      {label}
    </span>
  )
}