'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { initialLinkPages, BioLinkPage } from '@/mock-data/linkPages'
import { apiGetProfile, apiUpdateProfile } from '@/services/ProfileService'
import { useAppDispatch } from '@/store/hooks'
import { setCurrentProfile, updateCurrentProfileTheme } from '@/store/slices/profileSlice'

interface MiniSiteContextType {
    pageData: BioLinkPage
    setPageData: React.Dispatch<React.SetStateAction<BioLinkPage>>
    previewMode: 'mobile' | 'tablet' | 'desktop'
    setPreviewMode: (mode: 'mobile' | 'tablet' | 'desktop') => void
    isLoading: boolean
    saveChangesToBackend: () => Promise<void>

    // Customizer sliders & dimensions
    avatarSize: number
    setAvatarSize: (val: number) => void
    titleFontSize: number
    setTitleFontSize: (val: number) => void
    bioFontSize: number
    setBioFontSize: (val: number) => void
    buttonRoundness: number
    setButtonRoundness: (val: number) => void
    buttonPadding: number
    setButtonPadding: (val: number) => void
    buttonSpacing: number
    setButtonSpacing: (val: number) => void

    // Theme options
    buttonStyle: 'solid' | 'glass' | 'outline'
    setButtonStyle: (style: 'solid' | 'glass' | 'outline') => void
    buttonShadow: 'none' | 'soft' | 'strong' | 'hard'
    setButtonShadow: (shadow: 'none' | 'soft' | 'strong' | 'hard') => void
    buttonColor: string
    setButtonColor: (color: string) => void
    buttonTextColor: string
    setButtonTextColor: (color: string) => void
    pageFont: string
    setPageFont: (font: string) => void
    pageTextColor: string
    setPageTextColor: (color: string) => void
    titleFontColor: string
    setTitleFontColor: (color: string) => void
    titleSize: 'small' | 'large'
    setTitleSize: (size: 'small' | 'large') => void
    altTitleFont: boolean
    setAltTitleFont: (val: boolean) => void
    headerLayout: 'classic' | 'hero'
    setHeaderLayout: (layout: 'classic' | 'hero') => void

    // Hero banner
    heroBannerImage: string
    setHeroBannerImage: (url: string) => void
    heroBannerColor1: string
    setHeroBannerColor1: (color: string) => void
    heroBannerColor2: string
    setHeroBannerColor2: (color: string) => void
}

const MiniSiteContext = createContext<MiniSiteContextType | undefined>(undefined)

export const MiniSiteProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch()
    const [pageData, setPageData] = useState<BioLinkPage>(initialLinkPages[0])
    const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Sliders State
    const [avatarSize, setAvatarSize] = useState<number>(64)
    const [titleFontSize, setTitleFontSize] = useState<number>(15)
    const [bioFontSize, setBioFontSize] = useState<number>(11)
    const [buttonRoundness, setButtonRoundness] = useState<number>(12)
    const [buttonPadding, setButtonPadding] = useState<number>(12)
    const [buttonSpacing, setButtonSpacing] = useState<number>(12)

    // Styling States
    const [buttonStyle, setButtonStyle] = useState<'solid' | 'glass' | 'outline'>('solid')
    const [buttonShadow, setButtonShadow] = useState<'none' | 'soft' | 'strong' | 'hard'>('none')
    const [buttonColor, setButtonColor] = useState<string>('#FFFFFF')
    const [buttonTextColor, setButtonTextColor] = useState<string>('#000000')
    const [pageFont, setPageFont] = useState<string>('Link Sans')
    const [pageTextColor, setPageTextColor] = useState<string>('#FFFFFF')
    const [titleFontColor, setTitleFontColor] = useState<string>('#FFFFFF')
    const [titleSize, setTitleSize] = useState<'small' | 'large'>('small')
    const [altTitleFont, setAltTitleFont] = useState<boolean>(false)
    const [headerLayout, setHeaderLayout] = useState<'classic' | 'hero'>('classic')

    // Hero banner
    const [heroBannerImage, setHeroBannerImage] = useState<string>('')
    const [heroBannerColor1, setHeroBannerColor1] = useState<string>('#8B5CF6')
    const [heroBannerColor2, setHeroBannerColor2] = useState<string>('#6366F1')

    useEffect(() => {
        const fetchRemoteProfile = async () => {
            try {
                setIsLoading(true)
                const remote = await apiGetProfile()
                if (remote) {
                    setPageData((prev) => ({
                        ...prev,
                        ...remote,
                        title: remote.title || prev.title,
                        bio: remote.bio || prev.bio,
                        avatar: remote.avatar || prev.avatar,
                    }))
                    dispatch(setCurrentProfile(remote))
                    if (remote.themeSettings) {
                        const ts = remote.themeSettings
                        if (ts.avatarSize) setAvatarSize(ts.avatarSize)
                        if (ts.titleFontSize) setTitleFontSize(ts.titleFontSize)
                        if (ts.bioFontSize) setBioFontSize(ts.bioFontSize)
                        if (ts.buttonRoundness) setButtonRoundness(ts.buttonRoundness)
                        if (ts.buttonPadding) setButtonPadding(ts.buttonPadding)
                        if (ts.buttonSpacing) setButtonSpacing(ts.buttonSpacing)
                        if (ts.buttonStyle) setButtonStyle(ts.buttonStyle)
                        if (ts.buttonShadow) setButtonShadow(ts.buttonShadow)
                        if (ts.buttonColor) setButtonColor(ts.buttonColor)
                        if (ts.buttonTextColor) setButtonTextColor(ts.buttonTextColor)
                        if (ts.pageFont) setPageFont(ts.pageFont)
                        if (ts.pageTextColor) setPageTextColor(ts.pageTextColor)
                        if (ts.titleFontColor) setTitleFontColor(ts.titleFontColor)
                        if (ts.titleSize) setTitleSize(ts.titleSize)
                        if (ts.headerLayout) setHeaderLayout(ts.headerLayout)
                        dispatch(updateCurrentProfileTheme(ts))
                    }
                }
            } catch (err) {
                // Keep default state on error
            } finally {
                setIsLoading(false)
            }
        }
        fetchRemoteProfile()
    }, [dispatch])

    const saveChangesToBackend = async () => {
        const themeSettings = {
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
        }

        dispatch(updateCurrentProfileTheme(themeSettings))

        await apiUpdateProfile(
            {
                title: pageData.title,
                bio: pageData.bio,
                avatarUrl: pageData.avatar,
                themeSettings,
            },
            pageData.id.startsWith('page-') ? undefined : pageData.id,
        )
    }


    return (
        <MiniSiteContext.Provider value={{
            pageData,
            setPageData,
            previewMode,
            setPreviewMode,
            isLoading,
            saveChangesToBackend,
            avatarSize,
            setAvatarSize,
            titleFontSize,
            setTitleFontSize,
            bioFontSize,
            setBioFontSize,
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
            titleSize,
            setTitleSize,
            altTitleFont,
            setAltTitleFont,
            headerLayout,
            setHeaderLayout,
            heroBannerImage,
            setHeroBannerImage,
            heroBannerColor1,
            setHeroBannerColor1,
            heroBannerColor2,
            setHeroBannerColor2,
        }}>
            {children}
        </MiniSiteContext.Provider>
    )
}

export const useMiniSite = () => {
    const context = useContext(MiniSiteContext)
    if (!context) {
        throw new Error('useMiniSite must be used within a MiniSiteProvider')
    }
    return context
}

