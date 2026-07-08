'use client'

import React, { useState } from 'react'
import { initialWhatsappTemplates, WhatsappTemplate } from '@/mock-data/automation'
import { 
    MessageSquare, 
    Plus, 
    Send, 
    Check, 
    Sparkles, 
    Phone, 
    Activity, 
    Eye,
    CheckCheck
} from 'lucide-react'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import { Button, Input, Switcher, Select } from '@/components/ui'

const triggerOptions = [
    { value: 'New lead joins Email Collection', label: 'New lead joins Email Collection' },
    { value: 'Course purchased successfully', label: 'Course purchased successfully' },
    { value: 'Product purchased successfully', label: 'Product purchased successfully' },
    { value: 'Booking calendar scheduled', label: 'Booking calendar scheduled' }
]

export default function WhatsappAutomation() {
    const [templates, setTemplates] = useState<WhatsappTemplate[]>(initialWhatsappTemplates)
    const [isCreating, setIsCreating] = useState(false)
    const [newName, setNewName] = useState('')
    const [newTrigger, setNewTrigger] = useState('New lead joins Email Collection')
    const [newMessage, setNewMessage] = useState('')

    const handleToggle = (id: string) => {
        setTemplates(prev => prev.map(t => {
            if (t.id === id) {
                return { ...t, isActive: !t.isActive }
            }
            return t
        }))
    }

    const handleCreate = () => {
        if (!newName || !newMessage) return
        const created: WhatsappTemplate = {
            id: `wa-${Date.now()}`,
            name: newName,
            trigger: newTrigger,
            message: newMessage,
            isActive: true,
            sentCount: 0,
            readCount: 0
        }
        setTemplates(prev => [...prev, created])
        setNewName('')
        setNewMessage('')
        setIsCreating(false)
    }

    const totalSent = templates.reduce((sum, t) => sum + t.sentCount, 0)
    const totalRead = templates.reduce((sum, t) => sum + t.readCount, 0)
    const readRate = totalSent > 0 ? ((totalRead / totalSent) * 100).toFixed(1) : '0'

    return (
        <Container>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="text-xs font-bold tracking-wider text-primary uppercase">
                            Automation
                        </span>
                        <h2 className="font-bold text-gray-900 dark:text-gray-150 mt-1">
                            WhatsApp Automation
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Trigger automated WhatsApp messages to contacts based on signups, clicks, or payments.
                        </p>
                    </div>
                    <Button variant="solid" onClick={() => setIsCreating(!isCreating)} className="flex items-center gap-2 bg-primary text-white">
                        <Plus size={16} /> Add Rule / Template
                    </Button>
                </div>

                {/* Stats panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AdaptiveCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">Total Messages Sent</span>
                                <h3 className="font-extrabold mt-1 text-gray-900 dark:text-gray-100">{totalSent}</h3>
                            </div>
                            <span className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600"><Send size={20} /></span>
                        </div>
                    </AdaptiveCard>
                    <AdaptiveCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">Total Read Messages</span>
                                <h3 className="font-extrabold mt-1 text-gray-900 dark:text-gray-100">{totalRead}</h3>
                            </div>
                            <span className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600"><CheckCheck size={20} /></span>
                        </div>
                    </AdaptiveCard>
                    <AdaptiveCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">Read-Through Rate</span>
                                <h3 className="font-extrabold mt-1 text-gray-900 dark:text-gray-100">{readRate}%</h3>
                            </div>
                            <span className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600"><Activity size={20} /></span>
                        </div>
                    </AdaptiveCard>
                </div>

                {/* Create template form */}
                {isCreating && (
                    <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col gap-4 max-w-2xl">
                        <h5 className="font-bold">New Automation Rule</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-500">Template / Rule Name</label>
                                <Input 
                                    placeholder="e.g. Free Ebook Welcome Delivery" 
                                    value={newName} 
                                    onChange={e => setNewName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-500">Trigger Event</label>
                                <Select 
                                    value={triggerOptions.find(opt => opt.value === newTrigger)} 
                                    onChange={option => { if (option) setNewTrigger(option.value) }}
                                    options={triggerOptions}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500">WhatsApp Message Body</label>
                            <Input 
                                textArea 
                                placeholder="Write message... Use {{name}} for dynamic tags." 
                                value={newMessage} 
                                onChange={e => setNewMessage(e.target.value)}
                                rows={4}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="plain" size="sm" onClick={() => setIsCreating(false)}>Cancel</Button>
                            <Button variant="solid" size="sm" onClick={handleCreate} className="bg-primary text-white">Create Automation</Button>
                        </div>
                    </div>
                )}

                {/* Templates List */}
                <div className="flex flex-col gap-4">
                    <h5 className="font-bold text-gray-800 dark:text-gray-250">Active Rules & Templates</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {templates.map(t => (
                            <div 
                                key={t.id}
                                className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between gap-4"
                            >
                                <div>
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h6 className="font-bold text-gray-900 dark:text-gray-150 flex items-center gap-1.5">
                                                <Phone size={14} className="text-emerald-500" /> {t.name}
                                            </h6>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase block mt-1">Trigger: {t.trigger}</span>
                                        </div>
                                        <Switcher checked={t.isActive} onChange={() => handleToggle(t.id)} />
                                    </div>
                                    <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950/20 text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-zinc-800 leading-relaxed font-mono">
                                        {t.message}
                                    </div>
                                </div>

                                <div className="border-t border-gray-50 dark:border-zinc-800 pt-3 flex justify-between items-center text-xs font-bold text-gray-400">
                                    <span>Sent: <b className="text-gray-800 dark:text-gray-200">{t.sentCount}</b></span>
                                    <span>Read: <b className="text-gray-800 dark:text-gray-200">{t.readCount}</b></span>
                                    <span className="text-emerald-500">Read rate: {t.sentCount > 0 ? ((t.readCount / t.sentCount) * 100).toFixed(0) : '0'}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    )
}
