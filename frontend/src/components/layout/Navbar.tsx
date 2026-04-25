import { useAuthStore } from '../../stores/authStore'
import { authApi } from '../../api/auth'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User as UserIcon } from 'lucide-react'

export function Navbar() {
  const { accessToken, setAccessToken } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } finally {
      setAccessToken(null)
      navigate('/login')
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-black tracking-tighter text-black">
          ZOSTERIX<span className="text-zinc-300">.</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/feed" className="text-sm font-bold text-zinc-500 transition-colors hover:text-black">Feed</Link>
          <Link to="/forum" className="text-sm font-bold text-zinc-500 transition-colors hover:text-black">Forum</Link>
          <Link to="/supervisors" className="text-sm font-bold text-zinc-500 transition-colors hover:text-black">Supervisors</Link>
        </nav>
        <div className="flex items-center gap-4">
          {!accessToken ? (
            <>
              <Link to="/login" className="text-sm font-bold text-black transition-colors hover:text-zinc-500">Sign In</Link>
              <Link 
                to="/register" 
                className="rounded-lg bg-black px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-zinc-800"
              >
                Join Free
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/profile" className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-black transition-colors">
                <UserIcon size={18} />
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-red-600 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
