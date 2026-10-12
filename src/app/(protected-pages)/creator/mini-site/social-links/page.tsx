'use client'

import React, { useState } from 'react'
import { useMiniSite } from '../MiniSiteContext'
import LinkInBioTabs from '@/components/shared/LinkInBioTabs'
import { Button, Input, Switcher } from '@/components/ui'
import Card from '@/components/ui/Card'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import * as Icons from 'lucide-react'
import {
    FaInstagram,
    FaYoutube,
    FaLinkedin,
    FaXTwitter,
    FaFacebook,
    FaGithub,
    FaTiktok,
    FaPinterest,
    FaSnapchat,
    FaReddit,
    FaTwitch,
    FaDiscord,
    FaSpotify,
    FaTelegram,
    FaWhatsapp,
    FaThreads,
    FaMedium,
    FaDribbble,
    FaBehance,
    FaPatreon,
    FaPaypal,
    FaSoundcloud,
    FaVimeo,
    FaKickstarter,
    FaEtsy,
    FaAmazon,
    FaShopify,
} from 'react-icons/fa6'

// Full catalogue of supported platforms
const ALL_PLATFORMS = [
    { key: 'instagram', label: 'Instagram', Icon: FaInstagram, placeholder: 'https://instagram.com/username', color: '#E1306C' },
    { key: 'tiktok', label: 'TikTok', Icon: FaTiktok, placeholder: 'https://tiktok.com/@username', color: '#010101' },
    { key: 'youtube', label: 'YouTube', Icon: FaYoutube, placeholder: 'https://youtube.com/@username', color: '#FF0000' },
    { key: 'twitter', label: 'Twitter / X', Icon: FaXTwitter, placeholder: 'https://x.com/username', color: '#000000' },
    { key: 'facebook', label: 'Facebook', Icon: FaFacebook, placeholder: 'https://facebook.com/username', color: '#1877F2' },
    { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedin, placeholder: 'https://linkedin.com/in/username', color: '#0A66C2' },
    { key: 'threads', label: 'Threads', Icon: FaThreads, placeholder: 'https://threads.net/@username', color: '#000000' },
    { key: 'pinterest', label: 'Pinterest', Icon: FaPinterest, placeholder: 'https://pinterest.com/username', color: '#E60023' },
    { key: 'snapchat', label: 'Snapchat', Icon: FaSnapchat, placeholder: 'https://snapchat.com/add/username', color: '#FFFC00' },
    { key: 'reddit', label: 'Reddit', Icon: FaReddit, placeholder: 'https://reddit.com/u/username', color: '#FF4500' },
    { key: 'twitch', label: 'Twitch', Icon: FaTwitch, placeholder: 'https://twitch.tv/username', color: '#9146FF' },
    { key: 'discord', label: 'Discord', Icon: FaDiscord, placeholder: 'https://discord.gg/invite', color: '#5865F2' },
    { key: 'telegram', label: 'Telegram', Icon: FaTelegram, placeholder: 'https://t.me/username', color: '#2AABEE' },
    { key: 'whatsapp', label: 'WhatsApp', Icon: FaWhatsapp, placeholder: 'https://wa.me/1234567890', color: '#25D366' },
    { key: 'spotify', label: 'Spotify', Icon: FaSpotify, placeholder: 'https://open.spotify.com/artist/...', color: '#1DB954' },
    { key: 'soundcloud', label: 'SoundCloud', Icon: FaSoundcloud, placeholder: 'https://soundcloud.com/username', color: '#FF5500' },
    { key: 'medium', label: 'Medium', Icon: FaMedium, placeholder: 'https://medium.com/@username', color: '#000000' },
    { key: 'github', label: 'GitHub', Icon: FaGithub, placeholder: 'https://github.com/username', color: '#181717' },
    { key: 'dribbble', label: 'Dribbble', Icon: FaDribbble, placeholder: 'https://dribbble.com/username', color: '#EA4C89' },
    { key: 'behance', label: 'Behance', Icon: FaBehance, placeholder: 'https://behance.net/username', color: '#1769FF' },
    { key: 'vimeo', label: 'Vimeo', Icon: FaVimeo, placeholder: 'https://vimeo.com/username', color: '#1AB7EA' },
    { key: 'patreon', label: 'Patreon', Icon: FaPatreon, placeholder: 'https://patreon.com/username', color: '#FF424D' },
    { key: 'paypal', label: 'PayPal', Icon: FaPaypal, placeholder: 'https://paypal.me/username', color: '#003087' },
    { key: 'etsy', label: 'Etsy', Icon: FaEtsy, placeholder: 'https://etsy.com/shop/yourshop', color: '#F56400' },
    { key: 'amazon', label: 'Amazon', Icon: FaAmazon, placeholder: 'https://amazon.com/shop/username', color: '#FF9900' },
    { key: 'shopify', label: 'Shopify', Icon: FaShopify, placeholder: 'https://yourstore.myshopify.com', color: '#96BF48' },
    { key: 'kickstarter', label: 'Kickstarter', Icon: FaKickstarter, placeholder: 'https://kickstarter.com/profile/...', color: '#05CE78' },
]

export default function SocialLinksPage() {
    const { pageData, setPageData, saveChangesToBackend } = useMiniSite()

    const [showPicker, setShowPicker] = useState(false)
    const [pickerSearch, setPickerSearch] = useState('')

    // Platforms already added by the user
    const addedKeys = pageData.socialLinks.map(s => s.platform)

    // Platforms not yet added (filtered by search)
    const availablePlatforms = ALL_PLATFORMS.filter(p =>
        !addedKeys.includes(p.key as any) &&
        p.label.toLowerCase().includes(pickerSearch.toLowerCase())
    )

    // ── Handlers ────────────────────────────────────────────────────────────────

    const handleAdd = (platformKey: string) => {
        setPageData(prev => ({
            ...prev,
            socialLinks: [
                ...prev.socialLinks,
                { platform: platformKey as any, url: '', isActive: true }
            ]
        }))
        setShowPicker(false)
        setPickerSearch('')
    }

    const handleRemove = (platformKey: string) => {
        setPageData(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.filter(s => s.platform !== platformKey)
        }))
    }

    const handleUrlChange = (platform: string, url: string) => {
        setPageData(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.map(s =>
                s.platform === platform ? { ...s, url } : s
            )
        }))
    }

    const handleToggleActive = (platform: string) => {
        setPageData(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.map(s =>
                s.platform === platform ? { ...s, isActive: !s.isActive } : s
            )
        }))
    }

    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">
                        Mini Site Editor
                    </span>
                    <h2 className="font-bold text-gray-900 dark:text-gray-150 mt-1">
                        Social Links Configuration
                    </h2>
                </div>
                <Button
                    variant="solid"
                    onClick={async () => {
                        try {
                            await saveChangesToBackend();
                            alert('Social links saved to backend successfully!');
                        } catch (err) {
                            console.error('Failed to save social links:', err);
                        }
                    }}
                    className="flex items-center gap-1 text-xs font-bold cursor-pointer"
                >
                    <Icons.Save size={14} /> Save Changes
                </Button>
            </div>

            {/* Shared Tabs */}
            <LinkInBioTabs />

            {/* Config Card */}
            <Card bodyClass="p-6 flex flex-col gap-5">
                {/* Title + Add button */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h5 className="font-black text-gray-800 dark:text-gray-200">Social Profile Icons</h5>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            Add and manage social links that appear as icons under your bio.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => { setShowPicker(v => !v); setPickerSearch('') }}
                        className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-sm shadow-primary/20 flex-shrink-0"
                    >
                        <Icons.Plus size={14} />
                        Add Social
                    </button>
                </div>

                {/* ── Platform Picker (expandable panel) ── */}
                {showPicker && (
                    <div className="border border-gray-200 dark:border-zinc-700 rounded-2xl overflow-hidden bg-gray-50 dark:bg-zinc-900/50">
                        {/* Search */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                            <Icons.Search size={14} className="text-gray-400 flex-shrink-0" />
                            <input
                                autoFocus
                                value={pickerSearch}
                                onChange={e => setPickerSearch(e.target.value)}
                                placeholder="Search platforms..."
                                className="flex-1 bg-transparent text-xs font-bold text-gray-700 dark:text-gray-200 outline-none placeholder:text-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => { setShowPicker(false); setPickerSearch('') }}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            >
                                <Icons.X size={14} />
                            </button>
                        </div>

                        {/* Grid of available platforms */}
                        <div className="p-3 flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                            {availablePlatforms.length === 0 ? (
                                <div className="col-span-4 text-center py-6 text-xs text-gray-400 font-bold">
                                    {pickerSearch ? 'No platforms found' : 'All platforms already added!'}
                                </div>
                            ) : (
                                availablePlatforms.map(p => {
                                    const PIcon = p.Icon
                                    return (
                                        <button
                                            key={p.key}
                                            type="button"
                                            onClick={() => handleAdd(p.key)}
                                            className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-primary hover:bg-primary/5 transition-all group min-w-22"
                                        >
                                            <div
                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                                                style={{ backgroundColor: p.color }}
                                            >
                                                <PIcon size={14} />
                                            </div>
                                            <span className="text-[9px] font-black text-gray-600 dark:text-gray-300 group-hover:text-primary truncate w-full text-center">{p.label}</span>
                                        </button>
                                    )
                                })
                            )}
                        </div>
                    </div>
                )}

                {/* ── Active social links list ── */}
                {pageData.socialLinks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 border border-dashed border-gray-200 dark:border-zinc-700 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/20 gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                            <Icons.Share2 size={20} className="text-gray-400" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-black text-gray-600 dark:text-gray-300">No social links yet</p>
                            <p className="text-xs text-gray-400 mt-0.5">Click "Add Social" to get started</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {pageData.socialLinks.map(link => {
                            const platform = ALL_PLATFORMS.find(p => p.key === link.platform)
                            if (!platform) return null
                            const PlatformIcon = platform.Icon

                            return (
                                <AdaptiveCard key={link.platform} bodyClass="p-3.5 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        {/* Coloured icon */}
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-sm"
                                            style={{ backgroundColor: platform.color }}
                                        >
                                            <PlatformIcon size={16} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs font-black block text-gray-800 dark:text-gray-200">{platform.label}</span>
                                            <Input
                                                value={link.url}
                                                onChange={e => handleUrlChange(link.platform, e.target.value)}
                                                placeholder={platform.placeholder}
                                                className="text-xs h-9 px-3 mt-1.5 w-full font-semibold border-gray-200 dark:border-zinc-800"
                                            />
                                        </div>
                                    </div>

                                    {/* Toggle + Remove */}
                                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                                        <Switcher
                                            checked={link.isActive}
                                            onChange={() => handleToggleActive(link.platform)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(link.platform)}
                                            title="Remove this social link"
                                            className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
                                        >
                                            <Icons.Trash2 size={13} />
                                        </button>
                                    </div>
                                </AdaptiveCard>
                            )
                        })}
                    </div>
                )}
            </Card>
        </div>
    )
}
