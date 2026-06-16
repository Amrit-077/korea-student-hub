import { useParams, Link, Navigate } from 'react-router-dom'
import { visaGuides } from '../data/visaGuides'
import PageHeader from '../components/shared/PageHeader'
import Card from '../components/ui/Card'

export default function VisaGuide() {
  const { id } = useParams()
  const guide = visaGuides[id]

  if (!guide) return <Navigate to="/visa/d2" replace />

  const navItems = [
    { id: 'd2', label: 'D-2 Student Visa' },
    { id: 'd4', label: 'D-4 Training Visa' },
    { id: 'work-permit', label: 'Work Permit' },
    { id: 'arc', label: 'ARC Registration' },
  ]

  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-6">
      {/* Sidebar nav */}
      <aside className="space-y-1">
        <p className="text-xs font-semibold text-neutral-700/50 uppercase tracking-wide px-3 mb-2">
          Visa Guides
        </p>
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={`/visa/${item.id}`}
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              id === item.id
                ? 'bg-secondary-500 text-white'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Content */}
      <div className="space-y-6">
        <PageHeader title={guide.title} subtitle={guide.subtitle} />

        <Card>
          <h2 className="font-semibold text-secondary-700 mb-2">Overview</h2>
          <p className="text-sm text-neutral-700 leading-relaxed">{guide.overview}</p>
        </Card>

        <Card>
          <h2 className="font-semibold text-secondary-700 mb-3">Requirements</h2>
          <ul className="space-y-2">
            {guide.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="mt-0.5 text-primary-500">✓</span>
                {req}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-semibold text-secondary-700 mb-3">Required Documents</h2>
          <div className="divide-y divide-neutral-100">
            {guide.documents.map((doc, i) => (
              <div key={i} className="py-2.5 flex justify-between gap-4 text-sm">
                <span className="font-medium text-neutral-900">{doc.name}</span>
                <span className="text-neutral-700/70 text-right">{doc.note}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-secondary-700 mb-4">Step-by-Step Process</h2>
          <div className="space-y-4">
            {guide.steps.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="shrink-0 w-7 h-7 rounded-full bg-secondary-500 text-white text-xs font-bold flex items-center justify-center">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{s.title}</p>
                  <p className="text-sm text-neutral-700 mt-0.5 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-warning/30 bg-orange-50">
          <h2 className="font-semibold text-orange-700 mb-3">⚠️ Important Notes</h2>
          <ul className="space-y-2">
            {guide.notes.map((note, i) => (
              <li key={i} className="text-sm text-orange-800 leading-relaxed">
                • {note}
              </li>
            ))}
          </ul>
          <p className="text-xs text-orange-700/70 mt-4 border-t border-orange-200 pt-3">
            This is general guidance only. Always verify with your university's international
            office or the Korea Immigration Service (☎ 1345).
          </p>
        </Card>
      </div>
    </div>
  )
}