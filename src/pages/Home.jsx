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

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: '💬',
    url: 'https://wa.me/your-number',
    color: 'bg-green-50 text-green-700 border-green-200',
    description: 'Join our WhatsApp group',
  },
  {
    name: 'KakaoTalk',
    icon: '🟡',
    url: 'https://open.kakao.com/your-link',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    description: 'Join our KakaoTalk group',
  },
  {
    name: 'Instagram',
    icon: '📸',
    url: 'https://instagram.com/your-handle',
    color: 'bg-pink-50 text-pink-700 border-pink-200',
    description: 'Follow us on Instagram',
  },
  {
    name: 'TikTok',
    icon: '🎵',
    url: 'https://tiktok.com/@your-handle',
    color: 'bg-neutral-50 text-neutral-700 border-neutral-200',
    description: 'Watch student tips on TikTok',
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
          Clear, verified information on visas, work permits, and student life.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/visa/d2">
            <Button variant="primary">Visa Guides</Button>
          </Link>
          <Link to="/jobs">
            <Button variant="outline">Find Jobs</Button>
          </Link>
          <Link to="/community">
            <Button variant="ghost">Community</Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link key={cat.key} to={"/knowledge-base?category=" + cat.key}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <Badge category={cat.key} className="mb-3" />
              <h3 className="font-semibold text-lg mb-2">{cat.title}</h3>
              <p className="text-sm text-neutral-700">{cat.description}</p>
            </Card>
          </Link>
        ))}
      </section>

      <section className="bg-secondary-700 rounded-2xl p-8 text-white">
        <h2 className="text-xl font-bold text-center mb-6">
          Helping international students in Korea
        </h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-primary-500">4+</p>
            <p className="text-sm text-secondary-100 mt-1">Visa Guides</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-500">6+</p>
            <p className="text-sm text-secondary-100 mt-1">Job Listings</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-500">Free</p>
            <p className="text-sm text-secondary-100 mt-1">Always</p>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-secondary-700">
            Join our community
          </h2>
          <p className="text-sm text-neutral-700 mt-1">
            Connect with other international students in Korea
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={"flex flex-col items-center gap-2 rounded-xl border p-4 hover:shadow-md transition-shadow text-center " + social.color}
            >
              <span className="text-3xl">{social.icon}</span>
              <span className="font-semibold text-sm">{social.name}</span>
              <span className="text-xs opacity-70">{social.description}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="text-center text-xs text-neutral-700/50 pb-4">
        Information is for general guidance only. Always verify with your
        university international office or Korea Immigration Service (1345).
      </section>
    </div>
  )
}