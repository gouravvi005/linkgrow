'use client'

import { motion } from 'framer-motion'
import { Logo } from './Logo'
import { Badge } from '@/components/landing/ui/badge'

interface LegalShellProps {
  title: string
  lastUpdated: string
  summary: string
  children: React.ReactNode
}

export function LegalShell({ title, lastUpdated, summary, children }: LegalShellProps) {
  return (
    <div className="min-h-screen bg-white pb-64">
      {/* Immersive Header */}
      <div className="pt-20 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 h-[800px] w-[800px] rounded-full bg-brand/5 blur-[150px]" />
        <div className="absolute top-1/4 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-16">
              <Logo />
            </div>
            <Badge variant="outline" className="mb-10 rounded-full border-brand/20 bg-brand/5 px-6 py-2 text-brand uppercase tracking-[0.3em] text-[10px] font-black">
              Legal Protocol
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-black text-foreground tracking-tighter mb-8 leading-[0.8] uppercase italic">
              {title.split(' ')[0]}<br />
              <span className="text-gradient drop-shadow-md">{title.split(' ').slice(1).join(' ')}</span>
            </h1>

            <div className="mx-auto max-w-2xl">
              <p className="text-base sm:text-lg font-medium text-slate-500 leading-relaxed mb-12 tracking-tight">
                {summary}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-slate-200" />
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                Revision: {lastUpdated}
              </p>
              <div className="h-px w-12 bg-slate-200" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {children}
        </div>
      </div>
    </div>
  )
}
