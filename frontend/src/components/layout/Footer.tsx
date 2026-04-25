import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link to="/" className="text-xl font-black tracking-tighter text-black">
              ZOSTERIX<span className="text-zinc-300">.</span>
            </Link>
            <p className="text-xs font-medium text-zinc-400">
              Empowering academic excellence globally.
            </p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-8">
            <Link to="/about" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black">About</Link>
            <Link to="/privacy" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black">Privacy</Link>
            <Link to="/terms" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black">Terms</Link>
            <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black">Contact</Link>
          </nav>
          
          <div className="text-xs font-bold text-zinc-300">
            &copy; {new Date().getFullYear()} ZOSTERIX RESEARCH.
          </div>
        </div>
      </div>
    </footer>
  )
}
