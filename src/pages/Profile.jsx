import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const visaOptions = ['D-2', 'D-4', 'other']

export default function Profile() {
  const { user } = useAuth()

  const [fullName, setFullName] = useState('')
  const [university, setUniversity] = useState('')
  const [nationality, setNationality] = useState('')
  const [visaType, setVisaType] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!user) return

    const fetchProfile = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setFullName(data.full_name || '')
        setUniversity(data.university || '')
        setNationality(data.nationality || '')
        setVisaType(data.visa_type || '')
      }

      if (error && error.code !== 'PGRST116') {
        setError(error.message)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [user])

  const handleSave = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setSaving(true)

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: fullName,
        university,
        nationality,
        visa_type: visaType || null,
      })

    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-sm text-neutral-700">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-secondary-700 mb-6">Your Profile</h1>

      <Card>
        <div className="mb-5 pb-5 border-b border-neutral-100">
          <p className="text-xs text-neutral-700/60 uppercase tracking-wide font-medium mb-1">
            Account
          </p>
          <p className="text-sm font-medium text-neutral-900">{user?.email}</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-primary-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-700">
            Profile saved successfully.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Full name"
            id="fullName"
            type="text"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="University"
            id="university"
            type="text"
            placeholder="e.g. University of Ulsan"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />

          <Input
            label="Nationality"
            id="nationality"
            type="text"
            placeholder="e.g. Nepali"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="visaType"
              className="text-sm font-medium text-neutral-700"
            >
              Visa type
            </label>
            <select
              id="visaType"
              value={visaType}
              onChange={(e) => setVisaType(e.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="">Select visa type</option>
              {visaOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save profile'}
          </Button>
        </form>
      </Card>
    </div>
  )
}