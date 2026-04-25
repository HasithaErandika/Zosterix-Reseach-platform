import { Search, MapPin, GraduationCap, Star, ChevronRight } from 'lucide-react'

export function SupervisorDirectoryPage() {
  const supervisors = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      title: "Associate Professor of AI",
      university: "Stanford University",
      expertise: ["Machine Learning", "NLP", "AI Ethics"],
      rating: 4.9,
      reviews: 128,
      isVerified: true
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      title: "Head of Robotics Lab",
      university: "MIT",
      expertise: ["Computer Vision", "Control Systems", "RL"],
      rating: 4.8,
      reviews: 95,
      isVerified: true
    }
  ]

  return (
    <div className="flex flex-col gap-10 py-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-black tracking-tighter text-black">Find a Supervisor</h1>
        <p className="text-lg text-zinc-500">Connect with verified academic mentors and experts in your field.</p>
      </div>

      <div className="flex items-center gap-4 rounded-3xl border border-zinc-100 bg-zinc-50/50 p-2 pl-6">
        <Search className="text-zinc-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by expertise, university, or name..." 
          className="flex-1 bg-transparent py-4 text-lg outline-none placeholder:text-zinc-400"
        />
        <button className="rounded-2xl bg-black px-8 py-4 font-bold text-white hover:bg-zinc-800 transition-all">
          Search Directory
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {supervisors.map(sv => (
          <div key={sv.id} className="group relative flex flex-col gap-6 rounded-3xl border border-zinc-100 bg-white p-8 transition-all hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-100">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="h-16 w-16 rounded-2xl bg-zinc-100 border border-zinc-200"></div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-black">{sv.name}</h3>
                    {sv.isVerified && (
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white font-black">✓</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-zinc-500">{sv.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-black">
                <Star size={16} fill="black" />
                {sv.rating}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <MapPin size={16} />
                {sv.university}
              </div>
              <div className="flex flex-wrap gap-2">
                {sv.expertise.map(exp => (
                  <span key={exp} className="rounded-lg bg-zinc-50 px-3 py-1 text-xs font-bold text-zinc-600">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <button className="group/btn mt-4 flex w-full items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-6 py-4 font-bold text-black transition-all hover:border-black hover:bg-white">
              View Profile
              <ChevronRight size={20} className="text-zinc-300 transition-all group-hover/btn:translate-x-1 group-hover/btn:text-black" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
