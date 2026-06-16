export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-secondary-700">{title}</h1>
      {subtitle && (
        <p className="mt-1 text-sm text-neutral-700">{subtitle}</p>
      )}
    </div>
  )
}