'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { apiResetPassword } from '@/services/AuthService'
import { Button } from '@/components/landing/ui/button'

type ResetPasswordFormSchema = {
    newPassword: string
    confirmPassword: string
}

const validationSchema = z
    .object({
        newPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z.string().min(1, { message: 'Confirm Password Required' }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Your passwords do not match',
        path: ['confirmPassword'],
    })

const ResetPasswordClient = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    // Token ensures request is tied to correct user
    const token = searchParams.get('token')

    const [isSubmitting, setSubmitting] = useState(false)
    const [resetComplete, setResetComplete] = useState(false)
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormSchema>({
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values: ResetPasswordFormSchema) => {
        try {
            setSubmitting(true)
            setMessage('')
            
            await apiResetPassword({
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
                token: token as string,
            })
            
            setResetComplete(true)
        } catch (error) {
            setMessage(error as string)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div>
                {resetComplete ? (
                    <>
                        <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Reset done.</h1>
                        <p className="text-slate-500 font-medium">Your password has been successfully reset.</p>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">New Protocol.</h1>
                        <p className="text-slate-500 font-medium">Re-establish your account security credentials.</p>
                    </>
                )}
            </div>

            <div className="space-y-8">
                {message && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-600 text-xs font-black uppercase tracking-widest leading-relaxed">
                        {message}
                    </div>
                )}

                {!resetComplete ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                        <div className="relative group">
                            <input
                                {...register('newPassword')}
                                type="password"
                                required
                                className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
                                placeholder="New Password"
                            />
                            <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
                                New Password
                            </label>
                            {errors.newPassword && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.newPassword.message}</p>}
                        </div>

                        <div className="relative group">
                            <input
                                {...register('confirmPassword')}
                                type="password"
                                required
                                className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
                                placeholder="Confirm"
                            />
                            <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
                                Confirm Sequence
                            </label>
                            {errors.confirmPassword && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.confirmPassword.message}</p>}
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-brand text-white hover:bg-brand/90 hover:scale-[1.02] active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-2xl shadow-brand/20">
                            {isSubmitting ? 'Updating...' : 'Update Protocol'}
                        </Button>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center py-6">
                            <div className="h-24 w-24 rounded-full bg-emerald-55 bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                <Icon icon="lucide:check-circle" className="h-12 w-12 text-emerald-500" />
                            </div>
                        </div>

                        <Button type="button" onClick={() => router.push('/sign-in')} className="w-full h-16 rounded-2xl bg-slate-900 text-white hover:bg-brand hover:scale-[1.02] active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-2xl">
                            Continue to Login
                        </Button>
                    </div>
                )}

                <div className="text-center">
                    <Link href="/sign-in" className="text-brand font-black text-[10px] uppercase tracking-[0.3em] hover:underline flex items-center justify-center gap-2">
                        <Icon icon="lucide:arrow-left" className="h-4 w-4" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordClient
