'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { Button } from '@/components/landing/ui/button'
import OtpInput from '@/components/shared/OtpInput'
import sleep from '@/utils/sleep'
import appConfig from '@/configs/app.config'

type OtpFormSchema = {
    otp: string
}

const OTP_LENGTH = 6

const validationSchema = z.object({
    otp: z.string().min(OTP_LENGTH, { message: 'Please enter a valid OTP' }),
})

const OtpVerificationClient = () => {
    const router = useRouter()
    const [isSubmitting, setSubmitting] = useState(false)
    const [timer, setTimer] = useState(60)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<OtpFormSchema>({
        defaultValues: {
            otp: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = async (values: OtpFormSchema) => {
        try {
            setSubmitting(true)
            setMessage('')
            // Simulate verification
            await sleep(1500)
            toast.push(
                <Notification title="OTP verified!" type="success">
                    Identity verified successfully. Deploying workspace...
                </Notification>,
            )
            // Redirect to authenticated entry path
            router.push(appConfig.authenticatedEntryPath)
        } catch (error) {
            setMessage(typeof error === 'string' ? error : 'Invalid OTP. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleResend = async () => {
        if (timer > 0) return
        try {
            await sleep(500)
            toast.push(
                <Notification title="Code resent!" type="success">
                    A new One Time Password has been sent to your email.
                </Notification>,
            )
            setTimer(60)
        } catch (error) {
            setMessage(typeof error === 'string' ? error : 'Failed to resend OTP. Please try again.')
        }
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div>
                <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Verification.</h1>
                <p className="text-slate-500 font-medium">Verify your access credentials.</p>
            </div>

            <div className="space-y-8">
                <div className="bg-brand/5 border border-brand/10 rounded-2xl p-6 flex gap-4 items-start">
                    <Icon icon="lucide:shield-check" className="h-5 w-5 text-brand shrink-0" />
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-relaxed">
                        We have dispatched a 6-digit verification code to your registered email.
                    </p>
                </div>

                {message && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-600 text-xs font-black uppercase tracking-widest leading-relaxed">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                    <div>
                        <Controller
                            name="otp"
                            control={control}
                            render={({ field }) => (
                                <div className="flex justify-center">
                                    <OtpInput
                                        placeholder="-"
                                        inputClass="focus:border-brand!"
                                        length={OTP_LENGTH}
                                        {...field}
                                    />
                                </div>
                            )}
                        />
                        {errors.otp && (
                            <p className="mt-4 text-center text-[10px] font-black text-red-500 uppercase tracking-widest">
                                {errors.otp.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {timer > 0 ? `Resend code in ${timer}s` : "Didn't get code?"}
                        </span>
                        {timer === 0 && (
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-[10px] font-black text-brand uppercase tracking-widest hover:underline cursor-pointer"
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-16 rounded-2xl bg-slate-900 text-white hover:bg-brand hover:scale-[1.02] active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-2xl"
                    >
                        {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                </form>

                <div className="text-center">
                    <Link
                        href="/sign-in"
                        className="text-brand font-black text-[10px] uppercase tracking-[0.3em] hover:underline flex items-center justify-center gap-2"
                    >
                        <Icon icon="lucide:arrow-left" className="h-4 w-4" />
                        Abort & Return
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OtpVerificationClient
