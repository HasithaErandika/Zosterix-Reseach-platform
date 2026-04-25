import { Link } from 'react-router-dom'
import { GraduationCap, BookOpen, MessageSquare, Search, ArrowRight, ChevronRight } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="flex flex-col gap-32 py-16">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-500"></span>
          </span>
          V1.0 Now Live
        </div>
        
        <h1 className="mb-8 max-w-4xl text-6xl font-black tracking-tight text-black sm:text-7xl lg:text-8xl">
          Research <br />
          <span className="text-zinc-400">Simplified.</span>
        </h1>
        
        <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-zinc-500">
          Zosterix is a premium platform for academic excellence. 
          Publish knowledge, engage in deep discussions, and connect with 
          verified supervisors in a sleek, focused environment.
        </p>
        
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 rounded-lg bg-black px-10 py-4 font-bold text-white transition-all hover:bg-zinc-800"
          >
            Join the Community
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/feed"
            className="group inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-10 py-4 font-bold text-black transition-all hover:border-black"
          >
            Explore Research
            <ChevronRight size={20} className="text-zinc-400 group-hover:text-black" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 gap-8 border-y border-zinc-100 py-12 md:grid-cols-4">
        {[
          { label: 'Publications', value: '12K+' },
          { label: 'Researchers', value: '50K+' },
          { label: 'Supervisors', value: '2.5K' },
          { label: 'Discussions', value: '100K+' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-black text-black">{stat.value}</div>
            <div className="text-sm font-medium text-zinc-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="grid gap-12 md:grid-cols-3">
        <div className="group relative flex flex-col gap-6 rounded-3xl border border-zinc-100 bg-white p-10 transition-all hover:border-zinc-200 hover:shadow-2xl hover:shadow-zinc-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-transform group-hover:scale-110">
            <BookOpen size={28} />
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-bold text-black">Publish Knowledge</h3>
            <p className="text-zinc-500 leading-relaxed">
              Experience the future of academic publishing. Clean, distractions-free editor with robust peer-review workflows.
            </p>
          </div>
        </div>

        <div className="group relative flex flex-col gap-6 rounded-3xl border border-zinc-100 bg-white p-10 transition-all hover:border-zinc-200 hover:shadow-2xl hover:shadow-zinc-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-black transition-transform group-hover:scale-110">
            <MessageSquare size={28} />
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-bold text-black">Academic Forum</h3>
            <p className="text-zinc-500 leading-relaxed">
              Engage in high-level intellectual discourse. Tag researchers, cite papers, and build your academic reputation.
            </p>
          </div>
        </div>

        <div className="group relative flex flex-col gap-6 rounded-3xl border border-zinc-100 bg-white p-10 transition-all hover:border-zinc-200 hover:shadow-2xl hover:shadow-zinc-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white transition-transform group-hover:scale-110">
            <GraduationCap size={28} />
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-bold text-black">Verified Supervisors</h3>
            <p className="text-zinc-500 leading-relaxed">
              Connect with global experts. Our verification system ensures you find the right mentorship for your research.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-black px-8 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-4xl font-black sm:text-5xl">Find your next mentor.</h2>
          <div className="group relative mb-10">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white" size={24} />
            <input 
              type="text" 
              placeholder="Search by expertise, university, or name..." 
              className="w-full rounded-2xl border-none bg-zinc-900/50 py-6 pl-16 pr-6 text-xl text-white transition-all placeholder:text-zinc-600 focus:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700"
            />
          </div>
          <Link 
            to="/supervisors" 
            className="inline-flex items-center gap-2 text-lg font-bold text-zinc-400 transition-colors hover:text-white"
          >
            Browse verified supervisor directory <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="text-center">
        <p className="mb-12 text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
          Trusted by Researchers from
        </p>
        <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale transition-opacity hover:opacity-50 md:gap-24">
          <div className="text-2xl font-black italic">OXFORD</div>
          <div className="text-2xl font-black italic">MIT</div>
          <div className="text-2xl font-black italic">STANFORD</div>
          <div className="text-2xl font-black italic">HARVARD</div>
        </div>
      </section>
    </div>
  )
}
