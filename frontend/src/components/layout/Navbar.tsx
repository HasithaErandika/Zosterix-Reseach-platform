import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-semibold">Zosterix</Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/">Feed</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/supervisors">Supervisors</Link>
        </nav>
      </div>
    </header>
  )
}
