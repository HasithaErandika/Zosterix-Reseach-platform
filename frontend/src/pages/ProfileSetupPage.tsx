import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Upload, Beaker, GraduationCap, Building2 } from 'lucide-react'
import { useAuth } from '@/store/auth'
import { api } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function ProfileSetupPage() {
  const { state, dispatch } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    bio: '',
    institution: '',
    researchInterests: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await api.put('/api/v1/users/profile', {
        bio: formData.bio,
        institution: formData.institution,
        research_interests: formData.researchInterests.split(',').map(i => i.trim()),
      })

      if (state.user) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            accessToken: state.accessToken!,
            user: { ...state.user, profile_complete: true },
          },
        })
      }
      navigate('/feed')
    } catch (err) {
      navigate('/feed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-20">
      <div className="w-full max-w-[600px]">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-zinc-50 border-2 border-dashed border-zinc-200 cursor-pointer hover:bg-zinc-100 transition-all">
            <Upload className="h-10 w-10 text-zinc-400" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter">Complete your profile</h1>
          <p className="mt-2 text-zinc-500 font-medium leading-relaxed">Tell the community about your research background.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Bio</Label>
            <textarea
              placeholder="Briefly describe your research background..."
              className="flex min-h-[120px] w-full rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:bg-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.bio}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Institution</Label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <Input
                placeholder="University of Colombo"
                className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-7 pl-12 focus:bg-white transition-all"
                value={formData.institution}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, institution: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Research Interests (Comma separated)</Label>
            <div className="relative">
              <Beaker className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <Input
                placeholder="Bioinformatics, Genomics, AI"
                className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-7 pl-12 focus:bg-white transition-all"
                value={formData.researchInterests}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, researchInterests: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-6 flex items-center gap-4">
            <Button type="button" variant="ghost" onClick={() => navigate('/feed')} className="flex-1 rounded-2xl py-8 font-bold text-zinc-400 hover:text-black">
              Skip for now
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-[2] rounded-2xl py-8 text-lg font-black tracking-tight">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Finish Setup'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
