import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'
  }`

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-secondary-700">Korea Student Hub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          <NavLink to="/visa/d2" className={navLinkClass}>Visa Guide</NavLink>
          <NavLink to="/jobs" className={navLinkClass}>Jobs</NavLink>
          <NavLink to="/events" className={navLinkClass}>Events</NavLink>
          <NavLink to="/community" className={navLinkClass}>Community</NavLink>
          {user && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
              <NavLink to="/assistant" className={navLinkClass}>AI Assistant</NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
              <Button variant="outline" onClick={handleSignOut}>Sign out</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost">Log in</Button></Link>
              <Link to="/signup"><Button variant="primary">Sign up</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}