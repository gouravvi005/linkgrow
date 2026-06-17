'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { z } from 'zod'
import type { ZodType } from 'zod'
import { useRouter } from 'next/navigation'
import { apiForgotPassword } from '@/services/AuthService'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { Button } from '@/components/landing/ui/button'

type ForgotPasswordFormSchema = {
    email: string
}

const validationSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }).min(5, { message: 'Email must be at least 5 characters' }),
})

const ForgotPasswordClient = () => {
    const router = useRouter()
    const [isSubmitting, setSubmitting] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormSchema>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values: ForgotPasswordFormSchema) => {
        try {
            setSubmitting(true)
            setMessage('')
            await apiForgotPassword(values)
            toast.push(
                <Notification title="Email sent!" type="success">
                    We have sent you an email to reset your password
                </Notification>,
            )
            setEmailSent(true)
        } catch (error) {
            setMessage(error as string)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div>
                {emailSent ? (
                    <>
                        <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Check your email.</h1>
                        <p className="text-slate-500 font-medium">We have sent a password recovery to your email.</p>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Secure Recovery.</h1>
                        <p className="text-slate-500 font-medium">Reset your access protocols via email.</p>
                    </>
                )}
            </div>

            <div className="space-y-8">
                {!emailSent ? (
                    <>
                        <div className="bg-brand/5 border border-brand/10 rounded-2xl p-6 flex gap-4 items-start">
                            <Icon icon="lucide:shield-alert" className="h-5 w-5 text-brand shrink-0" />
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-relaxed">
                                We will dispatch a reset link to your registered endpoint.
                            </p>
                        </div>

                        {message && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-600 text-xs font-black uppercase tracking-widest leading-relaxed">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                            <div className="relative group">
                                <input
                                    {...register('email')}
                                    type="email"
                                    required
                                    className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
                                    placeholder="Email"
                                />
                                <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
                                    Registered Email
                                </label>
                                {errors.email && <p className="mt-2 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.email.message}</p>}
                            </div>

                            <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl bg-slate-900 text-white hover:bg-brand hover:scale-[1.02] active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-2xl">
                                {isSubmitting ? 'Dispatching...' : 'Initialize Recovery'}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-center py-6">
                            <div className="h-24 w-24 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                <Icon icon="lucide:mail-check" className="h-12 w-12 text-emerald-500" />
                            </div>
                        </div>

                        <Button type="button" onClick={() => router.push('/sign-in')} className="w-full h-16 rounded-2xl bg-brand text-white hover:bg-brand/90 hover:scale-[1.02] active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-2xl shadow-brand/20">
                            Continue to Login
                        </Button>
                    </div>
                )}

                <div className="text-center">
                    <Link href="/sign-in" className="text-brand font-black text-[10px] uppercase tracking-[0.3em] hover:underline flex items-center justify-center gap-2">
                        <Icon icon="lucide:arrow-left" className="h-4 w-4" />
                        Abort & Return
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordClient
