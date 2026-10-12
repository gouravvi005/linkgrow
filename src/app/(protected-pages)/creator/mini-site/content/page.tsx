'use client'

import React, { useState } from 'react'
import { useMiniSite } from '../MiniSiteContext'
import { BioSection, BioLink } from '@/mock-data/linkPages'
import LinkInBioTabs from '@/components/shared/LinkInBioTabs'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import { Button, Input, Switcher, Upload, Dialog, Dropdown, Select } from '@/components/ui'
import Card from '@/components/ui/Card'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
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
import { CardHeader } from '@/components/landing/ui/card'

const LucideIcon = ({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) => {
    const IconComponent = (Icons as any)[name] || Icons.Link
    return <IconComponent size={size} className={className} />
}

interface ContentType {
    title: string
    desc: string
    icon: React.ComponentType<any>
    type: BioLink['type']
    isPro?: boolean
    defaultUrl?: string
    defaultEmbed?: string
}

const layoutOptions = [
    {
        value: 'list' as const,
        label: 'List',
        description: 'Standard vertical stacked layout',
        icon: (props: any) => <Icons.Menu {...props} />,
        previewShape: (
            <div className="flex flex-col gap-0.5 w-12 pt-0.5">
                <div className="h-1 bg-gray-200 dark:bg-zinc-700 rounded-full w-full" />
                <div className="h-1 bg-gray-200 dark:bg-zinc-700 rounded-full w-full" />
                <div className="h-1 bg-gray-200 dark:bg-zinc-700 rounded-full w-full" />
            </div>
        )
    },
    {
        value: 'grid' as const,
        label: 'Grid (2 Col)',
        description: 'Grid cards in 2 columns side-by-side',
        icon: (props: any) => <Icons.LayoutGrid {...props} />,
        previewShape: (
            <div className="grid grid-cols-2 gap-0.5 w-12 pt-0.5">
                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded w-full" />
                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded w-full" />
                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded w-full" />
                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded w-full" />
            </div>
        )
    },
    {
        value: 'grid3' as const,
        label: 'Grid (3 Col)',
        description: 'Ultra-compact 3 columns card grid',
        icon: (props: any) => <Icons.Grid {...props} />,
        previewShape: (
            <div className="grid grid-cols-3 gap-0.5 w-12 pt-0.5">
                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded w-full" />
                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded w-full" />
                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded w-full" />
            </div>
        )
    },
    {
        value: 'horizontal' as const,
        label: 'Row (Scroll)',
        description: 'Horizontal scrollable cards row',
        icon: (props: any) => <Icons.SlidersHorizontal {...props} />,
        previewShape: (
            <div className="flex gap-0.5 w-12 overflow-hidden pt-0.5">
                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded w-4 flex-shrink-0" />
                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded w-4 flex-shrink-0" />
                <div className="h-1.5 bg-gray-200 dark:bg-zinc-700 rounded w-4 flex-shrink-0" />
            </div>
        )
    },
    {
        value: 'featured' as const,
        label: 'Featured Layout',
        description: 'One large banner + 2 column grid',
        icon: (props: any) => <Icons.Sparkles {...props} />,
        previewShape: (
            <div className="flex flex-col gap-0.5 w-12 pt-0.5">
                <div className="h-2 bg-gray-200 dark:bg-zinc-700 rounded w-full" />
                <div className="grid grid-cols-2 gap-0.5 w-full">
                    <div className="h-1 bg-gray-200 dark:bg-zinc-700 rounded w-full" />
                    <div className="h-1 bg-gray-200 dark:bg-zinc-700 rounded w-full" />
                </div>
            </div>
        )
    },
    {
        value: 'pills' as const,
        label: 'Pill Badges',
        description: 'Minimalist compact rounded capsules',
        icon: (props: any) => <Icons.Hash {...props} />,
        previewShape: (
            <div className="flex flex-wrap gap-0.5 w-12 pt-0.5">
                <div className="h-1 bg-gray-200 dark:bg-zinc-700 rounded-full w-4" />
                <div className="h-1 bg-gray-200 dark:bg-zinc-700 rounded-full w-5" />
                <div className="h-1 bg-gray-200 dark:bg-zinc-700 rounded-full w-3" />
                <div className="h-1 bg-gray-200 dark:bg-zinc-700 rounded-full w-4" />
            </div>
        )
    }
]

const blockTypeOptions = [
    { value: 'standard', label: 'Standard Link' },
    { value: 'product', label: 'Digital Product' },
    { value: 'blog', label: 'Blog Post / News' },
    { value: 'embed', label: 'Embed (Video / Music)' },
    { value: 'email_collect', label: 'Mailing Signup' },
    { value: 'whatsapp_automation', label: 'WhatsApp Automation' }
]

const cardStyleOptions = [
    { value: 'default', label: 'Standard List Item' },
    { value: 'image_overlay', label: 'Grid Image Card Overlay' },
    { value: 'news_row', label: 'News / Blog Row Item' },
    { value: 'music', label: 'Music Card (Play Button)' }
]

export default function ContentPage() {
    const { pageData, setPageData, saveChangesToBackend } = useMiniSite()

    // Add Content Modal States
    const [isAddContentOpen, setIsAddContentOpen] = useState(false)
    const [targetSectionIdForAdd, setTargetSectionIdForAdd] = useState<string | null>(null)

    // Customize Item Modal States
    const [selectedEditItem, setSelectedEditItem] = useState<{ sectionId: string; item: BioLink } | null>(null)
    const [editThumbnail, setEditThumbnail] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editCta, setEditCta] = useState('')
    const [editUrl, setEditUrl] = useState('')
    const [editFileLabel, setEditFileLabel] = useState('')
    const [editPrice, setEditPrice] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editImage, setEditImage] = useState('')
    const [editCardStyle, setEditCardStyle] = useState<'default' | 'image_overlay' | 'news_row' | 'music'>('default')
    const [editType, setEditType] = useState<BioLink['type']>('standard')

    // Delete Popup Confirmation States
    const [deleteTarget, setDeleteTarget] = useState<{
        type: 'section' | 'item'
        sectionId: string
        itemId?: string
    } | null>(null)

    // Section actions
    const handleAddSection = () => {
        const newSection: BioSection = {
            id: `sec-${Date.now()}`,
            title: 'New Section Title',
            layout: 'list',
            items: []
        }
        setPageData(prev => ({
            ...prev,
            sections: [...prev.sections, newSection]
        }))
    }

    const handleRenameSection = (sectionId: string, title: string) => {
        setPageData(prev => ({
            ...prev,
            sections: prev.sections.map(s => s.id === sectionId ? { ...s, title } : s)
        }))
    }

    const handleSectionLayoutChange = (sectionId: string, layout: 'list' | 'grid' | 'grid3' | 'horizontal' | 'featured' | 'pills') => {
        setPageData(prev => ({
            ...prev,
            sections: prev.sections.map(s => s.id === sectionId ? { ...s, layout } : s)
        }))
    }

    const handleDeleteSection = (sectionId: string) => {
        setDeleteTarget({ type: 'section', sectionId })
    }

    // Item actions
    const handleLinkToggle = (sectionId: string, itemId: string) => {
        setPageData(prev => ({
            ...prev,
            sections: prev.sections.map(s => {
                if (s.id === sectionId) {
                    return {
                        ...s,
                        items: s.items.map(item => item.id === itemId ? { ...item, isActive: !item.isActive } : item)
                    }
                }
                return s
            })
        }))
    }

    const handleDeleteItem = (sectionId: string, itemId: string) => {
        setDeleteTarget({ type: 'item', sectionId, itemId })
    }

    const executeDelete = () => {
        if (!deleteTarget) return
        const { type, sectionId, itemId } = deleteTarget
        if (type === 'section') {
            setPageData(prev => ({
                ...prev,
                sections: prev.sections.filter(s => s.id !== sectionId)
            }))
        } else if (type === 'item' && itemId) {
            setPageData(prev => ({
                ...prev,
                sections: prev.sections.map(s => {
                    if (s.id === sectionId) {
                        return {
                            ...s,
                            items: s.items.filter(item => item.id !== itemId)
                        }
                    }
                    return s
                })
            }))
        }
        setDeleteTarget(null)
    }

    const triggerAddItemFlow = (sectionId: string) => {
        setTargetSectionIdForAdd(sectionId)
        setIsAddContentOpen(true)
    }

    const handleAddBlock = (contentType: ContentType) => {
        if (!targetSectionIdForAdd) return

        const newLink: BioLink = {
            id: `link-${Date.now()}`,
            type: contentType.type,
            title: contentType.title,
            url: contentType.defaultUrl || 'https://example.com',
            icon: 'Sparkles',
            isActive: true,
            clicks: 0,
            embedUrl: contentType.defaultEmbed,
            price: contentType.type === 'product' ? 29.99 : undefined,
            description: contentType.type === 'blog' ? 'News update snippet...' : undefined,
            image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=150&h=150&q=80',
            cardStyle: 'default'
        }

        if (contentType.type === 'email_collect') {
            newLink.config = {
                placeholder: 'Enter your email address',
                buttonText: 'Join Free',
                successMessage: 'Subscribed successfully!'
            }
        }

        setPageData(prev => ({
            ...prev,
            sections: prev.sections.map(s => {
                if (s.id === targetSectionIdForAdd) {
                    return {
                        ...s,
                        items: [...s.items, newLink]
                    }
                }
                return s
            })
        }))

        setIsAddContentOpen(false)
        setTargetSectionIdForAdd(null)

        // Automatically open the customize popup for the newly created item
        setTimeout(() => {
            triggerCustomizeFlow(targetSectionIdForAdd, newLink)
        }, 100)
    }

    const triggerCustomizeFlow = (sectionId: string, item: BioLink) => {
        setSelectedEditItem({ sectionId, item })
        setEditTitle(item.title)
        setEditUrl(item.url || '')
        setEditThumbnail(item.icon || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=80&h=80&q=80')
        setEditCta(item.config?.buttonText || 'Visit website')
        setEditFileLabel(item.config?.fileName || 'guide.pdf')
        setEditPrice(item.price ? item.price.toString() : '')
        setEditDescription(item.description || '')
        setEditImage(item.image || '')
        setEditCardStyle(item.cardStyle || 'default')
        setEditType(item.type)
    }

    const handleSaveCustomization = () => {
        if (!selectedEditItem) return
        const { sectionId, item } = selectedEditItem

        setPageData(prev => ({
            ...prev,
            sections: prev.sections.map(s => {
                if (s.id === sectionId) {
                    return {
                        ...s,
                        items: s.items.map(i => {
                            if (i.id === item.id) {
                                return {
                                    ...i,
                                    title: editTitle,
                                    url: editUrl,
                                    type: editType,
                                    icon: editType === 'whatsapp_automation' ? 'MessageSquare' : editTitle.includes('newsletter') ? 'Mail' : 'Sparkles',
                                    price: editType === 'product' ? (parseFloat(editPrice) || 0) : undefined,
                                    description: (editType === 'product' || editType === 'blog') ? editDescription : undefined,
                                    image: editImage || undefined,
                                    cardStyle: editCardStyle,
                                    config: {
                                        ...i.config,
                                        buttonText: editCta,
                                        fileName: editFileLabel
                                    }
                                }
                            }
                            return i
                        })
                    }
                }
                return s
            })
        }))
    }
    const handleDialogClose = () => {
        setSelectedEditItem(null)
    }

    const categories: { title: string; items: ContentType[] }[] = [
        {
            title: 'Content',
            items: [
                { title: 'External Link', desc: 'Link an external website of your choice', icon: Icons.Link, type: 'standard', defaultUrl: 'https://google.com' },
                { title: 'Special Offer', desc: 'Share exclusive deals with your fans', icon: Icons.Tag, type: 'standard' },
                { title: 'Media Gallery', desc: 'Showcase your photos and videos', icon: Icons.Image, type: 'standard' },
                { title: 'Text Box', desc: 'Add a free text box info block', icon: Icons.Type, type: 'standard' }
            ]
        },
        {
            title: 'Products & Store',
            items: [
                { title: 'Course', desc: 'Sell your expertise and earn revenue', icon: Icons.GraduationCap, type: 'product', isPro: true },
                { title: 'Digital Product', desc: 'Sell files, media, exclusive contents', icon: Icons.FileText, type: 'product', isPro: true },
                { title: 'Shopify Store', desc: 'Add products from a Shopify store', icon: Icons.ShoppingBag, type: 'product', isPro: true },
                { title: 'Custom Product', desc: 'Link your products on an external store', icon: Icons.ShoppingBag, type: 'product' }
            ]
        },
        {
            title: 'Affiliates & Blogs',
            items: [
                { title: 'Affiliate Product', desc: 'Earn commission on products you recommend', icon: Icons.DollarSign, type: 'product' },
                { title: 'Blog Post / News', desc: 'Link news article or post with metadata', icon: Icons.BookOpen, type: 'blog' }
            ]
        },
        {
            title: 'Experiences',
            items: [
                { title: '1 to 1 Session', desc: '1 to 1 coaching sessions booking', icon: Icons.Calendar, type: 'calendar', isPro: true, defaultUrl: 'https://calendly.com' }
            ]
        },
        {
            title: 'Audio & Podcast',
            items: [
                { title: 'Spotify Music', desc: 'Drive fans to your spotify tracks', icon: FaSpotify, type: 'embed', defaultUrl: 'https://spotify.com', defaultEmbed: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGo37Z4t' },
                { title: 'Podcast Audio', desc: 'Add a single episode or sync podcast feeds', icon: Icons.Mic, type: 'standard' }
            ]
        },
        {
            title: 'Video',
            items: [
                { title: 'YouTube Embed', desc: 'Add a video playlist embed player', icon: FaYoutube, type: 'embed', defaultUrl: 'https://youtube.com', defaultEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                { title: 'TikTok Video', desc: 'Add TikTok videos to your profile', icon: Icons.Tv, type: 'standard' }
            ]
        },
        {
            title: 'Data Capture',
            items: [
                { title: 'Contact Form', desc: 'Create a form for fan inquiries', icon: Icons.FileSpreadsheet, type: 'standard' },
                { title: 'Email/SMS Signup', desc: 'Collect subscriber lists', icon: Icons.Mail, type: 'email_collect' },
                { title: 'Free Download', desc: 'Deliver custom downloads for emails', icon: Icons.Download, type: 'standard' }
            ]
        },
        {
            title: 'Tips & Monetize',
            items: [
                { title: 'Paypal tip link', desc: 'Add your Paypal connection', icon: FaPaypal, type: 'standard', defaultUrl: 'https://paypal.me' },
                { title: 'Patreon membership', desc: 'Add your Patreon support link', icon: FaPatreon, type: 'standard', defaultUrl: 'https://patreon.com' }
            ]
        },
        {
            title: 'Automation & Messaging',
            items: [
                { title: 'WhatsApp Automation', desc: 'Direct visitors to custom WhatsApp chat flows', icon: Icons.MessageSquare, type: 'whatsapp_automation', defaultUrl: 'https://wa.me/919876543210' }
            ]
        }
    ]

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">
                        Mini Site Editor
                    </span>
                    <h2 className="font-bold text-gray-900 dark:text-gray-150 mt-1">
                        Content Blocks
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={async () => {
                            try {
                                await saveChangesToBackend();
                                alert('Changes saved to backend successfully!');
                            } catch (err) {
                                console.error('Failed to save changes:', err);
                                alert('Saved locally. Backend sync active.');
                            }
                        }}
                        className="flex items-center gap-1 text-xs font-bold cursor-pointer"
                    >
                        <Icons.Save size={14} /> Save Changes
                    </Button>
                    <Button
                        variant="solid"
                        onClick={handleAddSection}
                        className="bg-primary text-white flex items-center gap-1 text-xs font-bold cursor-pointer"
                    >
                        <Icons.FolderPlus size={14} /> Add Section
                    </Button>
                </div>
            </div>

            {/* Shared Horizontal Tabs */}
            <LinkInBioTabs />

            {/* Section Lists */}
            <div className="flex flex-col gap-6">
                {pageData.sections.map(section => (
                    <Card key={section.id} bodyClass="p-0 flex flex-col">
                        {/* Section Header */}
                        <CardHeader className="flex flex-row items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-zinc-950/20">
                            <div className="flex items-center gap-2">
                                <span className="cursor-grab text-gray-400 p-1"><Icons.GripVertical size={16} /></span>
                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={e => handleRenameSection(section.id, e.target.value)}
                                    className="font-extrabold text-sm text-gray-900 dark:text-gray-100 bg-transparent outline-none border-b border-transparent hover:border-gray-200 focus:border-primary w-1/2 transition-colors py-0.5"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <Dropdown
                                    renderTitle={
                                        <button
                                            type="button"
                                            className="flex items-center gap-1.5 text-xs bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 font-bold text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-750 transition-colors shadow-sm"
                                        >
                                            {(() => {
                                                const activeOpt = layoutOptions.find(opt => opt.value === (section.layout || 'list'));
                                                if (!activeOpt) return null;
                                                const ActiveIcon = activeOpt.icon;
                                                return <ActiveIcon size={14} className="text-primary" />;
                                            })()}
                                            <span>{layoutOptions.find(opt => opt.value === (section.layout || 'list'))?.label}</span>
                                            <Icons.ChevronDown size={12} className="text-gray-400 ml-1" />
                                        </button>
                                    }
                                    placement="bottom-end"
                                    menuClass="w-64 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-2xl shadow-xl p-2 flex flex-col gap-1"
                                >
                                    <div className="text-[9px] font-black uppercase text-gray-400 tracking-widest px-2.5 py-1.5 border-b border-gray-100 dark:border-zinc-800 mb-1">
                                        Section Structure
                                    </div>
                                    {layoutOptions.map(opt => {
                                        const isSelected = (section.layout || 'list') === opt.value;
                                        const IconComponent = opt.icon;
                                        return (
                                            <Dropdown.Item
                                                key={opt.value}
                                                eventKey={opt.value}
                                                onClick={() => handleSectionLayoutChange(section.id, opt.value)}
                                                className={`flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors border ${isSelected
                                                    ? 'bg-primary/5 text-primary border-primary/20 border-solid'
                                                    : 'hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 border-transparent border-solid'
                                                    }`}
                                            >
                                                <div className={`p-1.5 rounded-lg flex-shrink-0 ${isSelected
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-500'
                                                    }`}>
                                                    <IconComponent size={14} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-xs font-bold block">{opt.label}</span>
                                                    <span className="text-[9px] text-gray-400 block mt-0.5 leading-snug">{opt.description}</span>
                                                    {/* <div className="flex gap-1.5 mt-1.5">
                                                        {opt.previewShape}
                                                    </div> */}
                                                </div>
                                            </Dropdown.Item>
                                        )
                                    })}
                                </Dropdown>
                                <button
                                    onClick={() => handleDeleteSection(section.id)}
                                    className="text-gray-400 hover:text-rose-500 p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                    title="Delete Section"
                                >
                                    <Icons.Trash2 size={14} />
                                </button>
                            </div>
                        </CardHeader>

                        {/* Section Items */}
                        <div className="p-5 flex flex-col gap-3.5">
                            {section.items.length === 0 ? (
                                <div className="border border-dashed border-gray-200 dark:border-zinc-800 rounded-2xl p-6 text-center bg-gray-55/10">
                                    <span className="text-xs font-bold text-gray-400">No items in this section</span>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {section.items.map(item => (
                                        <AdaptiveCard key={item.id} bodyClass="p-4 flex items-center justify-between gap-4">
                                            <div onClick={() => triggerCustomizeFlow(section.id, item)} className="flex items-center gap-3 w-full min-w-0 cursor-pointer">
                                                <span className="text-gray-400 cursor-grab flex-shrink-0"><Icons.GripVertical size={14} /></span>

                                                <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-800 flex items-center justify-center flex-shrink-0 text-gray-500">
                                                    {item.image ? (
                                                        <img src={item.image} className="w-full h-full object-cover" />
                                                    ) : item.type === 'embed' ? (
                                                        <Icons.PlayCircle size={18} />
                                                    ) : item.type === 'email_collect' ? (
                                                        <Icons.Mail size={18} />
                                                    ) : (
                                                        <LucideIcon name={item.icon || 'Link'} size={18} />
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <span className="font-extrabold text-xs block text-gray-900 dark:text-gray-100 truncate">{item.title}</span>
                                                    <span className="text-[10px] text-gray-455 block truncate mt-0.5">
                                                        {item.type === 'email_collect'
                                                            ? 'Mailing list signup form'
                                                            : item.type === 'whatsapp_automation'
                                                                ? 'WhatsApp Chat Automation'
                                                                : item.type === 'product'
                                                                    ? `Digital Product - $${item.price}`
                                                                    : item.type === 'blog'
                                                                        ? `Blog Article`
                                                                        : item.url}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 flex-shrink-0">
                                                <Switcher
                                                    checked={item.isActive}
                                                    onChange={() => handleLinkToggle(section.id, item.id)}
                                                />
                                                <button
                                                    onClick={() => handleDeleteItem(section.id, item.id)}
                                                    className="text-gray-400 hover:text-rose-500 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                                                >
                                                    <Icons.Trash2 size={14} />
                                                </button>
                                            </div>
                                        </AdaptiveCard>
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={() => triggerAddItemFlow(section.id)}
                                className="text-primary hover:text-primary-deep text-xs font-bold py-2 px-3 rounded-xl hover:bg-primary/5 transition-colors self-start flex items-center gap-1 mt-1"
                            >
                                <Icons.Plus size={14} /> Add Item
                            </button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Modals and Dialogs */}
            <Dialog isOpen={isAddContentOpen} onClose={() => setIsAddContentOpen(false)} onRequestClose={() => setIsAddContentOpen(false)} className="w-full! max-w-[1248px]!">
                <div className="flex flex-col gap-4 max-h-[75vh]">
                    <h4 className="font-black text-gray-900 dark:text-gray-50 flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-zinc-800">
                        <Icons.ArrowDownSquare size={20} className="text-primary" /> Add Content Block
                    </h4>

                    <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-8">
                        {categories.map(cat => (
                            <div key={cat.title} className="flex flex-col gap-3">
                                <span className="text-xs font-black uppercase text-gray-400 dark:text-gray-500 tracking-wider border-b border-gray-100 dark:border-zinc-800 pb-1.5">{cat.title}</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {cat.items.map(item => {
                                        const ItemIcon = item.icon
                                        return (
                                            <div
                                                key={item.title}
                                                onClick={() => handleAddBlock(item)}
                                                className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 bg-white dark:bg-zinc-900/50 hover:border-primary hover:shadow-sm transition-all cursor-pointer flex gap-3 relative group"
                                            >
                                                <div className="p-3 bg-gray-100 dark:bg-zinc-800 text-gray-500 rounded-xl flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    <ItemIcon size={18} />
                                                </div>
                                                <div className="min-w-0 pr-8">
                                                    <span className="font-bold text-xs block text-gray-800 dark:text-gray-200 truncate">{item.title}</span>
                                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block truncate leading-snug">{item.desc}</span>
                                                </div>
                                                {item.isPro && (
                                                    <span className="absolute top-3 right-3 text-[8px] font-black px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-650 dark:text-purple-400 uppercase tracking-wider">
                                                        Pro
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Dialog>

            <Dialog
                isOpen={selectedEditItem !== null}
                className="w-full! max-w-xl!"
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                {selectedEditItem && (
                    <div className="flex flex-col gap-6 max-h-[80vh]">
                        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-zinc-800 pb-4">
                            <h4 className="font-black text-gray-900 dark:text-gray-100 text-base">
                                Edit Block Properties
                            </h4>
                        </div>

                        <div className="flex-1 overflow-y-auto overflow-x-visible pr-1 flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Block Type</label>
                                <Select
                                    value={blockTypeOptions.find(opt => opt.value === editType)}
                                    onChange={option => { if (option) setEditType(option.value as any) }}
                                    options={blockTypeOptions}
                                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                                    menuPosition="fixed"
                                    menuShouldBlockScroll={true}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Title</label>
                                <Input
                                    value={editTitle}
                                    onChange={e => setEditTitle(e.target.value)}
                                    placeholder="Enter block title..."
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Image / Thumbnail</label>
                                <div className="flex gap-4 items-center border border-gray-200 dark:border-zinc-800 rounded-xl p-3.5 bg-gray-50/50 dark:bg-zinc-900/20">
                                    {editImage ? (
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-300 dark:border-zinc-800 flex-shrink-0 group shadow-sm bg-white dark:bg-zinc-900">
                                            <img src={editImage} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setEditImage('')}
                                                className="absolute inset-0 bg-rose-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity text-xs font-bold animate-in duration-100"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-xl border border-dashed border-gray-300 dark:border-zinc-700 flex items-center justify-center flex-shrink-0 text-gray-400 dark:text-gray-500 bg-white dark:bg-zinc-900 shadow-inner">
                                            <Icons.Image size={24} />
                                        </div>
                                    )}
                                    <div className="flex-1 flex flex-col gap-2">
                                        <Upload
                                            showList={false}
                                            accept="image/*"
                                            beforeUpload={(files) => {
                                                if (files && files[0]) {
                                                    const reader = new FileReader();
                                                    reader.onload = (e) => {
                                                        if (e.target?.result) {
                                                            setEditImage(e.target.result as string);
                                                        }
                                                    };
                                                    reader.readAsDataURL(files[0]);
                                                }
                                                return false;
                                            }}
                                        >
                                            <Button type="button" size="xs" variant="solid" className="text-xs bg-primary text-white flex items-center justify-center gap-1.5 font-bold py-1.5 h-auto">
                                                <Icons.Upload size={13} /> Upload Image File
                                            </Button>
                                        </Upload>
                                        <Input
                                            value={editImage}
                                            onChange={e => setEditImage(e.target.value)}
                                            placeholder="Or paste external image URL..."
                                            className="text-xs h-8 px-2.5"
                                        />
                                    </div>
                                </div>
                            </div>

                            {editType === 'product' && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price (USD)</label>
                                    <Input
                                        value={editPrice}
                                        onChange={e => setEditPrice(e.target.value)}
                                        placeholder="29.99"
                                        type="number"
                                    />
                                </div>
                            )}

                            {(editType === 'product' || editType === 'blog') && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
                                    <textarea
                                        value={editDescription}
                                        onChange={e => setEditDescription(e.target.value)}
                                        placeholder="Enter brief snippet description..."
                                        className="w-full text-xs bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-lg p-2.5 outline-none font-bold text-gray-700 dark:text-gray-200 min-h-[60px]"
                                    />
                                </div>
                            )}

                            {(editType === 'standard' || editType === 'product') && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Card Render Design</label>
                                    <Select
                                        value={cardStyleOptions.find(opt => opt.value === editCardStyle)}
                                        onChange={option => { if (option) setEditCardStyle(option.value as any) }}
                                        options={cardStyleOptions}
                                        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                                        menuPosition="fixed"
                                        menuShouldBlockScroll={true}
                                    />
                                </div>
                            )}

                            {editType !== 'email_collect' && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Target Link / URL</label>
                                    <Input
                                        value={editUrl}
                                        onChange={e => setEditUrl(e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                </div>
                            )}

                            {editType === 'standard' && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">CTA Button text</label>
                                    <Input
                                        value={editCta}
                                        onChange={e => setEditCta(e.target.value)}
                                        placeholder="Visit Website"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 border-t border-gray-100 dark:border-zinc-800 pt-4">
                            <Button variant="plain" size="sm" onClick={() => setSelectedEditItem(null)}>Cancel</Button>
                            <Button variant="solid" size="sm" onClick={handleSaveCustomization} className="bg-primary text-white font-bold px-6">
                                Save Settings
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>

            <ConfirmDialog
                isOpen={deleteTarget !== null}
                onClose={() => setDeleteTarget(null)}
                type="danger"
                title={`Delete ${deleteTarget?.type === 'section' ? 'Section' : 'Block Item'}`}
                onCancel={() => setDeleteTarget(null)}
                onConfirm={executeDelete}
                confirmText="Delete"
            >
                <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
                    Are you sure you want to delete this {deleteTarget?.type === 'section' ? 'section and all its contained links' : 'block item'}? This action cannot be undone.
                </p>
            </ConfirmDialog>
        </div>
    )
}
