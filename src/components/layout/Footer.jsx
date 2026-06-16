export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-neutral-700">
        <p className="mb-2">
          <strong>Korea Student Hub</strong> — A community resource for international students
          in South Korea.
        </p>
        <p className="text-neutral-700/70">
          Information provided is for general guidance only and is not official legal advice.
          Always confirm visa and immigration matters with your university's international
          office or the Korea Immigration Service (1345).
        </p>
        <p className="mt-4 text-xs text-neutral-700/50">
          © {new Date().getFullYear()} Korea Student Hub
        </p>
      </div>
    </footer>
  )
}