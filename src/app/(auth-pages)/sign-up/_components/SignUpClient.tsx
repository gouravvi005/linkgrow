'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { useRouter } from 'next/navigation'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { apiSignUp } from '@/services/AuthService'
import { Button } from '@/components/landing/ui/button'

type SignUpFormSchema = {
    userName: string
    email: string
    password: string
    confirmPassword: string
    agreeToTerms: boolean
}

const validationSchema = z
    .object({
        userName: z.string().min(1, { message: 'Please enter your name' }),
        email: z.string().email({ message: 'Please enter a valid email address' }).min(1, { message: 'Please enter your email' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z.string().min(1, { message: 'Confirm Password Required' }),
        agreeToTerms: z.boolean().refine((val) => val === true, {
            message: 'You must agree to the terms',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

const SignUpClient = () => {
    const router = useRouter()
    const [isSubmitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormSchema>({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values: SignUpFormSchema) => {
        try {
            setSubmitting(true)
            setMessage('')
            
            await apiSignUp({
                userName: values.userName,
                email: values.email,
                password: values.password,
            })
            
            toast.push(
                <Notification title="Account created!" type="success">
                    You can now sign in from our sign in page
                </Notification>,
            )
            router.push('/sign-in')
        } catch (error) {
            setMessage(error as string)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div>
                <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Build your empire.</h1>
                <p className="text-slate-500 font-medium">Create your high-performance growth account.</p>
            </div>

            <div className="space-y-8">
                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => {}}
                        className="h-14 rounded-2xl bg-slate-55 bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 font-black text-xs text-slate-600 hover:bg-white hover:border-brand/20 transition-all group uppercase tracking-widest"
                    >
                        <Icon icon="simple-icons:google" className="h-4 w-4 text-slate-400 group-hover:text-brand" />
                        Google
                    </button>
                    <button
                        type="button"
                        onClick={() => {}}
                        className="h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 font-black text-xs text-slate-600 hover:bg-white hover:border-brand/20 transition-all group uppercase tracking-widest"
                    >
                        <Icon icon="simple-icons:github" className="h-4 w-4 text-slate-400 group-hover:text-black" />
                        Github
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]"><span className="bg-white px-4 text-slate-300">New Protocol</span></div>
                </div>

                {message && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-600 text-xs font-black uppercase tracking-widest leading-relaxed">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                    <div className="relative group">
                        <input
                            {...register('userName')}
                            type="text"
                            required
                            className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
                            placeholder="Name"
                        />
                        <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
                            Full Name
                        </label>
                        {errors.userName && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.userName.message}</p>}
                    </div>

                    <div className="relative group">
                        <input
                            {...register('email')}
                            type="email"
                            required
                            className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
                            placeholder="Email"
                        />
                        <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
                            Corporate Email
                        </label>
                        {errors.email && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.email.message}</p>}
                    </div>

                    <div className="relative group">
                        <input
                            {...register('password')}
                            type="password"
                            required
                            className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
                            placeholder="Password"
                        />
                        <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
                            Create Password
                        </label>
                        {errors.password && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.password.message}</p>}
                    </div>

                    <div className="relative group">
                        <input
                            {...register('confirmPassword')}
                            type="password"
                            required
                            className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
                            placeholder="Confirm Password"
                        />
                        <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
                            Confirm Password
                        </label>
                        {errors.confirmPassword && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="flex items-start gap-3">
                        <input
                            {...register('agreeToTerms')}
                            type="checkbox"
                            id="terms"
                            className="mt-1 h-4 w-4 rounded border-slate-200 text-brand focus:ring-brand"
                            required
                        />
                        <label htmlFor="terms" className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-relaxed cursor-pointer select-none">
                            I agree to the <Link href="/terms" className="text-brand hover:underline">Nexus Protocol</Link> and <Link href="/privacy" className="text-brand hover:underline">Privacy Shield</Link>.
                        </label>
                    </div>
                    {errors.agreeToTerms && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.agreeToTerms.message}</p>}

                    <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-brand text-white hover:bg-brand/90 hover:scale-[1.02] active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-2xl shadow-brand/20">
                        {isSubmitting ? 'Initializing...' : 'Deploy Account'}
                    </Button>
                </form>

                <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Already active? <Link href="/sign-in" className="text-brand hover:underline">Return to Nexus</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpClient
