import { MessageSquare, Users, TrendingUp, Clock } from 'lucide-react'

export function ForumPage() {
  const threads = [
    {
      id: 1,
      title: "Advice for PhD applications in Computer Science?",
      author: "FutureScholar27",
      replies: 45,
      views: "1.2k",
      lastActive: "10m ago",
      tags: ["PhD", "Applications", "CS"]
    },
    {
      id: 2,
      title: "How to handle conflicting feedback from peer reviewers?",
      author: "ReseachMaster",
      replies: 12,
      views: "430",
      lastActive: "1h ago",
      tags: ["PeerReview", "Publication"]
    }
  ]

  return (
    <div className="flex flex-col gap-10 py-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-black tracking-tighter text-black">Academic Forum</h1>
        <p className="text-lg text-zinc-500">Join the discussion with researchers and students worldwide.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 border-b border-zinc-100 pb-4">
            <button className="text-sm font-bold text-black border-b-2 border-black pb-4 -mb-[18px]">Latest</button>
            <button className="text-sm font-bold text-zinc-400 hover:text-black transition-colors pb-4">Top</button>
            <button className="text-sm font-bold text-zinc-400 hover:text-black transition-colors pb-4">Unanswered</button>
          </div>

          <div className="flex flex-col gap-2">
            {threads.map(thread => (
              <div key={thread.id} className="group flex items-center justify-between rounded-2xl border border-zinc-100 bg-white p-5 transition-all hover:border-zinc-300">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-black group-hover:underline transition-all cursor-pointer">
                      {thread.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-zinc-400">
                      <span className="font-bold text-zinc-600">{thread.author}</span>
                      <span>•</span>
                      <span>{thread.lastActive}</span>
                      <div className="flex gap-2">
                        {thread.tags.map(tag => (
                          <span key={tag} className="rounded-md bg-zinc-50 px-1.5 py-0.5 font-bold uppercase tracking-tighter text-zinc-400">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm font-black text-black">{thread.replies}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Replies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-black text-black">{thread.views}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Views</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-2xl border border-zinc-100 bg-white p-6">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Trending Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['#PhD', '#CS', '#AI', '#DeepLearning', '#Ethics', '#BioTech'].map(tag => (
                <button key={tag} className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-1.5 text-xs font-bold text-zinc-600 hover:border-black hover:text-black transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-white p-6">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Stats</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Users size={16} /> Online
                </div>
                <span className="text-sm font-bold text-black">1.4k</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <TrendingUp size={16} /> Threads
                </div>
                <span className="text-sm font-bold text-black">45k</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Clock size={16} /> Avg Response
                </div>
                <span className="text-sm font-bold text-black">2h</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
