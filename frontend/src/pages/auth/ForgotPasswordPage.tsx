import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Loader2, ArrowLeft, Mail } from 'lucide-react'
import { z } from 'zod'

import { forgotPasswordSchema } from '@/schemas/auth'
import { api } from '@/api/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: ForgotPasswordValues) => {
    setIsLoading(true)
    setError(null)
    try {
      await api.post('/api/v1/auth/forgot-password', values)
      setEmail(values.email)
      setIsSuccess(true)
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[90vh] items-center justify-center px-6">
        <div className="w-full max-w-[440px] text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-zinc-50 border border-zinc-100">
            <Mail className="h-10 w-10 text-black" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-4">Check your email</h1>
          <p className="text-zinc-500 font-medium leading-relaxed mb-10">
            If <span className="font-black text-black">{email}</span> is registered, you will receive a reset link shortly.
          </p>
          <Link to="/login">
            <Button variant="outline" className="w-full rounded-2xl py-8 font-bold border-zinc-100 hover:bg-zinc-50 transition-all">
              Return to Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-6">
      <Link 
        to="/login" 
        className="absolute left-6 top-6 md:left-12 md:top-12 flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-black transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Back to Login</span>
      </Link>

      <div className="w-full max-w-[440px]">
        <div className="mb-12 text-center">
          <Link to="/" className="text-2xl font-black tracking-tighter text-black">
            ZOSTERIX<span className="text-zinc-300">.</span>
          </Link>
          <h1 className="mt-8 text-4xl font-black tracking-tighter">Reset password</h1>
          <p className="mt-2 text-zinc-500 font-medium">We'll send you a recovery link.</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8 rounded-2xl border-red-50 bg-red-50/10">
            <AlertDescription className="font-bold">{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="amal@example.com" type="email" className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-7 focus:bg-white transition-all" {...field} autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full rounded-2xl py-8 text-lg font-black tracking-tight">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Send Recovery Link'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
