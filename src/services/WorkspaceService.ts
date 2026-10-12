import ApiService from './ApiService'

export async function apiGetMyWorkspaces<T = any>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/workspaces',
        method: 'get',
    })
}

export async function apiCreateWorkspace<T = any>(data: Record<string, any>) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/workspaces',
        method: 'post',
        data,
    })
}

export async function apiUpdateWorkspace<T = any>(id: string, data: Record<string, any>) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/workspaces/${id}`,
        method: 'patch',
        data,
    })
}

export async function apiDeleteWorkspace<T = any>(id: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/workspaces/${id}`,
        method: 'delete',
    })
}
