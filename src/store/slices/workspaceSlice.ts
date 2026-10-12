import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface WorkspaceItem {
    id: string
    name: string
    slug: string
}

export interface WorkspaceReduxState {
    activeWorkspaceId: string | null
    workspaces: WorkspaceItem[]
    isLoading: boolean
}

const initialState: WorkspaceReduxState = {
    activeWorkspaceId: null,
    workspaces: [],
    isLoading: false,
}

export const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        setActiveWorkspaceId: (state, action: PayloadAction<string | null>) => {
            state.activeWorkspaceId = action.payload
        },
        setWorkspacesList: (state, action: PayloadAction<WorkspaceItem[]>) => {
            state.workspaces = action.payload
        },
        setWorkspaceLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    },
})

export const {
    setActiveWorkspaceId,
    setWorkspacesList,
    setWorkspaceLoading,
} = workspaceSlice.actions
export default workspaceSlice.reducer
