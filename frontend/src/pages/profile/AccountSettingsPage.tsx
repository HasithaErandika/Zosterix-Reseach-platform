import { useAuth } from '@/store/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { User, Library, Globe, Share2, Mail, Shield, Bell } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function AccountSettingsPage() {
  const { state } = useAuth()
  const location = useLocation()
  const activeTab = location.pathname.includes('security') ? 'security' : 'profile'


  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} />, path: '/settings/profile' },
    { id: 'account', label: 'Account', icon: <Mail size={18} />, path: '/settings/profile' },
    { id: 'security', label: 'Security', icon: <Shield size={18} />, path: '/settings/security' },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, path: '/settings/security' },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tighter">SETTINGS</h1>
          <p className="text-zinc-500 font-medium mt-2">Manage your academic profile and application preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
          {/* Settings Sidebar */}
          <aside className="space-y-2">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  (tab.id === 'profile' && location.pathname === '/settings/profile') || (tab.id === 'security' && location.pathname === '/settings/security')
                    ? 'bg-black text-white shadow-lg shadow-black/5' 
                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'
                }`}
              >
                {tab.icon}
                {tab.label}
              </Link>
            ))}
          </aside>

          {/* Settings Content */}
          <div className="space-y-8">
            {activeTab === 'profile' && (
              <>
                <Card className="rounded-[2.5rem] border-zinc-100 shadow-none bg-white">
                  <CardHeader className="p-8 pb-0">
                    <CardTitle className="text-2xl font-black tracking-tight">Public Profile</CardTitle>
                    <CardDescription className="text-zinc-500 font-medium">This information will be visible to other researchers.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-3xl font-black text-black">
                          {state.user?.full_name?.charAt(0)}
                        </div>
                        <button className="absolute -bottom-2 -right-2 bg-black text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                          <Share2 size={16} />
                        </button>
                      </div>
                      <div className="flex-1 w-full space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Full Name</Label>
                            <Input defaultValue={state.user?.full_name} className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-6" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Display Name</Label>
                            <Input placeholder="e.g. Dr. Jane Doe" className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-6" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Bio</Label>
                          <Input placeholder="Tell us about your research focus..." className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-6" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="bg-zinc-50" />
                    
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Primary Institution</Label>
                        <Input placeholder="e.g. Stanford University" className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-6" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Academic Website</Label>
                        <div className="relative">
                          <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                          <Input placeholder="https://scholar.google.com/..." className="pl-12 rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-6" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button className="rounded-2xl px-8 py-6 font-bold shadow-xl shadow-black/5">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[2.5rem] border-zinc-100 shadow-none bg-white">
                  <CardHeader className="p-8 pb-0">
                    <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-2">
                      <Library size={24} />
                      Research Interests
                    </CardTitle>
                    <CardDescription className="text-zinc-500 font-medium">Add tags to help others find your work.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['Neuroscience', 'Quantum Physics', 'Machine Learning', 'Ethics'].map(tag => (
                        <div key={tag} className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-100 text-sm font-bold flex items-center gap-2 group hover:border-black transition-colors pointer-events-none">
                          {tag}
                        </div>
                      ))}
                      <Button variant="outline" className="rounded-xl font-bold border-dashed border-zinc-200 text-zinc-400">
                        + Add Interest
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-[2.5rem] border-zinc-100 shadow-none bg-white">
                  <CardHeader className="p-8 pb-0">
                    <CardTitle className="text-2xl font-black tracking-tight">Account Information</CardTitle>
                    <CardDescription className="text-zinc-500 font-medium">Manage your login credentials and role.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Email Address</Label>
                      <Input value={state.user?.email} disabled className="rounded-2xl border-zinc-100 bg-zinc-50/50 px-4 py-6 cursor-not-allowed" />
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pt-1">Email cannot be changed during beta.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Account Role</Label>
                      <div className="px-4 py-4 rounded-2xl bg-zinc-50 border border-zinc-100 font-bold text-sm capitalize">
                        {state.user?.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'security' && (
              <Card className="rounded-[2.5rem] border-zinc-100 shadow-none bg-white p-12 text-center">
                <div className="w-16 h-16 rounded-3xl bg-zinc-50 flex items-center justify-center mx-auto mb-6 text-zinc-300">
                  <Shield size={32} />
                </div>
                <h3 className="text-2xl font-black tracking-tight">SECURITY SETTINGS</h3>
                <p className="text-zinc-500 font-medium mt-2 max-w-xs mx-auto">Please use the dedicated security page to manage your credentials.</p>
                <Link to="/settings/security">
                  <Button className="mt-6 rounded-2xl font-bold py-6 px-8 shadow-xl shadow-black/5">Open Security Settings</Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
