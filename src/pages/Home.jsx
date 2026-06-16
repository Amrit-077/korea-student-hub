import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

const categories = [
  {
    key: 'visa',
    title: 'Visa Information',
    description: 'D-2, D-4 visas, extensions, required documents, and deadlines.',
  },
  {
    key: 'work_permit',
    title: 'Work Permit Guide',
    description: 'Part-time work rules, allowed hours, and how to apply.',
  },
  {
    key: 'general',
    title: 'Student Life',
    description: 'Practical guides for everyday life as a student in Korea.',
  },
]

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-secondary-700 mb-4">
          Your trusted guide to student life in Korea
        </h1>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto mb-8">
          Clear, verified information on visas, work permits, and student life —
          plus an AI assistant that answers your questions with cited sources.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/assistant">
            <Button variant="primary">Ask the AI Assistant</Button>
          </Link>
          <Link to="/knowledge-base">
            <Button variant="outline">Browse Knowledge Base</Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link key={cat.key} to={`/knowledge-base?category=${cat.key}`}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <Badge category={cat.key} className="mb-3" />
              <h3 className="font-semibold text-lg mb-2">{cat.title}</h3>
              <p className="text-sm text-neutral-700">{cat.description}</p>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  )
}