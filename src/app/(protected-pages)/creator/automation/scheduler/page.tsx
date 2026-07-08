'use client'

import React, { useState } from 'react'
import { initialScheduledPosts, ScheduledPost, PostPlatformType } from '@/mock-data/automation'
import { 
    Calendar, 
    Plus, 
    Clock, 
    Music2, 
    Sparkles, 
    ChevronLeft, 
    ChevronRight,
    CheckCircle2
} from 'lucide-react'
import { 
    FaInstagram, 
    FaXTwitter, 
    FaLinkedin, 
    FaYoutube 
} from 'react-icons/fa6'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import { Button, Input, Select } from '@/components/ui'

const platformOptions = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter (X)' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'youtube', label: 'YouTube Short' },
    { value: 'tiktok', label: 'TikTok' }
]

const platformIcons = {
    instagram: FaInstagram,
    twitter: FaXTwitter,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
    tiktok: Music2,
}

export default function ContentScheduler() {
    const [posts, setPosts] = useState<ScheduledPost[]>(initialScheduledPosts)
    const [isAdding, setIsAdding] = useState(false)
    const [newPlatform, setNewPlatform] = useState<PostPlatformType>('instagram')
    const [newContent, setNewContent] = useState('')
    const [newTime, setNewTime] = useState('12:00')
    const [newDate, setNewDate] = useState('2026-06-25')

    const handleSchedule = () => {
        if (!newContent) return
        const created: ScheduledPost = {
            id: `post-${Date.now()}`,
            platform: newPlatform,
            content: newContent,
            scheduledAt: `${newDate}T${newTime}:00.000Z`,
            status: 'scheduled'
        }
        setPosts(prev => [created, ...prev])
        setNewContent('')
        setIsAdding(false)
    }

    const currentYearMonth = 'June 2026'

    // Simple calendar day layout (June 2026 starts on a Monday)
    const daysInMonth = 30
    const startOffset = 0 // 1st is Monday, so offset is 0 for simplicity

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

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
                            Content Planner
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Draft and schedule your brand updates to multiple connected social accounts.
                        </p>
                    </div>
                    <Button variant="solid" onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 bg-primary text-white">
                        <Plus size={16} /> Schedule Post
                    </Button>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Calendar grid view */}
                    <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex justify-between items-center border-b border-gray-50 dark:border-zinc-800 pb-4">
                            <h4 className="font-extrabold text-base text-gray-900 dark:text-gray-150 flex items-center gap-2">
                                <Calendar size={18} className="text-primary" /> {currentYearMonth}
                            </h4>
                            <div className="flex items-center gap-1.5">
                                <button className="p-2 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl"><ChevronLeft size={16} /></button>
                                <button className="p-2 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl"><ChevronRight size={16} /></button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                <span key={i} className="py-1">{d}</span>
                            ))}
                            
                            {/* Empty pads if offset */}
                            {Array.from({ length: startOffset }).map((_, idx) => (
                                <div key={`empty-${idx}`} className="h-16 border border-transparent" />
                            ))}

                            {/* Month Days */}
                            {daysArray.map(day => {
                                const formattedDayStr = `2026-06-${day.toString().padStart(2, '0')}`
                                const dayPosts = posts.filter(p => p.scheduledAt.startsWith(formattedDayStr))
                                
                                return (
                                    <div 
                                        key={day} 
                                        className="h-20 border border-gray-50 dark:border-zinc-800 rounded-xl p-1 flex flex-col justify-between items-start bg-gray-50/20 dark:bg-zinc-900/50 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        <span className={`text-[10px] h-5 w-5 flex items-center justify-center font-extrabold rounded-full ${day === 19 ? 'bg-primary text-white' : 'text-gray-650'}`}>
                                            {day}
                                        </span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {dayPosts.map(p => {
                                                const PlatformIcon = platformIcons[p.platform] || FaInstagram
                                                return (
                                                    <span 
                                                        key={p.id}
                                                        className={`p-1 rounded text-white ${
                                                            p.platform === 'instagram' ? 'bg-pink-500' :
                                                            p.platform === 'twitter' ? 'bg-zinc-900 border border-zinc-800' :
                                                            p.platform === 'linkedin' ? 'bg-blue-600' :
                                                            p.platform === 'youtube' ? 'bg-red-650' : 'bg-lime-500'
                                                        }`}
                                                        title={p.content}
                                                    >
                                                        <PlatformIcon size={8} />
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Left: Queue list & Add dialog */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        
                        {/* Scheduler Form */}
                        {isAdding && (
                            <AdaptiveCard>
                                <h5 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Add Scheduled Post</h5>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-gray-500">Social Channel</label>
                                        <Select
                                            value={platformOptions.find(opt => opt.value === newPlatform)}
                                            onChange={option => { if (option) setNewPlatform(option.value as any) }}
                                            options={platformOptions}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-gray-500">Date</label>
                                            <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-gray-500">Time</label>
                                            <Input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-gray-500">Post Content Text</label>
                                        <Input
                                            textArea
                                            placeholder="Write caption details, hashtags..."
                                            value={newContent}
                                            onChange={e => setNewContent(e.target.value)}
                                            rows={3}
                                        />
                                    </div>

                                    <Button variant="solid" onClick={handleSchedule} className="bg-primary text-white w-full">
                                        Queue Schedule
                                    </Button>
                                </div>
                            </AdaptiveCard>
                        )}

                        {/* List Queue */}
                        <AdaptiveCard>
                            <h5 className="font-bold text-gray-900 dark:text-gray-150 mb-4">Pending Queue</h5>
                            <div className="flex flex-col gap-4">
                                {posts.map(post => {
                                    const Icon = platformIcons[post.platform] || FaInstagram
                                    const dateObj = new Date(post.scheduledAt)
                                    const timeLabel = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    const dateLabel = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' })
                                    
                                    return (
                                        <div 
                                            key={post.id}
                                            className="border-b border-gray-50 dark:border-zinc-800 pb-3 last:border-b-0 last:pb-0 flex items-start justify-between gap-3"
                                        >
                                            <div className="flex gap-2.5 min-w-0">
                                                <span className={`p-1.5 rounded-lg text-white mt-0.5 flex-shrink-0 ${
                                                    post.platform === 'instagram' ? 'bg-pink-500' :
                                                    post.platform === 'twitter' ? 'bg-zinc-900 border border-zinc-800' :
                                                    post.platform === 'linkedin' ? 'bg-blue-600' :
                                                    post.platform === 'youtube' ? 'bg-red-650' : 'bg-lime-500'
                                                }`}>
                                                    <Icon size={12} />
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate w-[160px]">
                                                        {post.content}
                                                    </p>
                                                    <span className="text-[10px] text-gray-400 font-bold block mt-1 flex items-center gap-1">
                                                        <Clock size={10} /> {dateLabel} at {timeLabel}
                                                    </span>
                                                </div>
                                            </div>

                                            {post.status === 'posted' ? (
                                                <span className="text-[9px] font-bold text-emerald-500 uppercase">Posted</span>
                                            ) : (
                                                <span className="text-[9px] font-bold text-primary uppercase">Queued</span>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </AdaptiveCard>
                    </div>

                </div>
            </div>
        </Container>
    )
}
