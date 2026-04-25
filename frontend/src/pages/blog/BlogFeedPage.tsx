import { Search, Filter, Plus, MessageSquare, Heart, Share2 } from 'lucide-react'

export function BlogFeedPage() {
  const posts = [
    {
      id: 1,
      title: "The Future of Quantum Computing in Academic Research",
      excerpt: "Exploring how quantum algorithms are revolutionizing computational chemistry and physics simulations in higher education...",
      author: "Dr. Aris Thorne",
      date: "Oct 24, 2026",
      readTime: "8 min read",
      category: "Quantum Physics"
    },
    {
      id: 2,
      title: "Sustainable Architecture: Beyond the Green Facade",
      excerpt: "A deep dive into regenerative design principles and how they can be implemented in urban planning for the next century...",
      author: "Prof. Elena Vance",
      date: "Oct 22, 2026",
      readTime: "12 min read",
      category: "Environment"
    }
  ]

  return (
    <div className="flex flex-col gap-10 py-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-black tracking-tighter text-black">Research Feed</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search research..." 
              className="rounded-xl border border-zinc-100 bg-zinc-50 py-2 pl-10 pr-4 text-sm focus:border-black focus:bg-white focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-zinc-100 bg-white px-4 py-2 text-sm font-bold text-zinc-600 hover:border-black hover:text-black transition-all">
            <Filter size={18} />
            Filters
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-bold text-white hover:bg-zinc-800 transition-all">
            <Plus size={18} />
            Publish
          </button>
        </div>
      </div>

      <div className="grid gap-8">
        {posts.map(post => (
          <article key={post.id} className="group relative flex flex-col gap-4 rounded-3xl border border-zinc-100 bg-white p-8 transition-all hover:border-zinc-200 hover:shadow-xl hover:shadow-zinc-100">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h2 className="text-2xl font-black text-black group-hover:text-zinc-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-100 border border-zinc-200"></div>
                <div>
                  <div className="text-sm font-bold text-black">{post.author}</div>
                  <div className="text-xs text-zinc-400">{post.readTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <button className="flex items-center gap-1 hover:text-black transition-colors">
                  <Heart size={18} />
                  <span className="text-xs font-bold">24</span>
                </button>
                <button className="flex items-center gap-1 hover:text-black transition-colors">
                  <MessageSquare size={18} />
                  <span className="text-xs font-bold">12</span>
                </button>
                <button className="hover:text-black transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
