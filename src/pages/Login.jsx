import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to the page they came from, or home
  const from = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await signIn({ email, password })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <div className="max-w-sm mx-auto mt-8">
      <Card>
        <h1 className="text-xl font-bold text-secondary-700 mb-1">Welcome back</h1>
        <p className="text-sm text-neutral-700 mb-5">
          Log in to your Korea Student Hub account.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-primary-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>

        <p className="text-sm text-neutral-700 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-600 font-medium">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  )
}