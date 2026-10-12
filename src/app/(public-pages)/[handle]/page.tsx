'use client'

import React, { use } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { apiGetProfile } from '@/services/ProfileService'
import { ExternalLink, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react'

interface PublicBioProfile {
    id: string
    username: string
    title: string
    bio: string
    avatar?: string
    isPublished?: boolean
    themeSettings?: {
        avatarSize?: number
        titleFontSize?: number
        bioFontSize?: number
        buttonRoundness?: number
        buttonPadding?: number
        buttonSpacing?: number
        buttonStyle?: 'solid' | 'glass' | 'outline'
        buttonShadow?: 'none' | 'soft' | 'strong' | 'hard'
        buttonColor?: string
        buttonTextColor?: string
        pageFont?: string
        pageTextColor?: string
        titleFontColor?: string
        titleSize?: 'small' | 'large'
        headerLayout?: 'classic' | 'hero'
        heroBannerImage?: string
        heroBannerColor1?: string
        heroBannerColor2?: string
    }
    links?: { id: string; title: string; url: string; clicks?: number }[]
}

const FALLBACK_PUBLIC_PROFILE: PublicBioProfile = {
    id: 'public-demo',
    username: 'creator',
    title: 'Alex Rivera — Digital Creator',
    bio: 'Building SaaS products & teaching full-stack web development.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    isPublished: true,
    themeSettings: {
        avatarSize: 88,
        titleFontSize: 20,
        bioFontSize: 14,
        buttonRoundness: 16,
        buttonPadding: 16,
        buttonSpacing: 14,
        buttonStyle: 'glass',
        buttonShadow: 'soft',
        buttonColor: '#6366F1',
        buttonTextColor: '#FFFFFF',
        pageFont: 'Inter',
        pageTextColor: '#FFFFFF',
        titleFontColor: '#FFFFFF',
        titleSize: 'large',
        headerLayout: 'classic',
    },
    links: [
        { id: '1', title: '🚀 My Portfolio & Case Studies', url: 'https://alexrivera.dev', clicks: 1200 },
        { id: '2', title: '📚 Full-Stack Web Dev Mastery', url: 'https://course.alexrivera.dev', clicks: 840 },
        { id: '3', title: '💬 Join the Discord Developer Hub', url: 'https://discord.gg/linkgrow', clicks: 490 },
        { id: '4', title: '☕ Buy Me A Coffee', url: 'https://buymeacoffee.com/alexrivera', clicks: 310 },
    ],
}

export default function PublicProfilePage({ params }: { params: Promise<{ handle: string }> }) {
    const resolvedParams = use(params)
    const handle = resolvedParams.handle

    const { data: remoteProfile } = useSWR<PublicBioProfile>(
        handle ? `/profiles/handle/${handle}` : null,
        () => apiGetProfile(handle),
        { revalidateOnFocus: false, shouldRetryOnError: false }
    )

    const profile = remoteProfile || FALLBACK_PUBLIC_PROFILE
    const ts = profile.themeSettings || FALLBACK_PUBLIC_PROFILE.themeSettings!

    const getButtonStyleClasses = () => {
        let classes = 'transition-all duration-200 hover:scale-[1.02] flex items-center justify-between font-medium w-full text-center border '
        if (ts.buttonStyle === 'glass') {
            classes += 'bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 '
        } else if (ts.buttonStyle === 'outline') {
            classes += 'bg-transparent border-white/40 hover:bg-white/10 '
        } else {
            classes += 'border-transparent hover:opacity-90 '
        }

        if (ts.buttonShadow === 'soft') {
            classes += 'shadow-lg shadow-black/10 '
        } else if (ts.buttonShadow === 'strong') {
            classes += 'shadow-xl shadow-black/25 '
        } else if (ts.buttonShadow === 'hard') {
            classes += 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] '
        }

        return classes
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center py-12 px-4 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
            {/* Ambient Lighting Background */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md flex flex-col items-center z-10">
                {/* Avatar */}
                {profile.avatar && (
                    <div className="relative mb-4 group">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 blur opacity-75 group-hover:opacity-100 transition duration-300" />
                        <div
                            className="relative overflow-hidden rounded-full border-2 border-white/20 bg-slate-900"
                            style={{
                                width: `${ts.avatarSize || 80}px`,
                                height: `${ts.avatarSize || 80}px`,
                            }}
                        >
                            <Image
                                src={profile.avatar}
                                alt={profile.title}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </div>
                )}

                {/* Profile Title & Handle */}
                <div className="flex items-center gap-1.5 mb-1">
                    <h1
                        className="font-extrabold tracking-tight text-center"
                        style={{
                            fontSize: `${ts.titleFontSize || 20}px`,
                            color: ts.titleFontColor || '#FFFFFF',
                        }}
                    >
                        {profile.title}
                    </h1>
                    <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                </div>

                <p className="text-xs text-indigo-300 font-medium mb-3">@{profile.username || handle}</p>

                {/* Bio Description */}
                {profile.bio && (
                    <p
                        className="text-center text-slate-300 mb-8 max-w-xs leading-relaxed"
                        style={{ fontSize: `${ts.bioFontSize || 14}px` }}
                    >
                        {profile.bio}
                    </p>
                )}

                {/* Link Buttons */}
                <div
                    className="w-full flex flex-col"
                    style={{ gap: `${ts.buttonSpacing || 14}px` }}
                >
                    {(profile.links || FALLBACK_PUBLIC_PROFILE.links!).map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={getButtonStyleClasses()}
                            style={{
                                borderRadius: `${ts.buttonRoundness || 14}px`,
                                padding: `${ts.buttonPadding || 14}px 20px`,
                                backgroundColor: ts.buttonStyle === 'solid' ? (ts.buttonColor || '#4F46E5') : undefined,
                                color: ts.buttonTextColor || '#FFFFFF',
                            }}
                        >
                            <span className="font-semibold">{link.title}</span>
                            <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>

                {/* LinkGrow Footer Badge */}
                <div className="mt-12 flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Powered by <strong className="text-white font-bold">LinkGrow</strong></span>
                </div>
            </div>
        </div>
    )
}
