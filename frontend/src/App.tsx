import { Outlet } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 md:py-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
