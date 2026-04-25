import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <div className="text-[12rem] font-black tracking-tighter leading-none text-zinc-50 select-none">
        404
      </div>
      <div className="-mt-12 space-y-4 relative z-10">
        <h1 className="text-4xl font-black tracking-tighter">You've reached the edge of the map.</h1>
        <p className="text-zinc-500 font-medium max-w-md mx-auto">
          The page you are looking for has been moved, deleted, or never existed in this research dimension.
        </p>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="rounded-xl px-8 py-6 font-bold flex items-center gap-2">
              <Home size={18} />
              Back Home
            </Button>
          </Link>
          <Button variant="ghost" onClick={() => window.history.back()} className="rounded-xl px-8 py-6 font-bold flex items-center gap-2 text-zinc-400 hover:text-black">
            <ArrowLeft size={18} />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
