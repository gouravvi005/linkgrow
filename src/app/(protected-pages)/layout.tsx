import React from 'react'
import PostLoginLayout from '@/components/layouts/PostLoginLayout'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
    return (
        <div className="font-inter min-h-screen">
            <PostLoginLayout>{children}</PostLoginLayout>
        </div>
    )
}

export default Layout
