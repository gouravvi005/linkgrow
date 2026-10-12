import ApiService from './ApiService'

export interface ProfileThemeSettings {
    avatarSize?: number
    titleFontSize?: number
    bioFontSize?: number
    buttonRoundness?: number
    buttonPadding?: number
    buttonSpacing?: number
    buttonStyle?: 'solid' | 'glass' | 'outline'
    buttonShadow?: 'none' | 'soft' | 'strong' | 'hard'
    buttonColor?: string
    buttonTextColor?: string
    pageFont?: string
    pageTextColor?: string
    titleFontColor?: string
    titleSize?: 'small' | 'large'
    altTitleFont?: boolean
    headerLayout?: 'classic' | 'hero'
    heroBannerImage?: string
    heroBannerColor1?: string
    heroBannerColor2?: string
    [key: string]: any
}

export interface UpdateProfileParams {
    title?: string
    bio?: string
    handle?: string
    avatarUrl?: string
    themeSettings?: ProfileThemeSettings
    isPublished?: boolean
    [key: string]: any
}

export interface CreateProfileParams {
    title: string
    handle: string
    bio?: string
    avatarUrl?: string
    themeSettings?: ProfileThemeSettings
}

export async function apiGetProfile<T = any>(id?: string) {
    const url = id ? `/profiles/${id}` : '/profiles/me'
    return ApiService.fetchDataWithAxios<T>({
        url,
        method: 'get',
    })
}

export async function apiGetAllProfiles<T = any[]>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/profiles',
        method: 'get',
    })
}

export async function apiCreateProfile<T = any>(data: CreateProfileParams) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/profiles',
        method: 'post',
        data,
    })
}

export async function apiUpdateProfile<T = any>(data: UpdateProfileParams, id?: string) {
    const url = id ? `/profiles/${id}` : '/profiles/me'
    return ApiService.fetchDataWithAxios<T>({
        url,
        method: 'patch',
        data,
    })
}

export async function apiToggleProfileStatus<T = any>(id: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/profiles/${id}/toggle-status`,
        method: 'patch',
    })
}

export async function apiDeleteProfile<T = any>(id: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/profiles/${id}`,
        method: 'delete',
    })
}
