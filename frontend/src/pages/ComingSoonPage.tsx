import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Timer, Bell } from 'lucide-react'

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-zinc-50 flex items-center justify-center mb-8 border border-zinc-100">
        <Timer className="w-10 h-10 text-black" />
      </div>
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">{title}</h1>
      <p className="text-zinc-500 font-medium max-w-md mx-auto text-lg mb-12">
        We are meticulously crafting this module to ensure it meets our rigorous standards for academic collaboration.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm">
        <Button className="rounded-xl px-8 py-6 font-bold flex-1 flex items-center gap-2">
          <Bell size={18} />
          Notify Me
        </Button>
        <Link to="/" className="flex-1">
          <Button variant="outline" className="w-full rounded-xl px-8 py-6 font-bold">
            Explore Beta
          </Button>
        </Link>
      </div>
    </div>
  )
}
