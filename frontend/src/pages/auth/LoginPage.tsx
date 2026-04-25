import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { authApi } from '../../api/auth'
import { ArrowRight, Loader2 } from 'lucide-react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const response = await authApi.login({ email, password })
      setAccessToken(response.data.access_token)
      navigate('/feed')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-[400px] flex-col justify-center py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black tracking-tighter text-black">Welcome back.</h1>
        <p className="mt-2 text-zinc-500">Enter your credentials to access your research.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-100">
            {error}
          </div>
        )}
        
        <button
          type="button"
          onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/v1/auth/google`}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white py-3 font-bold text-black transition-all hover:bg-zinc-50"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.89 2.69-6.62z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.8.54-1.83.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H1.04v2.33C2.52 16.03 5.51 18 9 18z"/>
            <path fill="#FBBC05" d="M3.97 10.71c-.18-.54-.28-1.12-.28-1.71s.1-1.17.28-1.71V4.96H1.04C.38 6.27 0 7.73 0 9s.38 2.73 1.04 4.04l2.93-2.33z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.51 0 2.52 1.97 1.04 4.96l2.93 2.33c.71-2.13 2.69-3.71 5.03-3.71z"/>
          </svg>
          Sign in with Google
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 font-bold text-zinc-300">Or continue with email</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-black transition-all focus:border-black focus:bg-white focus:outline-none focus:ring-0"
            placeholder="name@university.edu"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Password
            </label>
            <Link to="/forgot-password"  className="text-xs font-bold text-zinc-400 hover:text-black">
              Forgot?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-black transition-all focus:border-black focus:bg-white focus:outline-none focus:ring-0"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 font-bold text-white transition-all hover:bg-zinc-800 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Sign In
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-black hover:underline">
          Create one for free
        </Link>
      </p>
    </div>
  )
}
