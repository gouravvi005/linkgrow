import { create } from 'zustand'

export type WorkspaceState = {
    workspaceId: string | null
    workspaces: any[]
}

export type WorkspaceAction = {
    setWorkspaceId: (workspaceId: string | null) => void
    setWorkspaces: (workspaces: any[]) => void
}

export const useWorkspaceStore = create<WorkspaceState & WorkspaceAction>(
    (set) => ({
        workspaceId: null,
        workspaces: [],
        setWorkspaceId: (workspaceId) => set({ workspaceId }),
        setWorkspaces: (workspaces) => set({ workspaces }),
    }),
)
