import ApiService from './ApiService'

export interface CreateLinkParams {
    title: string
    url: string
    categoryId?: string
    thumbnailUrl?: string
    isPinned?: boolean
    sortOrder?: number
    settings?: Record<string, any>
}

export interface UpdateLinkParams {
    title?: string
    url?: string
    categoryId?: string | null
    thumbnailUrl?: string | null
    isPinned?: boolean
    isArchived?: boolean
    sortOrder?: number
    settings?: Record<string, any> | null
}

export interface CreateCategoryParams {
    name: string
    sortOrder?: number
}

export interface UpdateCategoryParams {
    name?: string
    sortOrder?: number
}

export interface CreateSocialLinkParams {
    platform: string
    url: string
    sortOrder?: number
}

export interface UpdateSocialLinkParams {
    platform?: string
    url?: string
    sortOrder?: number
}

// Links CRUD
export async function apiGetLinks() {
    return ApiService.fetchDataWithAxios<any[]>({
        url: '/links',
        method: 'get',
    })
}

export async function apiCreateLink(data: CreateLinkParams) {
    return ApiService.fetchDataWithAxios<any>({
        url: '/links',
        method: 'post',
        data,
    })
}

export async function apiUpdateLink(id: string, data: UpdateLinkParams) {
    return ApiService.fetchDataWithAxios<any>({
        url: `/links/${id}`,
        method: 'patch',
        data,
    })
}

export async function apiDeleteLink(id: string) {
    return ApiService.fetchDataWithAxios<any>({
        url: `/links/${id}`,
        method: 'delete',
    })
}

// Categories CRUD
export async function apiGetCategories() {
    return ApiService.fetchDataWithAxios<any[]>({
        url: '/links/categories',
        method: 'get',
    })
}

export async function apiCreateCategory(data: CreateCategoryParams) {
    return ApiService.fetchDataWithAxios<any>({
        url: '/links/categories',
        method: 'post',
        data,
    })
}

export async function apiUpdateCategory(id: string, data: UpdateCategoryParams) {
    return ApiService.fetchDataWithAxios<any>({
        url: `/links/categories/${id}`,
        method: 'patch',
        data,
    })
}

export async function apiDeleteCategory(id: string) {
    return ApiService.fetchDataWithAxios<any>({
        url: `/links/categories/${id}`,
        method: 'delete',
    })
}

// Social Links CRUD
export async function apiGetSocialLinks() {
    return ApiService.fetchDataWithAxios<any[]>({
        url: '/links/social',
        method: 'get',
    })
}

export async function apiCreateSocialLink(data: CreateSocialLinkParams) {
    return ApiService.fetchDataWithAxios<any>({
        url: '/links/social',
        method: 'post',
        data,
    })
}

export async function apiUpdateSocialLink(id: string, data: UpdateSocialLinkParams) {
    return ApiService.fetchDataWithAxios<any>({
        url: `/links/social/${id}`,
        method: 'patch',
        data,
    })
}

export async function apiDeleteSocialLink(id: string) {
    return ApiService.fetchDataWithAxios<any>({
        url: `/links/social/${id}`,
        method: 'delete',
    })
}
