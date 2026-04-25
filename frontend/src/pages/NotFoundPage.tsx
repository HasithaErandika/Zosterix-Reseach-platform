import { Link } from 'react-router-dom'
import { FileQuestion, ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center py-20">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-50 text-zinc-400">
        <FileQuestion size={40} strokeWidth={1.5} />
      </div>
      <h1 className="mb-4 text-4xl font-black tracking-tighter text-black sm:text-5xl">
        404 <span className="text-zinc-400">Not Found.</span>
      </h1>
      <p className="mx-auto mb-12 max-w-md text-lg text-zinc-500">
        The page you are looking for doesn't exist or has been moved to a different research sector.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 rounded-xl bg-black px-8 py-3 font-bold text-white transition-all hover:bg-zinc-800"
      >
        <ArrowLeft size={18} />
        Return Home
      </Link>
    </div>
  )
}
