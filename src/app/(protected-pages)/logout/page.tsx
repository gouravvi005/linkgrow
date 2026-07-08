'use client'

import { useEffect } from 'react'
import handleSignOut from '@/server/actions/auth/handleSignOut'
import Spinner from '@/components/ui/Spinner'

export default function LogoutPage() {
    useEffect(() => {
        const performSignOut = async () => {
            try {
                await handleSignOut()
            } catch (error) {
                console.error('Sign out failed', error)
            }
        }
        performSignOut()
    }, [])

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
            <div className="flex flex-col items-center gap-4 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <Spinner size={40} className="text-primary" />
                <h5 className="font-bold text-gray-900 dark:text-gray-100">Signing you out...</h5>
                <p className="text-xs text-gray-500">Please wait while we clear your session.</p>
            </div>
        </div>
    )
}
