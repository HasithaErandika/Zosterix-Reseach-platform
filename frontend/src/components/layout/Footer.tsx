import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-white py-16 px-6 border-t border-zinc-50">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link to="/" className="text-2xl font-black tracking-tighter text-black">
              ZOSTERIX<span className="text-zinc-300">.</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              The premium platform for research collaboration and academic networking. Built for the next generation of scholars.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500">
              <li><Link to="/feed" className="hover:text-black transition-colors">Research Feed</Link></li>
              <li><Link to="/forum" className="hover:text-black transition-colors">Community Forum</Link></li>
              <li><Link to="/supervisors" className="hover:text-black transition-colors">Supervisors</Link></li>
              <li><Link to="/blog" className="hover:text-black transition-colors">Academic Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500">
              <li><Link to="/help" className="hover:text-black transition-colors">Help Center</Link></li>
              <li><Link to="/guidelines" className="hover:text-black transition-colors">Community Guidelines</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500">
              <li><Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
              <li><Link to="/security" className="hover:text-black transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="mb-8 bg-zinc-50" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-300 uppercase tracking-widest">
          <div>&copy; {new Date().getFullYear()} Zosterix Research Platform.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-black transition-colors">Github</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
