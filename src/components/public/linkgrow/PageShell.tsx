import { ReactNode } from 'react'
import { Footer } from '@/components/public/linkgrow/Footer'
import { Navbar } from '@/components/public/linkgrow/Navbar'

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
