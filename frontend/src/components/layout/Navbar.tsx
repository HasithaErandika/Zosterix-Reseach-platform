import { Link } from 'react-router-dom'

export function Navbar() {
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
          <Link to="/login" className="text-sm font-bold text-black transition-colors hover:text-zinc-500">Sign In</Link>
          <Link 
            to="/register" 
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-zinc-800"
          >
            Join Free
          </Link>
        </div>
      </div>
    </header>
  )
}
