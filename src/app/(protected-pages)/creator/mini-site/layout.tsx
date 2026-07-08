'use client'

import React, { useRef, useState } from 'react'
import { MiniSiteProvider, useMiniSite } from './MiniSiteContext'
import Container from '@/components/shared/Container'
import Card from '@/components/ui/Card'
import { themes } from '@/mock-data/themes'
import * as Icons from 'lucide-react'
import { 
    FaInstagram, 
    FaYoutube, 
    FaLinkedin, 
    FaXTwitter, 
    FaFacebook, 
    FaGithub, 
    FaPaypal, 
    FaPatreon, 
    FaSpotify 
} from 'react-icons/fa6'

const LucideIcon = ({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) => {
    const IconComponent = (Icons as any)[name] || Icons.Link
    return <IconComponent size={size} className={className} />
}

const socialIconsMap = {
    instagram: FaInstagram,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
    twitter: FaXTwitter,
    tiktok: Icons.Music2,
    facebook: FaFacebook,
    github: FaGithub,
}

// 20 customizable presets matching the screenshot
const customizableThemesList = [
    { id: 'custom', name: 'Custom', class: 'bg-zinc-100 dark:bg-zinc-900' },
    { id: 'agate', name: 'Agate', class: 'bg-gradient-to-br from-teal-400 to-green-500' },
    { id: 'air', name: 'Air', class: 'bg-sky-100 dark:bg-sky-950/20' },
    { id: 'astrid', name: 'Astrid', class: 'bg-gradient-to-tr from-slate-900 via-purple-950 to-indigo-950 text-white' },
    { id: 'aura', name: 'Aura', class: 'bg-gradient-to-br from-amber-50 to-orange-100' },
    { id: 'bliss', name: 'Bliss', class: 'bg-gradient-to-tr from-pink-200 to-indigo-200' },
    { id: 'blocks', name: 'Blocks', class: 'bg-purple-650 text-white' },
    { id: 'bloom', name: 'Bloom', class: 'bg-gradient-to-r from-rose-500 to-orange-500' },
    { id: 'breeze', name: 'Breeze', class: 'bg-gradient-to-tr from-indigo-100 to-pink-100' },
    { id: 'encore', name: 'Encore', class: 'bg-neutral-950 text-white' },
    { id: 'grid', name: 'Grid', class: 'bg-zinc-50 border border-zinc-200' },
    { id: 'groove', name: 'Groove', class: 'bg-gradient-to-b from-indigo-900 via-rose-950 to-neutral-950 text-white' },
    { id: 'haven', name: 'Haven', class: 'bg-stone-150' },
    { id: 'lake', name: 'Lake', class: 'bg-gradient-to-b from-zinc-800 to-zinc-950 text-white' },
    { id: 'mineral', name: 'Mineral', class: 'bg-orange-50/50' },
    { id: 'nourish', name: 'Nourish', class: 'bg-emerald-950 text-stone-100' },
    { id: 'rose', name: 'Rose', class: 'bg-gradient-to-br from-orange-400 to-rose-500' },
    { id: 'sweat', name: 'Sweat', class: 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-white' },
    { id: 'thess', name: 'Thess', class: 'bg-amber-100/50' },
    { id: 'twilight', name: 'Twilight', class: 'bg-gradient-to-b from-purple-900 to-indigo-950 text-white' },
    { id: 'vox', name: 'Vox', class: 'bg-red-700 text-white' }
]

// Smooth Horizontal Carousel scroll container
const HorizontalSlider = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
            setShowLeftArrow(scrollLeft > 10)
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const scrollAmount = 150
            containerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="relative group/slider w-full">
            {showLeftArrow && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-40 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full p-1 border border-white/10 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                    <Icons.ChevronLeft size={12} />
                </button>
            )}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex gap-2 overflow-x-auto scrollbar-none pb-1 w-full scroll-smooth"
            >
                {children}
            </div>
            {showRightArrow && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-40 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full p-1 border border-white/10 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                    <Icons.ChevronRight size={12} />
                </button>
            )}
        </div>
    )
}

function MiniSiteLayoutInner({ children }: { children: React.ReactNode }) {
    const { 
        pageData, 
        setPageData,
        previewMode, 
        setPreviewMode,
        avatarSize,
        titleFontSize,
        bioFontSize,
        buttonRoundness,
        buttonPadding,
        buttonSpacing,
        buttonStyle,
        buttonShadow,
        buttonColor,
        buttonTextColor,
        pageFont,
        pageTextColor,
        titleFontColor,
        titleSize,
        altTitleFont,
        headerLayout,
        heroBannerImage,
        heroBannerColor1,
        heroBannerColor2,
    } = useMiniSite()

    const [emailVal, setEmailVal] = useState('')
    const [emailSuccess, setEmailSuccess] = useState(false)
    const [isEditingUsername, setIsEditingUsername] = useState(false)
    const [usernameInput, setUsernameInput] = useState('')
    const [copied, setCopied] = useState(false)

    const currentTheme = themes.find(t => t.id === pageData.themeId) || themes[0]

    const getMockBackground = () => {
        if (pageData.themeId === 'custom') return 'bg-zinc-100 dark:bg-zinc-900'
        const customObj = customizableThemesList.find(t => t.id === pageData.themeId)
        if (customObj) return customObj.class
        return currentTheme.background
    }

    const getMockButtonClass = () => {
        let classes = ''
        
        // Shadows
        if (buttonShadow === 'soft') {
            classes += ' shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
        } else if (buttonShadow === 'strong') {
            classes += ' shadow-[0_8px_24px_rgba(0,0,0,0.12)]'
        } else if (buttonShadow === 'hard') {
            classes += ' shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
        }

        return classes
    }

    return (
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Dynamic Workspace child forms (Content, Theme, Header, etc.) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    {children}
                </div>

                {/* Right Side: Persistent Mockup device (stays mounted and keeps state active!) */}
                <div className="lg:col-span-5 flex justify-center sticky top-24">
                    <div className="flex flex-col items-center gap-3 w-full">

                        {/* ── Username / Profile URL Banner (editable) ── */}
                        <div className="w-full rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
                            {isEditingUsername ? (
                                /* ── Edit mode ── */
                                <div className="flex flex-col gap-2 p-3">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                        Edit your handle
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 flex-1 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2 focus-within:border-primary transition-colors">
                                            <span className="text-xs font-mono text-gray-400 flex-shrink-0">linkgrow.com/</span>
                                            <input
                                                autoFocus
                                                value={usernameInput}
                                                onChange={e => setUsernameInput(e.target.value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase())}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter') {
                                                        if (usernameInput.trim()) {
                                                            setPageData(prev => ({ ...prev, url: usernameInput.trim() }))
                                                        }
                                                        setIsEditingUsername(false)
                                                    }
                                                    if (e.key === 'Escape') setIsEditingUsername(false)
                                                }}
                                                className="flex-1 bg-transparent text-xs font-black text-gray-900 dark:text-gray-100 outline-none min-w-0"
                                                placeholder="yourhandle"
                                                spellCheck={false}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (usernameInput.trim()) {
                                                    setPageData(prev => ({ ...prev, url: usernameInput.trim() }))
                                                }
                                                setIsEditingUsername(false)
                                            }}
                                            className="flex-shrink-0 h-9 px-3 bg-primary text-white text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditingUsername(false)}
                                            className="flex-shrink-0 h-9 w-9 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                        >
                                            <Icons.X size={14} />
                                        </button>
                                    </div>
                                    <p className="text-[9px] text-gray-400">
                                        Only letters, numbers and underscores. Press Enter to save.
                                    </p>
                                </div>
                            ) : (
                                /* ── Display mode ── */
                                <div className="flex items-center justify-between gap-2 px-3 py-2">
                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Icons.Link2 size={11} className="text-primary" />
                                        </div>
                                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 truncate">
                                            linkgrow.com/<span className="font-black text-gray-900 dark:text-gray-100">{pageData.url || pageData.title || 'yourhandle'}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setUsernameInput(pageData.url || '')
                                                setIsEditingUsername(true)
                                            }}
                                            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-primary transition-colors bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-2 py-1 hover:border-primary/30"
                                            title="Edit username"
                                        >
                                            <Icons.Pencil size={10} />
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const url = `https://linkgrow.com/${pageData.url || pageData.title || 'yourhandle'}`
                                                navigator.clipboard.writeText(url)
                                                setCopied(true)
                                                setTimeout(() => setCopied(false), 1800)
                                            }}
                                            className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider rounded-lg px-2 py-1 transition-all border ${
                                                copied
                                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                                    : 'bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:text-primary hover:border-primary/30'
                                            }`}
                                            title="Copy profile URL"
                                        >
                                            {copied ? <Icons.Check size={10} /> : <Icons.Copy size={10} />}
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between w-full px-1 mb-1">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                Live Mockup Preview
                            </span>
                            <div className="flex bg-gray-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-gray-200/50 dark:border-zinc-700/50 shadow-inner">
                                <button 
                                    type="button"
                                    onClick={() => setPreviewMode('mobile')}
                                    className={`p-1.5 rounded-md transition-all ${previewMode === 'mobile' ? 'bg-white dark:bg-zinc-900 shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                    title="Mobile View"
                                >
                                    <Icons.Smartphone size={14} />
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setPreviewMode('tablet')}
                                    className={`p-1.5 rounded-md transition-all ${previewMode === 'tablet' ? 'bg-white dark:bg-zinc-900 shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                    title="Tablet View"
                                >
                                    <Icons.Tablet size={14} />
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setPreviewMode('desktop')}
                                    className={`p-1.5 rounded-md transition-all ${previewMode === 'desktop' ? 'bg-white dark:bg-zinc-900 shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                                    title="Desktop View"
                                >
                                    <Icons.Monitor size={14} />
                                </button>
                            </div>
                        </div>
                        
                        {/* Mobile/Tablet/Desktop device frame */}
                        <div 
                            style={{ transition: 'width 0.3s ease, height 0.3s ease' }}
                            className={`min-h-[610px] max-h-[710px] bg-neutral-950 rounded-[40px] shadow-2xl ring-8 ring-neutral-900 border-4 border-neutral-800 flex flex-col relative overflow-hidden max-w-full ${
                                previewMode === 'mobile' 
                                    ? 'w-[320px] p-3' 
                                    : previewMode === 'tablet' 
                                        ? 'w-[480px] p-4 rounded-[44px]' 
                                        : 'w-[600px] p-4 rounded-[20px]'
                            }`}
                        >
                            {/* Device indicator bars */}
                            {previewMode === 'mobile' && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-28 bg-neutral-950 rounded-b-2xl z-40 flex items-center justify-center">
                                    <div className="w-10 h-1 bg-neutral-800 rounded-full mb-1" />
                                </div>
                            )}
                            {previewMode === 'tablet' && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-12 bg-neutral-950 rounded-b-lg z-40 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-neutral-800 rounded-full mb-0.5" />
                                </div>
                            )}
                            {previewMode === 'desktop' && (
                                <div className="absolute top-0 left-0 right-0 h-8 bg-neutral-900 border-b border-neutral-850 z-40 flex items-center justify-between px-4">
                                    <div className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
                                    </div>
                                    <div className="text-[10px] font-bold text-neutral-500 select-none">
                                        {pageData.url || 'mysite'}.linkgrow.com
                                    </div>
                                    <div className="w-10" />
                                </div>
                            )}

                            {/* Render area */}
                            <div 
                                style={{ fontFamily: pageFont }}
                                className={`w-full h-full overflow-y-auto px-4 py-8 flex flex-col items-center justify-start ${getMockBackground()} relative scrollbar-none z-30 transition-all duration-500 ${
                                    previewMode === 'mobile' ? 'rounded-[30px]' : previewMode === 'tablet' ? 'rounded-[32px]' : 'rounded-lg pt-10'
                                }`}
                            >
                                <div className={`w-full flex flex-col items-center ${previewMode === 'desktop' ? 'max-w-[500px] w-full mx-auto' : 'w-full'}`}>
                                    {/* Classic Center circular avatar or Hero cover banner layout */}
                                    {headerLayout === 'hero' ? (
                                        /* Outer wrapper: NO overflow-hidden so avatar can hang below */
                                        <div className="w-full h-20 rounded-xl relative mb-8 flex-shrink-0">
                                            {/* Inner background layer: overflow-hidden so image fills cleanly */}
                                            <div
                                                className="absolute inset-0 rounded-xl overflow-hidden"
                                                style={{
                                                    background: heroBannerImage
                                                        ? undefined
                                                        : `linear-gradient(135deg, ${heroBannerColor1}, ${heroBannerColor2})`
                                                }}
                                            >
                                                {heroBannerImage && (
                                                    <img
                                                        src={heroBannerImage}
                                                        alt="hero banner"
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            {/* Avatar: outside overflow-hidden so it shows fully below the banner */}
                                            <img 
                                                src={pageData.avatar} 
                                                alt="avatar" 
                                                style={{ width: `${avatarSize}px`, height: `${avatarSize}px` }}
                                                className="absolute -bottom-6 left-6 rounded-full object-cover border-2 border-white shadow-md z-10"
                                            />
                                        </div>
                                    ) : (
                                        <img 
                                            src={pageData.avatar} 
                                            alt="avatar" 
                                            style={{ width: `${avatarSize}px`, height: `${avatarSize}px` }}
                                            className="rounded-full object-cover shadow-md border-2 border-zinc-800 mt-3"
                                        />
                                    )}
                                    
                                    {/* Profile Name Header */}
                                    <h6 
                                        style={{ 
                                            color: titleFontColor,
                                            fontSize: `${titleFontSize}px`,
                                            fontFamily: altTitleFont ? 'serif' : 'inherit'
                                        }}
                                        className="font-bold text-center mt-3"
                                    >
                                        @{pageData.title}
                                    </h6>
                                    
                                    {/* Bio Text */}
                                    <p 
                                        style={{ 
                                            color: pageTextColor,
                                            fontSize: `${bioFontSize}px`
                                        }}
                                        className="text-center max-w-[220px] mt-2 leading-relaxed opacity-80"
                                    >
                                        {pageData.bio}
                                    </p>

                                    {/* Platform Links / Social Handles */}
                                    <div className="flex items-center justify-center gap-3.5 mt-4">
                                        {pageData.socialLinks.filter(s => s.isActive && s.url).map(soc => {
                                            const SocIcon = (socialIconsMap as any)[soc.platform] || Icons.Link
                                            return (
                                                <a 
                                                    key={soc.platform} 
                                                    href={soc.url} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    style={{ color: titleFontColor }}
                                                    className="hover:scale-110 transition-transform opacity-80"
                                                >
                                                    <SocIcon size={16} />
                                                </a>
                                            )
                                        })}
                                    </div>

                                    {/* Section Pills Navigation */}
                                    <div className="w-full flex gap-1.5 overflow-x-auto scrollbar-none py-2 border-y border-white/10 mt-4 flex-shrink-0 select-none">
                                        {pageData.sections.map(sec => (
                                            <button
                                                key={sec.id}
                                                onClick={() => {
                                                    const element = document.getElementById(`preview-sec-${sec.id}`)
                                                    if (element) {
                                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                                    }
                                                }}
                                                className="text-[9px] font-black uppercase bg-white/10 hover:bg-white/20 text-white rounded-full px-2.5 py-0.5 whitespace-nowrap transition-colors"
                                            >
                                                {sec.title}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Render dynamic links modules */}
                                    <div className="w-full flex flex-col gap-5 mt-4">
                                        {pageData.sections.map(section => {
                                            const activeItems = section.items.filter(item => item.isActive)
                                            if (activeItems.length === 0) return null

                                            const renderItems = () => {
                                                if (section.layout === 'horizontal') {
                                                    return (
                                                        <HorizontalSlider>
                                                            {activeItems.map(link => renderSingleLink(link, true, section.layout || 'list'))}
                                                        </HorizontalSlider>
                                                    )
                                                }

                                                if (section.layout === 'pills') {
                                                    return (
                                                        <div className="flex flex-wrap gap-1.5 justify-center w-full">
                                                            {activeItems.map(link => renderSingleLink(link, false, 'pills'))}
                                                        </div>
                                                    )
                                                }

                                                if (section.layout === 'featured') {
                                                    const firstItem = activeItems[0]
                                                    const otherItems = activeItems.slice(1)
                                                    return (
                                                        <div className="flex flex-col gap-2 w-full">
                                                            {firstItem && renderSingleLink(firstItem, false, 'featured-hero')}
                                                            {otherItems.length > 0 && (
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    {otherItems.map(link => renderSingleLink(link, false, 'grid'))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                }

                                                const listClass = section.layout === 'grid3'
                                                    ? "grid grid-cols-3 gap-1.5"
                                                    : section.layout === 'grid'
                                                        ? "grid grid-cols-2 gap-2"
                                                        : "flex flex-col gap-2.5";

                                                return (
                                                    <div className={listClass}>
                                                        {activeItems.map(link => renderSingleLink(link, false, section.layout || 'list'))}
                                                    </div>
                                                )
                                            }

                                            return (
                                                <div id={`preview-sec-${section.id}`} key={section.id} className="w-full flex flex-col gap-2 scroll-mt-2">
                                                    <span className="text-[9px] font-black tracking-wider opacity-60 uppercase text-center text-white">
                                                        {section.title}
                                                    </span>
                                                    {renderItems()}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    )

    // Helper to render individual item cards inside preview
    function renderSingleLink(link: any, isHorizontal: boolean, layout: string) {
        // WhatsApp Automation
        if (link.type === 'whatsapp_automation') {
            if (isHorizontal) {
                return (
                    <a
                        key={link.id}
                        href={link.url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="w-24 flex-shrink-0 block"
                    >
                        <div className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white p-2 flex flex-col items-center justify-center text-center gap-1.5 shadow-sm border border-emerald-500/20 active:scale-95 transition-all">
                            <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                                <Icons.MessageSquare size={12} fill="white" />
                            </div>
                            <span className="text-[8px] font-black truncate w-full">{link.title || 'WhatsApp'}</span>
                        </div>
                    </a>
                )
            }
            if (layout === 'grid3') {
                return (
                    <a
                        key={link.id}
                        href={link.url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full block"
                    >
                        <div className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 flex flex-col items-center justify-center text-center gap-1 shadow-sm border border-emerald-500/20 active:scale-95 transition-all">
                            <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                                <Icons.MessageSquare size={10} fill="white" />
                            </div>
                            <span className="text-[7.5px] font-black truncate w-full">{link.title || 'WhatsApp'}</span>
                        </div>
                    </a>
                )
            }
            return (
                <a
                    key={link.id}
                    href={link.url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full block"
                >
                    <div
                        className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white p-2.5 flex items-center justify-between gap-3 shadow-md transition-all duration-300 border border-emerald-500/30 group"
                        style={{ backgroundColor: '#059669' }}
                    >
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="relative flex items-center justify-center h-6 w-6 rounded-full bg-white/25 text-white flex-shrink-0 animate-pulse">
                                <Icons.MessageSquare size={13} fill="white" className="absolute" />
                            </div>
                            <div className="text-left min-w-0">
                                <span className="text-[8px] font-black tracking-wide text-emerald-100 uppercase block leading-none">WhatsApp Automation</span>
                                <span className="text-[10px] font-black truncate block mt-0.5">{link.title || 'Chat with Us'}</span>
                            </div>
                        </div>
                        <Icons.ChevronRight size={10} className="text-emerald-250 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                </a>
            )
        }

        // Embed player
        if (link.type === 'embed' && link.embedUrl) {
            return (
                <div key={link.id} className="w-full rounded-xl overflow-hidden shadow-sm border border-white/5 flex-shrink-0">
                    <iframe 
                        src={link.embedUrl} 
                        className="w-full h-[80px]" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    />
                </div>
            )
        }

        // Email collect subscriber form
        if (link.type === 'email_collect') {
            return (
                <Card 
                    key={link.id} 
                    className="w-full border-none bg-zinc-900/65 rounded-xl flex-shrink-0"
                    bodyClass="p-3"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-extrabold text-white text-left block leading-tight">{link.title}</span>
                        <div className="flex gap-1">
                            <input 
                                type="email" 
                                placeholder={link.config?.placeholder || "Email"} 
                                value={emailVal}
                                onChange={e => setEmailVal(e.target.value)}
                                className="h-6 flex-1 text-[8px] bg-white/5 border border-white/10 rounded px-1.5 text-white outline-none focus:border-white/30"
                            />
                            <button 
                                onClick={() => {
                                    if (emailVal) {
                                        setEmailSuccess(true)
                                        setEmailVal('')
                                        setTimeout(() => setEmailSuccess(false), 2500)
                                    }
                                }}
                                className="h-6 px-2 bg-white text-black text-[8px] font-black rounded"
                            >
                                {link.config?.buttonText || "Join"}
                            </button>
                        </div>
                        {emailSuccess && (
                            <span className="text-[7px] text-emerald-400 font-bold block text-left">
                                {link.config?.successMessage || "Thank you!"}
                            </span>
                        )}
                    </div>
                </Card>
            )
        }

        // Pills layout renders minimal capsule badge
        if (layout === 'pills') {
            const pillStyles = {
                backgroundColor: buttonStyle === 'solid' ? buttonColor : 'rgba(24, 24, 27, 0.45)',
                color: buttonTextColor,
                borderColor: buttonStyle === 'outline' ? buttonColor : 'transparent',
                borderRadius: '9999px',
                padding: '4px 10px',
            }
            return (
                <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    style={pillStyles}
                    className="border text-[9px] font-black transition-all hover:scale-105 inline-flex items-center gap-1 shadow-sm"
                >
                    {link.image ? (
                        <img src={link.image} className="w-3.5 h-3.5 rounded-full object-cover flex-shrink-0" />
                    ) : link.icon && (
                        <LucideIcon name={link.icon} size={10} className="flex-shrink-0" />
                    )}
                    <span className="truncate max-w-[80px]">{link.title}</span>
                </a>
            )
        }

        // Featured hero layout
        if (layout === 'featured-hero') {
            const buttonStyles = {
                backgroundColor: buttonStyle === 'solid' ? buttonColor : 'rgba(24, 24, 27, 0.65)',
                color: buttonTextColor,
                borderColor: buttonStyle === 'outline' ? buttonColor : 'transparent',
                borderRadius: `${buttonRoundness}px`,
                paddingTop: `${Math.max(buttonPadding * 1.5, 12)}px`,
                paddingBottom: `${Math.max(buttonPadding * 1.5, 12)}px`,
                marginTop: `${buttonSpacing}px`
            }
            return (
                <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full block"
                >
                    <div
                        style={buttonStyles}
                        className={`w-full border text-center text-xs font-black flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] relative overflow-hidden group shadow-md ${getMockButtonClass()}`}
                    >
                        {link.image ? (
                            <div className="w-full h-24 relative overflow-hidden rounded-t-lg -mt-3 mb-1.5">
                                <img src={link.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        ) : link.icon && (
                            <LucideIcon name={link.icon} size={18} className="flex-shrink-0 text-white" />
                        )}
                        <div className="px-3 flex items-center justify-between w-full">
                            <span className="text-left font-black tracking-wide truncate flex-1">{link.title}</span>
                            <span className="text-[8px] uppercase font-black tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">Featured</span>
                        </div>
                    </div>
                </a>
            )
        }

        // Image overlay card design
        if (link.cardStyle === 'image_overlay') {
            const isGrid3 = layout === 'grid3'
            return (
                <a 
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`relative block rounded-xl overflow-hidden shadow-sm border border-white/5 flex-shrink-0 ${
                        isHorizontal ? 'w-32' : 'w-full'
                    } ${isGrid3 ? 'h-16' : 'h-24'}`}
                >
                    <img src={link.image || 'https://images.unsplash.com/photo-1542204172-e7052809f852?auto=format&fit=crop&w=300&h=200&q=80'} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-left z-10">
                        <span className={`font-black text-white line-clamp-2 leading-tight uppercase tracking-wide ${
                            isGrid3 ? 'text-[7px]' : 'text-[8px]'
                        }`}>
                            {link.title}
                        </span>
                    </div>
                </a>
            )
        }

        // Product item design
        if (link.type === 'product') {
            if (isHorizontal) {
                return (
                    <Card 
                        key={link.id} 
                        className="w-24 flex-shrink-0 border-none bg-zinc-900/40 text-left rounded-xl"
                        bodyClass="p-1.5 flex flex-col gap-1.5 justify-between h-full"
                    >
                        <img src={link.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&h=150&q=80'} className="w-full h-16 object-cover rounded-lg" />
                        <div className="flex flex-col justify-between flex-grow">
                            <span className="text-[8px] font-black text-gray-255 line-clamp-2 leading-tight min-h-[20px]">{link.title}</span>
                            <span className="text-[9px] font-extrabold text-white mt-1">${link.price}</span>
                        </div>
                    </Card>
                )
            }
            if (layout === 'grid3') {
                return (
                    <Card
                        key={link.id}
                        className="w-full border-none bg-zinc-900/60 rounded-xl overflow-hidden flex-shrink-0 text-left"
                        bodyClass="p-2 flex flex-col gap-1.5 justify-between h-full"
                    >
                        {link.image && <img src={link.image} className="w-full h-12 rounded-lg object-cover flex-shrink-0 border border-white/5" />}
                        <div className="flex-1 min-w-0">
                            <span className="text-[7.5px] font-black text-white line-clamp-2 leading-tight min-h-[20px]">{link.title}</span>
                            <span className="text-[8px] font-extrabold text-white mt-1 block">${link.price}</span>
                        </div>
                    </Card>
                )
            }
            return (
                <Card
                    key={link.id}
                    className="w-full border-none bg-zinc-900/60 rounded-xl overflow-hidden flex-shrink-0 text-left"
                    bodyClass="p-2.5 flex items-center gap-3"
                >
                    {link.image && <img src={link.image} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/5" />}
                    <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-black text-white truncate block">{link.title}</span>
                        {link.description && <span className="text-[7px] text-gray-400 truncate block mt-0.5">{link.description}</span>}
                        <span className="text-[8px] font-extrabold text-white mt-1 block">${link.price}</span>
                    </div>
                    <button className="h-6 px-2.5 bg-primary text-white text-[8px] font-bold rounded-lg hover:scale-105 transition-transform flex items-center justify-center">
                        Buy
                    </button>
                </Card>
            )
        }

        // Blog post layout
        if (link.type === 'blog') {
            if (isHorizontal) {
                return (
                    <Card 
                        key={link.id}
                        className="w-28 flex-shrink-0 border-none bg-zinc-900/40 text-left rounded-xl overflow-hidden"
                        bodyClass="p-1.5 flex flex-col gap-1.5 justify-between h-full"
                    >
                        {link.image && <img src={link.image} className="w-full h-16 object-cover rounded-lg" />}
                        <div className="flex flex-col justify-between flex-grow">
                            <span className="text-[8px] font-black text-white line-clamp-2 leading-tight min-h-[20px]">{link.title}</span>
                            <span className="text-[6px] text-gray-500 mt-1 block uppercase tracking-wider font-semibold">Read article</span>
                        </div>
                    </Card>
                )
            }
            if (layout === 'grid3') {
                return (
                    <Card
                        key={link.id}
                        className="w-full border-none bg-zinc-900/60 rounded-xl overflow-hidden flex-shrink-0 text-left"
                        bodyClass="p-2 flex flex-col gap-1.5 justify-between h-full"
                    >
                        {link.image && <img src={link.image} className="w-full h-12 rounded-lg object-cover flex-shrink-0 border border-white/5" />}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <span className="text-[7.5px] font-black text-white line-clamp-2 leading-tight min-h-[20px]">{link.title}</span>
                            <span className="text-[6px] text-gray-550 mt-1 block uppercase tracking-wider font-semibold">Read</span>
                        </div>
                    </Card>
                )
            }
            return (
                <Card 
                    key={link.id}
                    className="w-full border-none bg-zinc-900/60 rounded-xl overflow-hidden flex-shrink-0 text-left"
                    bodyClass="p-2.5 flex gap-3"
                >
                    {link.image && <img src={link.image} className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-white/5" />}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                            <span className="text-[9px] font-black text-white truncate block leading-tight">{link.title}</span>
                            {link.description && <span className="text-[7px] text-gray-400 line-clamp-2 mt-0.5 leading-snug">{link.description}</span>}
                        </div>
                        <span className="text-[6px] text-gray-500 mt-1 block uppercase tracking-wider font-semibold">Read article</span>
                    </div>
                </Card>
            )
        }

        // Music/Play layout
        if (link.cardStyle === 'music') {
            if (isHorizontal) {
                return (
                    <Card
                        key={link.id}
                        className="w-24 flex-shrink-0 border-none bg-zinc-900/60 transition-all duration-300 rounded-xl text-left"
                        bodyClass="p-1.5 flex flex-col gap-1.5 justify-between h-full"
                    >
                        {link.image && <img src={link.image} className="w-full h-12 object-cover rounded-lg" />}
                        <div className="min-w-0">
                            <div className="text-[8px] font-extrabold truncate text-white leading-tight">{link.title}</div>
                        </div>
                        <button className="h-5 w-full bg-white text-black text-[7px] font-black rounded-lg shadow hover:scale-105 transition-transform flex items-center justify-center gap-0.5">
                            <Icons.Play size={6} fill="black" /> PLAY
                        </button>
                    </Card>
                )
            }
            if (layout === 'grid3') {
                return (
                    <Card
                        key={link.id}
                        className="w-full border-none bg-zinc-900/60 transition-all duration-300 rounded-xl text-left"
                        bodyClass="p-2 flex flex-col gap-1.5 justify-between h-full"
                    >
                        {link.image && <img src={link.image} className="w-full h-10 object-cover rounded-md flex-shrink-0" />}
                        <div className="min-w-0">
                            <div className="text-[7.5px] font-extrabold truncate text-white leading-tight">{link.title}</div>
                        </div>
                        <button className="h-4 w-full bg-white text-black text-[6px] font-black rounded shadow hover:scale-105 transition-transform flex items-center justify-center gap-0.5">
                            <Icons.Play size={5} fill="black" /> PLAY
                        </button>
                    </Card>
                )
            }
            return (
                <Card
                    key={link.id}
                    className="w-full border-none bg-zinc-900/60 transition-all duration-300 hover:scale-[1.01] rounded-xl text-left"
                    bodyClass="p-2 flex items-center justify-between gap-2"
                >
                    <div className="flex items-center gap-2 min-w-0">
                        {link.image && <img src={link.image} className="w-8 h-8 rounded object-cover flex-shrink-0" />}
                        <div className="min-w-0">
                            <div className="text-[9px] font-extrabold truncate text-white leading-tight">{link.title}</div>
                            <div className="text-[7px] text-gray-400 font-semibold truncate mt-0.5">Spotify & YouTube</div>
                        </div>
                    </div>
                    <button className="h-5 px-2 bg-white text-black text-[7px] font-black rounded-full shadow hover:scale-105 transition-transform flex items-center justify-center gap-0.5">
                        <Icons.Play size={6} fill="black" /> PLAY
                    </button>
                </Card>
            )
        }

        // Standard link layout
        const buttonStyles = {
            backgroundColor: buttonStyle === 'solid' ? buttonColor : 'transparent',
            color: buttonTextColor,
            borderColor: buttonStyle === 'outline' ? buttonColor : 'transparent',
            borderRadius: `${buttonRoundness}px`,
            paddingTop: `${buttonPadding}px`,
            paddingBottom: `${buttonPadding}px`,
            marginTop: `${buttonSpacing}px`
        }

        if (isHorizontal) {
            return (
                <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-24 flex-shrink-0 block"
                >
                    <div
                        style={buttonStyles}
                        className={`w-full border text-center text-[10px] font-black flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.01] ${getMockButtonClass()}`}
                    >
                        {link.image ? (
                            <img src={link.image} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                        ) : link.icon && (
                            <LucideIcon name={link.icon} size={14} className="flex-shrink-0 text-white" />
                        )}
                        <span className="truncate w-full">{link.title}</span>
                    </div>
                </a>
            )
        }

        if (layout === 'grid3') {
            return (
                <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full block"
                >
                    <div
                        style={{
                            ...buttonStyles,
                            paddingTop: `${Math.max(buttonPadding / 1.8, 6)}px`,
                            paddingBottom: `${Math.max(buttonPadding / 1.8, 6)}px`,
                        }}
                        className={`w-full border text-center text-[8.5px] font-black flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.01] ${getMockButtonClass()}`}
                    >
                        {link.image ? (
                            <img src={link.image} className="w-6 h-6 rounded object-cover flex-shrink-0" />
                        ) : link.icon && (
                            <LucideIcon name={link.icon} size={10} className="flex-shrink-0" />
                        )}
                        <span className="truncate w-full block px-1">{link.title}</span>
                    </div>
                </a>
            )
        }

        return (
            <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="w-full block"
            >
                <div
                    style={buttonStyles}
                    className={`w-full border text-center text-xs font-black flex items-center justify-between gap-2.5 transition-all duration-300 hover:scale-[1.01] ${getMockButtonClass()}`}
                >
                    <div className="flex items-center gap-2 min-w-0">
                        {link.image ? (
                            <img src={link.image} className="w-6 h-6 rounded object-cover flex-shrink-0" />
                        ) : link.icon && (
                            <LucideIcon name={link.icon} size={12} className="flex-shrink-0" />
                        )}
                        <span className="text-left truncate">{link.title}</span>
                    </div>
                    <Icons.ChevronRight size={10} className="flex-shrink-0 opacity-60" />
                </div>
            </a>
        )
    }
}

export default function MiniSiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <MiniSiteProvider>
            <MiniSiteLayoutInner>{children}</MiniSiteLayoutInner>
        </MiniSiteProvider>
    )
}
