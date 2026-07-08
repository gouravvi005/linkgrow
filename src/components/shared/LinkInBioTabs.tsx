'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Link2, Palette, User, Share2, MessageSquare } from 'lucide-react'

export default function LinkInBioTabs() {
    const pathname = usePathname()

    const tabs = [
        { label: 'Content', path: '/creator/mini-site/content', icon: Link2 },
        { label: 'Header', path: '/creator/mini-site/header', icon: User },
        { label: 'Social Links', path: '/creator/mini-site/social-links', icon: Share2 },
        { label: 'Theme', path: '/creator/mini-site/theme', icon: Palette },
        { label: 'WhatsApp Automation', path: '/creator/automation/whatsapp', icon: MessageSquare },
    ]

    return (
        <div className="flex border-b border-gray-200 dark:border-zinc-800 gap-6 overflow-x-auto pb-1 mb-6 text-sm font-bold text-gray-400">
            {tabs.map(tab => {
                const isActive = pathname.startsWith(tab.path)
                const Icon = tab.icon
                return (
                    <Link
                        key={tab.path}
                        href={tab.path}
                        className={`pb-3 relative transition-all duration-300 flex items-center gap-1.5 ${
                            isActive 
                                ? 'text-primary font-extrabold border-b-2 border-primary' 
                                : 'hover:text-gray-700 dark:hover:text-gray-250'
                        }`}
                    >
                        <Icon size={14} />
                        <span>{tab.label}</span>
                    </Link>
                )
            })}
        </div>
    )
}

