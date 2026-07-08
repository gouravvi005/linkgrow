'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { useSearchParams } from 'next/navigation'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { onSignInWithCredentials } from '@/server/actions/auth/handleSignIn'
import handleOauthSignIn from '@/server/actions/auth/handleOauthSignIn'
import { Button } from '@/components/landing/ui/button'

type SignInFormSchema = {
    email: string
    password: string
}

const validationSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Please enter your email' }),
    password: z
        .string()
        .min(1, { message: 'Please enter your password' }),
})

const SignInClient = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get(REDIRECT_URL_KEY)
    
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormSchema>({
        defaultValues: {
            email: 'admin-01@ecme.com',
            password: '123Qwe',
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: SignInFormSchema) => {
        setSubmitting(true)
        setMessage('')

        onSignInWithCredentials(values, callbackUrl || '').then((data) => {
            if (data?.error) {
                setMessage(data.error as string)
                setSubmitting(false)
            }
        })
    }

    const handleOAuthSignIn = async (type: 'google' | 'github') => {
        if (type === 'google') {
            await handleOauthSignIn('google')
        }
        if (type === 'github') {
            await handleOauthSignIn('github')
        }
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div>
                <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Welcome back.</h1>
                <p className="text-slate-500 font-medium">Log in to your command center.</p>
            </div>

            <div className="space-y-8">
                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => handleOAuthSignIn('google')}
                        className="h-14 rounded-2xl bg-slate-55 bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 font-black text-xs text-slate-600 hover:bg-white hover:border-brand/20 transition-all group uppercase tracking-widest"
                    >
                        <Icon icon="simple-icons:google" className="h-4 w-4 text-slate-400 group-hover:text-brand" />
                        Google
                    </button>
                    <button
                        type="button"
                        onClick={() => handleOAuthSignIn('github')}
                        className="h-14 rounded-2xl bg-slate-55 bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 font-black text-xs text-slate-600 hover:bg-white hover:border-brand/20 transition-all group uppercase tracking-widest"
                    >
                        <Icon icon="simple-icons:github" className="h-4 w-4 text-slate-400 group-hover:text-black" />
                        Github
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]"><span className="bg-white px-4 text-slate-300">Identity Check</span></div>
                </div>

                {message && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-600 text-xs font-black uppercase tracking-widest leading-relaxed">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                    <div className="relative group">
                        <input
                            {...register('email')}
                            type="email"
                            required
                            className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
                            placeholder="Email"
                        />
                        <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
                            Email Address
                        </label>
                        {errors.email && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.email.message}</p>}
                    </div>

                    <div className="relative group">
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
                            placeholder="Password"
                        />
                        <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
                            Password
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-3 text-slate-300 hover:text-brand transition-colors"
                        >
                            <Icon icon={showPassword ? "lucide:eye-off" : "lucide:eye"} className="h-5 w-5" />
                        </button>
                        {errors.password && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.password.message}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="remember" className="rounded border-slate-200 text-brand focus:ring-brand h-4 w-4" />
                            <label htmlFor="remember" className="text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer select-none">Keep me active</label>
                        </div>
                        <Link href="/forgot-password" title='Forgot Password' className="text-[10px] font-black text-brand uppercase tracking-widest hover:underline">
                            Secure Recovery
                        </Link>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-slate-900 text-white hover:bg-brand hover:scale-[1.02] active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-2xl">
                        {isSubmitting ? 'Processing...' : 'Deploy Dashboard'}
                    </Button>
                </form>

                <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                    No access yet? <Link href="/sign-up" className="text-brand hover:underline">Establish Account</Link>
                </p>
            </div>
        </div>
    )
}

export default SignInClient
