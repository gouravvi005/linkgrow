import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Profile {
    id: string
    title: string
    bio?: string
    handle?: string
    avatar?: string
    themeSettings?: Record<string, any>
    isPublished?: boolean
}

export interface ProfileState {
    currentProfile: Profile | null
    profiles: Profile[]
    isLoading: boolean
    error: string | null
}

const initialState: ProfileState = {
    currentProfile: null,
    profiles: [],
    isLoading: false,
    error: null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setCurrentProfile: (state, action: PayloadAction<Profile | null>) => {
            state.currentProfile = action.payload
        },
        setProfiles: (state, action: PayloadAction<Profile[]>) => {
            state.profiles = action.payload
        },
        updateCurrentProfileTheme: (state, action: PayloadAction<Record<string, any>>) => {
            if (state.currentProfile) {
                state.currentProfile.themeSettings = {
                    ...state.currentProfile.themeSettings,
                    ...action.payload,
                }
            }
        },
        setProfileLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setProfileError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
    },
})

export const {
    setCurrentProfile,
    setProfiles,
    updateCurrentProfileTheme,
    setProfileLoading,
    setProfileError,
} = profileSlice.actions
export default profileSlice.reducer
