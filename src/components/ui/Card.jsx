export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white rounded-xl border border-neutral-200 shadow-sm p-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}