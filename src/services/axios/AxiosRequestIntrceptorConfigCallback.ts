import type { InternalAxiosRequestConfig } from 'axios';
import { useWorkspaceStore } from '@/store/workspaceStore'

const AxiosRequestIntrceptorConfigCallback = (
    config: InternalAxiosRequestConfig,
) => {
    /** Attach workspace ID header if set */
    const workspaceId = useWorkspaceStore.getState().workspaceId
    if (workspaceId && config.headers) {
        config.headers['x-workspace-id'] = workspaceId
    }
    return config
}

export default AxiosRequestIntrceptorConfigCallback

