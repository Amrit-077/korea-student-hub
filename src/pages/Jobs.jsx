import { salaryInfo } from '../data/jobs'
import PageHeader from '../components/shared/PageHeader'
import Card from '../components/ui/Card'

export default function Jobs() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Part-Time Work Guide"
        subtitle="Salary information and work rules for international students in Korea"
      />

      <div className="bg-primary-50 border border-primary-100 rounded-xl px-4 py-3 text-sm text-primary-700">
        You must have a valid work permit (체류자격외활동허가) before starting any job in Korea.
      </div>

      <Card>
        <h2 className="text-lg font-bold text-secondary-700 mb-4">
          Minimum Wage {salaryInfo.year}
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-neutral-50 rounded-xl p-4 text-center">
            <p className="text-xs text-neutral-700/60 mb-1">Per Hour</p>
            <p className="text-3xl font-bold text-primary-500">{salaryInfo.hourly}</p>
          </div>
          <div className="bg-neutral-50 rounded-xl p-4 text-center">
            <p className="text-xs text-neutral-700/60 mb-1">Per Month (209 hrs)</p>
            <p className="text-2xl font-bold text-secondary-700">{salaryInfo.monthly}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-neutral-700">
          <span className="bg-green-50 text-green-700 rounded-full px-3 py-1">
            {salaryInfo.increase}
          </span>
          <span className="bg-neutral-100 text-neutral-700 rounded-full px-3 py-1">
            Effective {salaryInfo.effectiveDate}
          </span>
          <span className="bg-neutral-100 text-neutral-700 rounded-full px-3 py-1">
            Source: {salaryInfo.source}
          </span>
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-bold text-secondary-700 mb-3">
          Work Rules for International Students
        </h2>
        <ul className="space-y-3">
          {salaryInfo.notes.map((note, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
              <span className="text-primary-500 mt-0.5 shrink-0">✓</span>
              {note}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="bg-orange-50 border-orange-100">
        <h2 className="text-base font-bold text-orange-700 mb-3">
          Important Numbers
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-700">Labor Ministry Helpline</span>
            <span className="font-bold text-orange-700">1350</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-700">Immigration Contact Center</span>
            <span className="font-bold text-orange-700">1345</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-700">HiKorea (Work Permit Online)</span>
            <span className="font-bold text-orange-700">hikorea.go.kr</span>
          </div>
        </div>
      </Card>

      <p className="text-xs text-center text-neutral-700/50">
        Information verified June 2026. Always confirm with your university
        international office or call 1345.
      </p>
    </div>
  )
}