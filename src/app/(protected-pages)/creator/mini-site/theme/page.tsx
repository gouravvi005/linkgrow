'use client'

import React from 'react'
import { useMiniSite } from '../MiniSiteContext'
import LinkInBioTabs from '@/components/shared/LinkInBioTabs'
import { Button, Input, Slider, Select } from '@/components/ui'
import Card from '@/components/ui/Card'
import * as Icons from 'lucide-react'
import { themes } from '@/mock-data/themes'

const fontOptions = [
    { value: 'Link Sans', label: 'Link Sans' },
    { value: 'Inter', label: 'Inter (Classic)' },
    { value: 'Outfit', label: 'Outfit (Modern)' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'serif', label: 'Times New Roman' }
]

// 20 customizable presets matching the screenshot
const customizableThemesList = [
    { id: 'custom', name: 'Custom', class: 'bg-zinc-100 dark:bg-zinc-800' },
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

export default function ThemePage() {
    const {
        pageData,
        setPageData,
        buttonRoundness,
        setButtonRoundness,
        buttonPadding,
        setButtonPadding,
        buttonSpacing,
        setButtonSpacing,
        buttonStyle,
        setButtonStyle,
        buttonShadow,
        setButtonShadow,
        buttonColor,
        setButtonColor,
        buttonTextColor,
        setButtonTextColor,
        pageFont,
        setPageFont,
        pageTextColor,
        setPageTextColor,
        titleFontColor,
        setTitleFontColor,
        headerLayout,
        heroBannerImage,
        setHeroBannerImage,
        heroBannerColor1,
        setHeroBannerColor1,
        heroBannerColor2,
        setHeroBannerColor2,
    } = useMiniSite()

    const handleApplyTheme = (themeId: string) => {
        setPageData(prev => ({ ...prev, themeId }))
        if (themeId === 'custom') {
            setButtonColor('#FFFFFF')
            setButtonTextColor('#000000')
        } else {
            const foundTheme = themes.find(t => t.id === themeId)
            if (foundTheme) {
                if (themeId.includes('midnight') || themeId.includes('slate') || themeId.includes('teal') || themeId.includes('green')) {
                    setPageTextColor('#FFFFFF')
                    setTitleFontColor('#FFFFFF')
                } else {
                    setPageTextColor('#000000')
                    setTitleFontColor('#000000')
                }
            }
        }
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
                        Theme & Styling Settings
                    </h2>
                </div>
            </div>

            {/* Shared Routing Tabs */}
            <LinkInBioTabs />

            {/* Content card */}
            <div className="flex flex-col gap-6">

                {/* 1. Theme presets selection */}
                <Card bodyClass="p-6 flex flex-col gap-4">
                    <h5 className="font-black text-gray-800 dark:text-gray-200">Theme Presets</h5>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                        {customizableThemesList.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => handleApplyTheme(theme.id)}
                                className={`border rounded-2xl p-2 text-left relative flex flex-col gap-2 transition-all ${pageData.themeId === theme.id
                                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                                    : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300 bg-white dark:bg-zinc-900'
                                    }`}
                            >
                                <div className={`h-12 w-full rounded-xl ${theme.class} shadow-inner flex items-center justify-center`} />
                                <span className="text-[10px] font-black text-gray-700 dark:text-gray-200 block truncate text-center">{theme.name}</span>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Hero Banner Colors — only shown when hero layout is active */}
                {headerLayout === 'hero' && (
                    <Card bodyClass="p-6 flex flex-col gap-5">
                        <div className="flex items-center gap-2">
                            <Icons.Image size={16} className="text-primary" />
                            <h5 className="font-black text-gray-800 dark:text-gray-200">Hero Banner Colors</h5>
                        </div>

                        {/* Live mini preview of banner */}
                        <div
                            className="w-full h-16 rounded-2xl overflow-hidden shadow-inner flex-shrink-0 border border-gray-100 dark:border-zinc-800"
                            style={{
                                background: heroBannerImage
                                    ? `url(${heroBannerImage}) center/cover no-repeat`
                                    : `linear-gradient(135deg, ${heroBannerColor1}, ${heroBannerColor2})`
                            }}
                        />

                        {heroBannerImage ? (
                            <div className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800/50 rounded-xl px-4 py-2.5">
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">Using uploaded banner image</span>
                                <button
                                    type="button"
                                    onClick={() => setHeroBannerImage('')}
                                    className="text-[10px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-wider flex items-center gap-1"
                                >
                                    <Icons.X size={10} /> Remove
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gradient Start</label>
                                    <div className="flex gap-2 mt-0.5">
                                        <input
                                            type="color"
                                            value={heroBannerColor1}
                                            onChange={e => setHeroBannerColor1(e.target.value)}
                                            className="h-9 w-9 rounded-xl cursor-pointer border border-gray-200 flex-shrink-0"
                                        />
                                        <input
                                            type="text"
                                            value={heroBannerColor1}
                                            onChange={e => setHeroBannerColor1(e.target.value)}
                                            className="flex-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-3 text-xs font-mono uppercase outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gradient End</label>
                                    <div className="flex gap-2 mt-0.5">
                                        <input
                                            type="color"
                                            value={heroBannerColor2}
                                            onChange={e => setHeroBannerColor2(e.target.value)}
                                            className="h-9 w-9 rounded-xl cursor-pointer border border-gray-200 flex-shrink-0"
                                        />
                                        <input
                                            type="text"
                                            value={heroBannerColor2}
                                            onChange={e => setHeroBannerColor2(e.target.value)}
                                            className="flex-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-3 text-xs font-mono uppercase outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick gradient presets */}
                        {!heroBannerImage && (
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quick Gradient Presets</label>
                                <div className="grid grid-cols-5 gap-2">
                                    {[
                                        { a: '#8B5CF6', b: '#6366F1', label: 'Violet' },
                                        { a: '#EC4899', b: '#F43F5E', label: 'Rose' },
                                        { a: '#0EA5E9', b: '#6366F1', label: 'Ocean' },
                                        { a: '#10B981', b: '#0EA5E9', label: 'Teal' },
                                        { a: '#F97316', b: '#EF4444', label: 'Sunset' },
                                        { a: '#1E293B', b: '#334155', label: 'Slate' },
                                        { a: '#7C3AED', b: '#DB2777', label: 'Neon' },
                                        { a: '#F59E0B', b: '#EF4444', label: 'Fire' },
                                        { a: '#064E3B', b: '#065F46', label: 'Forest' },
                                        { a: '#111827', b: '#374151', label: 'Dark' },
                                    ].map(preset => (
                                        <button
                                            key={preset.label}
                                            type="button"
                                            title={preset.label}
                                            onClick={() => { setHeroBannerColor1(preset.a); setHeroBannerColor2(preset.b) }}
                                            className={`h-10 w-full rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${
                                                heroBannerColor1 === preset.a && heroBannerColor2 === preset.b
                                                    ? 'border-primary shadow-md'
                                                    : 'border-transparent'
                                            }`}
                                            style={{ background: `linear-gradient(135deg, ${preset.a}, ${preset.b})` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>
                )}
                <Card bodyClass="p-6 flex flex-col gap-5">
                    <h5 className="font-black text-gray-800 dark:text-gray-200">Typography Settings</h5>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Page Font Family</label>
                        <div className="mt-1.5">
                            <Select
                                value={fontOptions.find(opt => opt.value === pageFont)}
                                onChange={option => { if (option) setPageFont(option.value) }}
                                options={fontOptions}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Page Text Color</label>
                        <div className="flex gap-3 mt-1">
                            <input
                                type="color"
                                value={pageTextColor}
                                onChange={e => setPageTextColor(e.target.value)}
                                className="h-9 w-9 rounded-xl cursor-pointer border border-gray-200"
                            />
                            <Input value={pageTextColor} onChange={e => setPageTextColor(e.target.value)} className="font-mono text-xs uppercase" />
                        </div>
                    </div>
                </Card>

                {/* 3. Button Customizations */}
                <Card bodyClass="p-6 flex flex-col gap-5">
                    <h5 className="font-black text-gray-800 dark:text-gray-200">Button Customizations</h5>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Button Style</label>
                        <div className="grid grid-cols-3 gap-3 mt-1.5">
                            {[
                                { id: 'solid', label: 'Solid', style: 'bg-zinc-300 border-transparent' },
                                { id: 'glass', label: 'Glass', style: 'bg-zinc-105/50 border border-zinc-300 backdrop-blur' },
                                { id: 'outline', label: 'Outline', style: 'bg-transparent border-2 border-zinc-300' }
                            ].map(b => (
                                <button
                                    key={b.id}
                                    onClick={() => setButtonStyle(b.id as any)}
                                    className={`border rounded-2xl p-3 text-center flex flex-col gap-2 items-center justify-between transition-all ${buttonStyle === b.id
                                        ? 'border-primary ring-2 ring-primary/20 bg-primary/5 text-primary font-bold'
                                        : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300'
                                        }`}
                                >
                                    <div className={`h-8 w-16 rounded-md ${b.style}`} />
                                    <span className="text-[10px] uppercase font-bold">{b.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Corner Roundness slider */}
                    <div className="flex flex-col gap-2.5 mt-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Button Corner Roundness</label>
                            <span className="text-xs font-extrabold text-primary font-mono">{buttonRoundness}px</span>
                        </div>
                        <div className="px-1 mt-1">
                            <Slider
                                min={0}
                                max={24}
                                value={buttonRoundness}
                                onChange={(val) => setButtonRoundness(val as number)}
                            />
                        </div>
                    </div>

                    {/* Button Vertical Padding slider */}
                    <div className="flex flex-col gap-2.5 mt-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Button Vertical Padding</label>
                            <span className="text-xs font-extrabold text-primary font-mono">{buttonPadding}px</span>
                        </div>
                        <div className="px-1 mt-1">
                            <Slider
                                min={6}
                                max={20}
                                value={buttonPadding}
                                onChange={(val) => setButtonPadding(val as number)}
                            />
                        </div>
                    </div>

                    {/* Button Spacing slider */}
                    <div className="flex flex-col gap-2.5 mt-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Button Margins Spacing</label>
                            <span className="text-xs font-extrabold text-primary font-mono">{buttonSpacing}px</span>
                        </div>
                        <div className="px-1 mt-1">
                            <Slider
                                min={6}
                                max={20}
                                value={buttonSpacing}
                                onChange={(val) => setButtonSpacing(val as number)}
                            />
                        </div>
                    </div>

                    {/* Shadow options */}
                    <div className="flex flex-col gap-2 mt-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Button Shadow Blur</label>
                        <div className="grid grid-cols-4 gap-2 mt-1.5">
                            {['none', 'soft', 'strong', 'hard'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setButtonShadow(s as any)}
                                    className={`border py-2 px-1 text-center text-[10px] font-bold rounded-xl capitalize transition-all ${buttonShadow === s
                                        ? 'border-primary bg-primary/5 text-primary font-extrabold'
                                        : 'border-gray-200 dark:border-zinc-800 text-gray-500'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Button Colors */}
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Button color</label>
                            <div className="flex gap-2 mt-1">
                                <input
                                    type="color"
                                    value={buttonColor}
                                    onChange={e => setButtonColor(e.target.value)}
                                    className="h-8 w-8 rounded-lg cursor-pointer border border-gray-200"
                                />
                                <Input value={buttonColor} onChange={e => setButtonColor(e.target.value)} className="font-mono text-xs uppercase" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Button text color</label>
                            <div className="flex gap-2 mt-1">
                                <input
                                    type="color"
                                    value={buttonTextColor}
                                    onChange={e => setButtonTextColor(e.target.value)}
                                    className="h-8 w-8 rounded-lg cursor-pointer border border-gray-200"
                                />
                                <Input value={buttonTextColor} onChange={e => setButtonTextColor(e.target.value)} className="font-mono text-xs uppercase" />
                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    )
}
