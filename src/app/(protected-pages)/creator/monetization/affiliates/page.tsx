'use client'

import React, { useState } from 'react'
import { initialAffiliates, AffiliateLink } from '@/mock-data/monetization'
import { 
    Link2, 
    Plus, 
    DollarSign, 
    Eye, 
    TrendingUp, 
    Percent, 
    Check, 
    Copy,
    Settings2,
    Briefcase
} from 'lucide-react'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import { Button, Input } from '@/components/ui'

export default function AffiliateLinks() {
    const [affiliates, setAffiliates] = useState<AffiliateLink[]>(initialAffiliates)
    const [isAdding, setIsAdding] = useState(false)
    const [newName, setNewName] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newRate, setNewRate] = useState('20%')
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const handleAdd = () => {
        if (!newName || !newUrl) return
        const created: AffiliateLink = {
            id: `aff-${Date.now()}`,
            productName: newName,
            url: newUrl,
            commissionRate: newRate,
            clicks: 0,
            conversions: 0,
            earnings: 0
        }
        setAffiliates(prev => [created, ...prev])
        setNewName('')
        setNewUrl('')
        setIsAdding(false)
    }

    const copyLink = (url: string, id: string) => {
        navigator.clipboard.writeText(url)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const totalClicks = affiliates.reduce((sum, a) => sum + a.clicks, 0)
    const totalConversions = affiliates.reduce((sum, a) => sum + a.conversions, 0)
    const totalEarnings = affiliates.reduce((sum, a) => sum + a.earnings, 0)
    const averageConvRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : '0'

    return (
        <Container>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="text-xs font-bold tracking-wider text-primary uppercase">
                            Monetization
                        </span>
                        <h2 className="font-bold text-gray-900 dark:text-gray-150 mt-1">
                            Affiliate Links
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Track engagement, conversions, commissions, and revenue of connected affiliate products.
                        </p>
                    </div>
                    <Button variant="solid" onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 bg-primary text-white">
                        <Plus size={16} /> Track New Link
                    </Button>
                </div>

                {/* Performance stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <AdaptiveCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">Affiliate Earnings</span>
                                <h3 className="font-extrabold mt-1 text-gray-900 dark:text-gray-100">${totalEarnings.toLocaleString()}</h3>
                            </div>
                            <span className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600"><DollarSign size={20} /></span>
                        </div>
                    </AdaptiveCard>
                    <AdaptiveCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">Clicks</span>
                                <h3 className="font-extrabold mt-1 text-gray-900 dark:text-gray-100">{totalClicks}</h3>
                            </div>
                            <span className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600"><Eye size={20} /></span>
                        </div>
                    </AdaptiveCard>
                    <AdaptiveCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">Conversions</span>
                                <h3 className="font-extrabold mt-1 text-gray-900 dark:text-gray-100">{totalConversions}</h3>
                            </div>
                            <span className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600"><TrendingUp size={20} /></span>
                        </div>
                    </AdaptiveCard>
                    <AdaptiveCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">Conv. Rate</span>
                                <h3 className="font-extrabold mt-1 text-gray-900 dark:text-gray-100">{averageConvRate}%</h3>
                            </div>
                            <span className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600"><Percent size={20} /></span>
                        </div>
                    </AdaptiveCard>
                </div>

                {/* Add new link form */}
                {isAdding && (
                    <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col gap-4 max-w-2xl">
                        <h5 className="font-bold">Track Affiliate Connection</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-500">Product Name</label>
                                <Input 
                                    placeholder="e.g. Hostinger Cloud Premium" 
                                    value={newName} 
                                    onChange={e => setNewName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-500">Commission Rate</label>
                                <Input 
                                    placeholder="e.g. 20% or $15 fixed" 
                                    value={newRate} 
                                    onChange={e => setNewRate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500">Affiliate Referral URL</label>
                            <Input 
                                placeholder="Paste your affiliate link..." 
                                value={newUrl} 
                                onChange={e => setNewUrl(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="plain" size="sm" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button variant="solid" size="sm" onClick={handleAdd} className="bg-primary text-white">Save Link</Button>
                        </div>
                    </div>
                )}

                {/* Affiliates List Table */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h5 className="font-bold text-gray-800 dark:text-gray-250">Referral Links</h5>
                        <span className="text-xs text-gray-400 font-semibold">{affiliates.length} Connected Items</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs font-semibold text-gray-500">
                            <thead>
                                <tr className="border-b border-gray-50 dark:border-zinc-850 text-gray-400 uppercase font-extrabold text-[10px] tracking-wider">
                                    <th className="pb-3">Product</th>
                                    <th className="pb-3">Commission</th>
                                    <th className="pb-3">Clicks</th>
                                    <th className="pb-3">Conversions</th>
                                    <th className="pb-3">Total Earnings</th>
                                    <th className="pb-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {affiliates.map(a => (
                                    <tr key={a.id} className="border-b border-gray-50 dark:border-zinc-850/50 hover:bg-gray-50/30 dark:hover:bg-zinc-950/10 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="p-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-400"><Briefcase size={12} /></span>
                                                <span className="font-bold text-gray-900 dark:text-gray-200">{a.productName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 font-bold text-gray-800 dark:text-gray-300">{a.commissionRate}</td>
                                        <td className="py-4 font-bold">{a.clicks}</td>
                                        <td className="py-4 font-bold">{a.conversions}</td>
                                        <td className="py-4 font-bold text-primary">${a.earnings.toFixed(2)}</td>
                                        <td className="py-4 text-right">
                                            <button 
                                                onClick={() => copyLink(a.url, a.id)}
                                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-500 transition-colors inline-flex items-center gap-1.5"
                                                title="Copy Affiliate Link"
                                            >
                                                {copiedId === a.id ? (
                                                    <>
                                                        <Check size={12} className="text-emerald-500" />
                                                        <span className="text-[10px] text-emerald-500 font-bold">Copied</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy size={12} />
                                                        <span className="text-[10px] font-bold">Copy Link</span>
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </Container>
    )
}
