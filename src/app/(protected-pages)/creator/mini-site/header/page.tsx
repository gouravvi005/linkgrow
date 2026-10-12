'use client'

import React from 'react'
import { useMiniSite } from '../MiniSiteContext'
import LinkInBioTabs from '@/components/shared/LinkInBioTabs'
import { Button, Input, Switcher, Slider } from '@/components/ui'
import Card from '@/components/ui/Card'
import * as Icons from 'lucide-react'

export default function HeaderPage() {
    const {
        pageData,
        setPageData,
        avatarSize,
        setAvatarSize,
        titleFontSize,
        setTitleFontSize,
        bioFontSize,
        setBioFontSize,
        altTitleFont,
        setAltTitleFont,
        titleFontColor,
        setTitleFontColor,
        headerLayout,
        setHeaderLayout,
        heroBannerImage,
        setHeroBannerImage,
        heroBannerColor1,
        setHeroBannerColor1,
        heroBannerColor2,
        setHeroBannerColor2,
        saveChangesToBackend,
    } = useMiniSite()

    const handleProfileTitleChange = (val: string) => {
        setPageData(prev => ({
            ...prev,
            title: val
        }))
    }

    const handleBioChange = (val: string) => {
        setPageData(prev => ({
            ...prev,
            bio: val
        }))
    }

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (uploadEvent) => {
                if (uploadEvent.target?.result) {
                    setPageData(prev => ({
                        ...prev,
                        avatar: uploadEvent.target!.result as string
                    }))
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleHeroBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (uploadEvent) => {
                if (uploadEvent.target?.result) {
                    setHeroBannerImage(uploadEvent.target!.result as string)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
            {/* Page Title Header */}
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">
                        Mini Site Editor
                    </span>
                    <h2 className="font-bold text-gray-900 dark:text-gray-150 mt-1">
                        Profile Header Settings
                    </h2>
                </div>
                <Button
                    onClick={async () => {
                        try {
                            await saveChangesToBackend();
                            alert('Header settings saved to backend successfully!');
                        } catch (err) {
                            console.error('Failed to save header settings:', err);
                        }
                    }}
                    className="flex items-center gap-1 text-xs font-bold cursor-pointer"
                >
                    <Icons.Save size={14} /> Save Changes
                </Button>
            </div>

            {/* Shared Navigation Tabs */}
            <LinkInBioTabs />

            {/* Main Settings Card */}
            <Card bodyClass="p-6 flex flex-col gap-6">
                {/* Header Layout Type Selector */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Header Layout Style</label>
                    <div className="flex gap-4 mt-1">
                        <button
                            type="button"
                            onClick={() => setHeaderLayout('classic')}
                            className={`flex-1 border p-4 rounded-2xl text-left transition-all ${headerLayout === 'classic'
                                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300'
                                }`}
                        >
                            <span className="text-xs font-black block text-gray-800 dark:text-gray-200">Classic layout</span>
                            <span className="text-[10px] text-gray-400 mt-1 block">Simple circular avatar at top center</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setHeaderLayout('hero')}
                            className={`flex-1 border p-4 rounded-2xl text-left transition-all ${headerLayout === 'hero'
                                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300'
                                }`}
                        >
                            <span className="text-xs font-black block text-gray-800 dark:text-gray-200">Hero cover banner</span>
                            <span className="text-[10px] text-gray-400 mt-1 block">Large modern banner backdrop overlay</span>
                        </button>
                    </div>
                </div>

                {/* ── Hero Banner Options (only when hero layout selected) ── */}
                {headerLayout === 'hero' && (
                    <>
                        <hr className="border-gray-100 dark:border-zinc-800" />
                        <div className="flex flex-col gap-4">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Icons.ImageIcon size={12} />
                                Hero Banner Image
                            </label>

                            {/* Preview + upload zone */}
                            <div className="relative w-full h-28 rounded-2xl overflow-hidden border border-dashed border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/40 group cursor-pointer">
                                {/* Gradient or image background */}
                                {heroBannerImage ? (
                                    <img
                                        src={heroBannerImage}
                                        alt="Hero banner"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full"
                                        style={{ background: `linear-gradient(135deg, ${heroBannerColor1}, ${heroBannerColor2})` }}
                                    />
                                )}

                                {/* Upload overlay */}
                                <label className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Icons.UploadCloud size={20} className="text-white" />
                                    <span className="text-white text-[10px] font-black uppercase tracking-wider">Upload Banner</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleHeroBannerUpload}
                                    />
                                </label>
                            </div>

                            {/* Remove banner image */}
                            {heroBannerImage && (
                                <button
                                    type="button"
                                    onClick={() => setHeroBannerImage('')}
                                    className="self-start text-[10px] font-black uppercase tracking-wider text-rose-500 hover:text-rose-600 flex items-center gap-1"
                                >
                                    <Icons.X size={11} /> Remove image — use gradient colors
                                </button>
                            )}

                            {/* Gradient color pickers (shown when no image, or always for reference) */}
                            {!heroBannerImage && (
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
                        </div>
                    </>
                )}

                {/* Profile Avatar Upload block */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Profile Image</label>
                    <div className="flex items-center gap-6 mt-2 border border-dashed border-gray-200 dark:border-zinc-800 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-950/20">
                        <img
                            src={pageData.avatar}
                            alt="avatar"
                            className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-md bg-white dark:bg-zinc-900"
                        />
                        <div className="flex flex-col gap-2">
                            <label className="cursor-pointer bg-zinc-950 hover:bg-zinc-900 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-white font-bold py-2 px-5 rounded-full text-xs transition-colors flex items-center justify-center gap-1.5 self-start">
                                <Icons.UploadCloud size={14} /> Upload Custom Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarUpload}
                                />
                            </label>
                            <span className="text-[10px] text-gray-400">Supported formats: JPG, PNG, GIF. Max file size: 2MB.</span>
                        </div>
                    </div>
                </div>

                {/* Avatar size range slider */}
                <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Avatar Image Size</label>
                        <span className="text-xs font-extrabold text-primary font-mono">{avatarSize}px</span>
                    </div>
                    <div className="px-1 mt-1">
                        <Slider
                            min={48}
                            max={96}
                            value={avatarSize}
                            onChange={(val) => setAvatarSize(val as number)}
                        />
                    </div>
                </div>

                <hr className="border-gray-100 dark:border-zinc-800" />

                {/* Name and titles */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Profile Title Name</label>
                        <Input
                            value={pageData.title}
                            onChange={e => handleProfileTitleChange(e.target.value)}
                            placeholder="gouravvishwacarma"
                            className="mt-1"
                        />
                    </div>

                    {/* Title Font Size slider */}
                    <div className="flex flex-col gap-2.5 mt-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Title Font Size</label>
                            <span className="text-xs font-extrabold text-primary font-mono">{titleFontSize}px</span>
                        </div>
                        <div className="px-1 mt-1">
                            <Slider
                                min={12}
                                max={28}
                                value={titleFontSize}
                                onChange={(val) => setTitleFontSize(val as number)}
                            />
                        </div>
                    </div>

                    {/* Biography input */}
                    <div className="flex flex-col gap-1 mt-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Bio Biography</label>
                        <textarea
                            value={pageData.bio}
                            onChange={e => handleBioChange(e.target.value)}
                            placeholder="Add brief details about what you do, who you are..."
                            rows={3}
                            className="w-full mt-1 bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-xl p-3 text-xs outline-none font-bold text-gray-700 dark:text-gray-200 min-h-[70px] focus:border-primary transition-colors"
                        />
                    </div>

                    {/* Bio Font Size slider */}
                    <div className="flex flex-col gap-2.5 mt-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Bio Font Size</label>
                            <span className="text-xs font-extrabold text-primary font-mono">{bioFontSize}px</span>
                        </div>
                        <div className="px-1 mt-1">
                            <Slider
                                min={10}
                                max={18}
                                value={bioFontSize}
                                onChange={(val) => setBioFontSize(val as number)}
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-100 dark:border-zinc-800" />

                {/* Typography and customization options */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center py-1">
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Alternative serif header font</span>
                        <Switcher
                            checked={altTitleFont}
                            onChange={() => setAltTitleFont(!altTitleFont)}
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Title Font Color</label>
                        <div className="flex gap-3 mt-1">
                            <input
                                type="color"
                                value={titleFontColor}
                                onChange={e => setTitleFontColor(e.target.value)}
                                className="h-9 w-9 rounded-xl cursor-pointer border border-gray-200"
                            />
                            <Input
                                value={titleFontColor}
                                onChange={e => setTitleFontColor(e.target.value)}
                                className="font-mono text-xs uppercase"
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
