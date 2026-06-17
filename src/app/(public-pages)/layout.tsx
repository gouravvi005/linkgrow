
import React from 'react'
import { ReactNode } from 'react'
import { PageShell } from '@/components/landing/linkgrow/PageShell'

const Layout = async ({ children }: { children: ReactNode }) => {
    return (
        <div className="font-poppins min-h-screen flex flex-col">
            <PageShell>{children}</PageShell>
        </div>
    )
}

export default Layout
