'use client'

import React, { useState } from 'react'
import { initialCourses, Course } from '@/mock-data/monetization'
import { 
    BookOpen, 
    Plus, 
    DollarSign, 
    Users, 
    Star, 
    Check, 
    Layers, 
    Video,
    TrendingUp,
    FileText
} from 'lucide-react'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import { Button, Input } from '@/components/ui'

export default function CoursesManager() {
    const [courses, setCourses] = useState<Course[]>(initialCourses)
    const [isCreating, setIsCreating] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newPrice, setNewPrice] = useState('49')
    const [newLessons, setNewLessons] = useState('10')
    const [newThumb, setNewThumb] = useState('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&h=250&q=80')

    const handleCreate = () => {
        if (!newTitle) return
        const created: Course = {
            id: `course-${Date.now()}`,
            title: newTitle,
            thumbnail: newThumb,
            price: parseFloat(newPrice) || 0,
            students: 0,
            status: 'draft',
            rating: 0,
            lessonsCount: parseInt(newLessons) || 0
        }
        setCourses(prev => [created, ...prev])
        setNewTitle('')
        setIsCreating(false)
    }

    const totalStudents = courses.reduce((sum, c) => sum + c.students, 0)
    const totalEarnings = courses.reduce((sum, c) => sum + (c.students * c.price), 0)

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
                            Digital Courses
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Create educational courses, schedule modules, and track sales performance stats.
                        </p>
                    </div>
                    <Button variant="solid" onClick={() => setIsCreating(!isCreating)} className="flex items-center gap-2 bg-primary text-white">
                        <Plus size={16} /> Create Course
                    </Button>
                </div>

                {/* Performance stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AdaptiveCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">Course Revenue</span>
                                <h3 className="font-extrabold mt-1 text-gray-900 dark:text-gray-100">${totalEarnings.toLocaleString()}</h3>
                            </div>
                            <span className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600"><DollarSign size={20} /></span>
                        </div>
                    </AdaptiveCard>
                    <AdaptiveCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">Active Students</span>
                                <h3 className="font-extrabold mt-1 text-gray-900 dark:text-gray-100">{totalStudents}</h3>
                            </div>
                            <span className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600"><Users size={20} /></span>
                        </div>
                    </AdaptiveCard>
                    <AdaptiveCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs text-gray-400 font-bold uppercase">Total Classes</span>
                                <h3 className="font-extrabold mt-1 text-gray-900 dark:text-gray-100">{courses.length}</h3>
                            </div>
                            <span className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600"><Layers size={20} /></span>
                        </div>
                    </AdaptiveCard>
                </div>

                {/* Course designer template */}
                {isCreating && (
                    <div className="bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col gap-4 max-w-2xl">
                        <h5 className="font-bold">New Digital Course Layout</h5>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500">Course Title Name</label>
                            <Input 
                                placeholder="e.g. Masterclass on Next.js 15 Foundations" 
                                value={newTitle} 
                                onChange={e => setNewTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-500">Price (USD)</label>
                                <Input 
                                    type="number" 
                                    placeholder="49" 
                                    value={newPrice} 
                                    onChange={e => setNewPrice(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-500">Lessons / Syllabus Count</label>
                                <Input 
                                    type="number" 
                                    placeholder="10" 
                                    value={newLessons} 
                                    onChange={e => setNewLessons(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500">Thumbnail Image URL</label>
                            <Input 
                                placeholder="Paste image link..." 
                                value={newThumb} 
                                onChange={e => setNewThumb(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="plain" size="sm" onClick={() => setIsCreating(false)}>Cancel</Button>
                            <Button variant="solid" size="sm" onClick={handleCreate} className="bg-primary text-white">Create Draft</Button>
                        </div>
                    </div>
                )}

                {/* Courses catalog list */}
                <div className="flex flex-col gap-4">
                    <h5 className="font-bold text-gray-800 dark:text-gray-250">My Courses Catalog</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map(course => (
                            <div 
                                key={course.id}
                                className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                            >
                                <img 
                                    src={course.thumbnail} 
                                    alt={course.title} 
                                    className="w-full h-44 object-cover border-b border-gray-50 dark:border-zinc-850"
                                />
                                <div className="p-5 flex flex-col gap-3">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full self-start ${
                                        course.status === 'published' 
                                            ? 'bg-emerald-500/10 text-emerald-650' 
                                            : 'bg-amber-500/10 text-amber-650'
                                    }`}>
                                        {course.status === 'published' ? 'Active / Published' : 'Draft Mode'}
                                    </span>
                                    <h6 className="font-bold text-sm leading-snug text-gray-900 dark:text-gray-100 min-h-[40px]">
                                        {course.title}
                                    </h6>
                                    
                                    <div className="flex items-center justify-between text-xs text-gray-500 font-semibold border-t border-gray-50 dark:border-zinc-850 pt-3">
                                        <span className="flex items-center gap-1"><FileText size={13} /> {course.lessonsCount} lessons</span>
                                        <span className="flex items-center gap-1"><Users size={13} /> {course.students} students</span>
                                        <span className="text-gray-900 dark:text-gray-200 font-extrabold">${course.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    )
}
