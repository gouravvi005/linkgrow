'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { initialLinkPages, BioLinkPage } from '@/mock-data/linkPages'
import { themes } from '@/mock-data/themes'
import { apiGetAllProfiles, apiToggleProfileStatus, apiDeleteProfile } from '@/services/ProfileService'
import { 
    Plus, 
    ExternalLink, 
    Edit3, 
    Copy, 
    Check, 
    BarChart2, 
    QrCode, 
    Settings, 
    Sparkles, 
    Trash2, 
    Eye, 
    MousePointerClick, 
    TrendingUp,
    RefreshCw
} from 'lucide-react'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Button } from '@/components/ui'

export default function LinkPages() {
    const { data: remotePages, mutate, isLoading } = useSWR<BioLinkPage[]>('/profile/all', apiGetAllProfiles, {
        revalidateOnFocus: true,
        shouldRetryOnError: false,
    })

    const pages: BioLinkPage[] = (remotePages && remotePages.length > 0) ? remotePages : initialLinkPages

    const [copiedId, setCopiedId] = useState<string | null>(null)
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleCopy = (url: string, id: string) => {
        navigator.clipboard.writeText(`https://linkgrow.io/${url}`)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const toggleStatus = async (id: string) => {
        try {
            await apiToggleProfileStatus(id)
            mutate()
        } catch (err) {
            console.error('Failed to toggle status:', err)
        }
    }

    const deletePage = (id: string) => {
        setDeleteTargetId(id)
    }

    const executeDeletePage = async () => {
        if (!deleteTargetId) return
        try {
            setIsSubmitting(true)
            await apiDeleteProfile(deleteTargetId)
            mutate()
        } catch (err) {
            console.error('Failed to delete profile:', err)
        } finally {
            setIsSubmitting(false)
            setDeleteTargetId(null)
        }
    }

    // Totals calculations
    const totalViews = pages.reduce((sum, p) => sum + (p.views || 0), 0)
    const totalClicks = pages.reduce((sum, p) => sum + (p.clicks || 0), 0)
    const averageCtr = pages.length > 0 
        ? parseFloat((pages.reduce((sum, p) => sum + (p.ctr || 0), 0) / pages.length).toFixed(1)) 
        : 0


    return (
        <Container>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="text-xs font-bold tracking-wider text-primary uppercase">
                            Link In Bio
                        </span>
                        <h2 className="font-bold text-gray-900 dark:text-gray-150 mt-1">
                            My Link Pages
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Manage, edit and monitor the engagement of your public profile directories.
                        </p>
                    </div>
                    <Link href="/creator/mini-site/content">
                        <Button className="flex items-center gap-2" variant="solid">
                            <Plus size={16} />
                            Create New Page
                        </Button>
                    </Link>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AdaptiveCard>
                        <div className="flex items-center justify-between p-1">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Views</p>
                                <h3 className="font-extrabold text-gray-900 dark:text-gray-100 mt-1">
                                    {totalViews.toLocaleString()}
                                </h3>
                            </div>
                            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-650 dark:text-blue-400">
                                <Eye size={22} />
                            </div>
                        </div>
                    </AdaptiveCard>

                    <AdaptiveCard>
                        <div className="flex items-center justify-between p-1">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Clicks</p>
                                <h3 className="font-extrabold text-gray-900 dark:text-gray-100 mt-1">
                                    {totalClicks.toLocaleString()}
                                </h3>
                            </div>
                            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-650 dark:text-emerald-400">
                                <MousePointerClick size={22} />
                            </div>
                        </div>
                    </AdaptiveCard>

                    <AdaptiveCard>
                        <div className="flex items-center justify-between p-1">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Average Click-Through Rate</p>
                                <h3 className="font-extrabold text-gray-900 dark:text-gray-100 mt-1">
                                    {averageCtr}%
                                </h3>
                            </div>
                            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-650 dark:text-amber-400">
                                <TrendingUp size={22} />
                            </div>
                        </div>
                    </AdaptiveCard>
                </div>

                {/* Pages List */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mt-2">Active Profiles</h4>
                    {pages.length === 0 ? (
                        <div className="border border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center bg-gray-50/50 dark:bg-gray-900/10">
                            <p className="text-gray-500">No link pages created yet. Click the button above to launch your first one!</p>
                        </div>
                    ) : (
                        pages.map(page => {
                            const activeTheme = themes.find(t => t.id === page.themeId) || themes[0]
                            return (
                                <div 
                                    key={page.id}
                                    className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img 
                                                src={page.avatar} 
                                                alt={page.title} 
                                                className="w-14 h-14 rounded-full border border-gray-200 dark:border-zinc-700 object-cover"
                                            />
                                            <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-zinc-900 ${page.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-gray-950 dark:text-gray-50">{page.title}</h5>
                                            <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                <span>linkgrow.io/{page.url}</span>
                                                <button 
                                                    onClick={() => handleCopy(page.url, page.id)} 
                                                    className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                                                    title="Copy link"
                                                >
                                                    {copiedId === page.id ? (
                                                        <Check size={12} className="text-emerald-500" />
                                                    ) : (
                                                        <Copy size={12} />
                                                    )}
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-150 dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
                                                    Theme: {activeTheme.name}
                                                </span>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                                    {page.sections.reduce((sum, s) => sum + s.items.length, 0)} Blocks
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats grid */}
                                    <div className="grid grid-cols-3 gap-6 border-y md:border-y-0 border-gray-100 dark:border-zinc-800 py-3 md:py-0 w-full md:w-auto">
                                        <div className="text-center md:text-left">
                                            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Views</div>
                                            <div className="text-sm font-extrabold mt-0.5">{page.views.toLocaleString()}</div>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Clicks</div>
                                            <div className="text-sm font-extrabold mt-0.5">{page.clicks.toLocaleString()}</div>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">CTR</div>
                                            <div className="text-sm font-extrabold mt-0.5 text-primary">{page.ctr}%</div>
                                        </div>
                                    </div>

                                    {/* Action items */}
                                    <div className="flex items-center justify-end gap-2 w-full md:w-auto border-t md:border-t-0 border-gray-50 dark:border-zinc-850 pt-3 md:pt-0">
                                        <button 
                                            onClick={() => toggleStatus(page.id)}
                                            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                                                page.status === 'active' 
                                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20' 
                                                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                                            }`}
                                        >
                                            {page.status === 'active' ? 'Active' : 'Draft'}
                                        </button>
                                        <Link href={`/creator/mini-site/content?id=${page.id}`}>
                                            <button className="p-2 hover:bg-gray-50 dark:hover:bg-zinc-850 border border-gray-100 dark:border-zinc-800 rounded-xl text-gray-600 dark:text-gray-300 transition-colors" title="Edit Builder">
                                                <Edit3 size={16} />
                                            </button>
                                        </Link>
                                        <Link href={`/creator/link-in-bio/qr-codes?id=${page.id}`}>
                                            <button className="p-2 hover:bg-gray-50 dark:hover:bg-zinc-850 border border-gray-100 dark:border-zinc-800 rounded-xl text-gray-600 dark:text-gray-300 transition-colors" title="QR Code">
                                                <QrCode size={16} />
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={() => deletePage(page.id)}
                                            className="p-2 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-transparent hover:border-rose-100 dark:hover:border-rose-900/30 rounded-xl text-rose-500 transition-colors" 
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            {/* Delete Confirmation Alert Popup */}
            <ConfirmDialog
                isOpen={deleteTargetId !== null}
                onClose={() => setDeleteTargetId(null)}
                type="danger"
                title="Delete Page"
                onCancel={() => setDeleteTargetId(null)}
                onConfirm={executeDeletePage}
                confirmText="Delete"
            >
                <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
                    Are you sure you want to delete this link page? This action cannot be undone.
                </p>
            </ConfirmDialog>
        </Container>
    )
}
