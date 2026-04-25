import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { z } from 'zod'

import { resetPasswordSchema } from '@/schemas/auth'
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

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!token) {
      setError('Invalid reset link.')
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      await api.post('/api/v1/auth/reset-password', {
        token,
        password: values.password,
        confirm_password: values.confirmPassword,
      })
      setIsSuccess(true)
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-[440px] text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-red-50 border border-red-100">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-4">Invalid link</h1>
          <p className="text-zinc-500 font-medium leading-relaxed mb-10">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <Link to="/forgot-password">
            <Button className="w-full rounded-2xl py-8 font-bold">Request New Link</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[90vh] items-center justify-center px-6">
        <div className="w-full max-w-[440px] text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-black text-white shadow-2xl">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-4">All set!</h1>
          <p className="text-zinc-500 font-medium leading-relaxed mb-10">
            Your password has been successfully reset. You can now sign in with your new credentials.
          </p>
          <Link to="/login">
            <Button className="w-full rounded-2xl py-8 font-bold">Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-[440px]">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black tracking-tighter">New password</h1>
          <p className="mt-2 text-zinc-500 font-medium">Create a strong, unique password.</p>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-7 pr-12 focus:bg-white transition-all"
                        {...field}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      className="rounded-2xl border-zinc-100 bg-zinc-50 px-4 py-7 focus:bg-white transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full rounded-2xl py-8 text-lg font-black tracking-tight">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Update Password'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

import { AlertCircle } from 'lucide-react'
