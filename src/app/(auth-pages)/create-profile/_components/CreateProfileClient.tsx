'use client'

import { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/landing/ui/button'
import { onSignInWithCredentials } from '@/server/actions/auth/handleSignIn'

type CreateProfileFormSchema = {
    username: string
}

const validationSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(30, { message: 'Username must be under 30 characters' })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: 'Only letters, numbers, and underscores allowed',
        }),
})

type AvailabilityStatus = 'idle' | 'checking' | 'available' | 'taken'

const TAKEN_USERNAMES = ['admin', 'linkgrow', 'support', 'help', 'api', 'www']

const CreateProfileClient = () => {
    const router = useRouter()
    const [isSubmitting, setSubmitting] = useState(false)
    const [availability, setAvailability] = useState<AvailabilityStatus>('idle')
    const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CreateProfileFormSchema>({
        defaultValues: { username: '' },
        resolver: zodResolver(validationSchema),
    })

    const usernameValue = watch('username')

    const checkAvailability = useCallback((value: string) => {
        if (!value || value.length < 3) {
            setAvailability('idle')
            return
        }
        setAvailability('checking')
        // Simulate API check — replace with real API call
        const timer = setTimeout(() => {
            const isTaken = TAKEN_USERNAMES.includes(value.toLowerCase())
            setAvailability(isTaken ? 'taken' : 'available')
        }, 800)
        return timer
    }, [])

    useEffect(() => {
        if (debounceTimer) clearTimeout(debounceTimer)
        const timer = checkAvailability(usernameValue)
        if (timer) setDebounceTimer(timer)
        return () => { if (timer) clearTimeout(timer) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usernameValue])

    const onSubmit = async (values: CreateProfileFormSchema) => {
        if (availability !== 'available') return
        try {
            setSubmitting(true)
            // Retrieve credentials stored during sign-up
            const email = sessionStorage.getItem('_signup_email')
            const password = sessionStorage.getItem('_signup_password')

            if (email && password) {
                // Clear stored credentials
                sessionStorage.removeItem('_signup_email')
                sessionStorage.removeItem('_signup_password')
                // Auto sign-in to create a NextAuth session before going to dashboard
                await onSignInWithCredentials(
                    { email, password },
                    '/dashboards/ecommerce',
                )
            } else {
                // Fallback: no credentials found, just push to dashboard
                router.push('/dashboards/ecommerce')
            }
        } catch (error) {
            console.error(error)
            router.push('/dashboards/ecommerce')
        } finally {
            setSubmitting(false)
        }
    }

    const statusConfig = {
        idle: { icon: null, color: 'text-slate-400', bg: '' },
        checking: {
            icon: 'svg-spinners:ring-resize',
            color: 'text-slate-400',
            bg: '',
        },
        available: {
            icon: 'lucide:check-circle-2',
            color: 'text-emerald-500',
            bg: 'border-emerald-400/30 bg-emerald-50',
        },
        taken: {
            icon: 'lucide:x-circle',
            color: 'text-red-500',
            bg: 'border-red-400/30 bg-red-50',
        },
    }

    const cleanUsername = usernameValue?.replace(/[^a-zA-Z0-9_]/g, '') || ''

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div>
                <div className="inline-flex items-center gap-2 bg-brand/5 border border-brand/10 rounded-full px-3 py-1 mb-4">
                    <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">
                        Step 2 of 2
                    </span>
                </div>
                <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">
                    Claim your handle.
                </h1>
                <p className="text-slate-500 font-medium">
                    This is your unique link that people will visit.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* URL Preview Card */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        Your profile link
                    </p>
                    <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-slate-400 text-sm font-bold">linkgrow.com/</span>
                        <motion.span
                            key={cleanUsername}
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            className={`text-sm font-black transition-colors ${
                                cleanUsername
                                    ? availability === 'available'
                                        ? 'text-emerald-600'
                                        : availability === 'taken'
                                          ? 'text-red-500'
                                          : 'text-slate-700'
                                    : 'text-slate-300'
                            }`}
                        >
                            {cleanUsername || 'yourhandle'}
                        </motion.span>
                    </div>
                </div>

                {/* Username Input */}
                <div className="space-y-3">
                    <div
                        className={`relative flex items-center gap-3 rounded-2xl border-2 px-5 py-4 transition-all ${
                            availability === 'available'
                                ? 'border-emerald-400/50 bg-emerald-50/30'
                                : availability === 'taken'
                                  ? 'border-red-400/50 bg-red-50/30'
                                  : errors.username
                                    ? 'border-red-300 bg-red-50/20'
                                    : 'border-slate-100 bg-white focus-within:border-brand/40'
                        }`}
                    >
                        <span className="text-slate-400 font-black text-sm">@</span>
                        <input
                            {...register('username')}
                            type="text"
                            autoFocus
                            autoComplete="off"
                            spellCheck={false}
                            className="flex-1 bg-transparent font-bold text-lg text-slate-800 outline-none placeholder:text-slate-300"
                            placeholder="yourhandle"
                        />
                        <AnimatePresence mode="wait">
                            {availability !== 'idle' && (
                                <motion.div
                                    key={availability}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Icon
                                        icon={statusConfig[availability].icon || ''}
                                        className={`h-5 w-5 ${statusConfig[availability].color}`}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Status Messages */}
                    <AnimatePresence mode="wait">
                        {errors.username && (
                            <motion.p
                                key="error"
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                className="text-[10px] font-black text-red-500 uppercase tracking-widest"
                            >
                                {errors.username.message}
                            </motion.p>
                        )}
                        {!errors.username && availability === 'available' && (
                            <motion.p
                                key="available"
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5"
                            >
                                <Icon icon="lucide:check" className="h-3 w-3" />
                                Great choice! This handle is available.
                            </motion.p>
                        )}
                        {!errors.username && availability === 'taken' && (
                            <motion.p
                                key="taken"
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1.5"
                            >
                                <Icon icon="lucide:x" className="h-3 w-3" />
                                This handle is already taken. Try another.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* Suggestions */}
                {availability === 'taken' && cleanUsername && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                    >
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            Try these instead
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                `${cleanUsername}_`,
                                `${cleanUsername}01`,
                                `the_${cleanUsername}`,
                                `${cleanUsername}_pro`,
                            ].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-black text-slate-600 hover:border-brand/30 hover:text-brand transition-all"
                                    onClick={() => {
                                        // This updates the input via react-hook-form
                                        const event = new Event('input', { bubbles: true })
                                        const input = document.querySelector<HTMLInputElement>('input[name="username"]')
                                        if (input) {
                                            Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set?.call(input, suggestion)
                                            input.dispatchEvent(event)
                                        }
                                    }}
                                >
                                    @{suggestion}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Rules */}
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { icon: 'lucide:type', label: 'Letters & numbers' },
                        { icon: 'lucide:minus', label: 'Underscores OK' },
                        { icon: 'lucide:ruler', label: '3–30 characters' },
                    ].map((rule) => (
                        <div
                            key={rule.label}
                            className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 p-3 text-center"
                        >
                            <Icon icon={rule.icon} className="h-4 w-4 text-slate-400" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">
                                {rule.label}
                            </span>
                        </div>
                    ))}
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting || availability !== 'available'}
                    className={`w-full h-16 rounded-2xl text-white text-sm font-black uppercase tracking-widest shadow-2xl transition-all ${
                        availability === 'available'
                            ? 'bg-brand hover:bg-brand/90 hover:scale-[1.02] active:scale-95 shadow-brand/20'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <Icon icon="svg-spinners:ring-resize" className="h-4 w-4" />
                            Setting up your profile...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            Claim @{cleanUsername || 'handle'}
                            <Icon icon="lucide:arrow-right" className="h-4 w-4" />
                        </span>
                    )}
                </Button>
            </form>
        </div>
    )
}

export default CreateProfileClient
