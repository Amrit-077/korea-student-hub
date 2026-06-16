import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    const { error } = await signUp({ email, password, fullName })
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="max-w-sm mx-auto mt-8">
        <Card>
          <div className="text-center space-y-3">
            <div className="text-4xl">✅</div>
            <h2 className="text-lg font-bold text-secondary-700">Check your email</h2>
            <p className="text-sm text-neutral-700">
              We sent a confirmation link to <strong>{email}</strong>.
              Click it to activate your account, then log in.
            </p>
            <Link to="/login">
              <Button variant="primary" className="w-full mt-2">
                Go to login
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto mt-8">
      <Card>
        <h1 className="text-xl font-bold text-secondary-700 mb-1">Create an account</h1>
        <p className="text-sm text-neutral-700 mb-5">
          Join Korea Student Hub — free forever.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-primary-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full name"
            id="fullName"
            type="text"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
            placeholder="At least 6 characters"
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
            {loading ? 'Creating account...' : 'Sign up'}
          </Button>
        </form>

        <p className="text-sm text-neutral-700 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-medium">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  )
}