'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Button } from '@/components/public/ui/button'
import { Badge } from '@/components/public/ui/badge'
import { useRef } from 'react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])

  return (
    <section ref={containerRef} className="relative bg-grid min-h-[90vh] flex items-center overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 bg-white">
      {/* Background Dynamics */}
      <div className="absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-brand/5 blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[100px] animate-pulse delay-1000" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="outline" className="mb-8 rounded-full border-brand/20 bg-brand/5 px-5 py-2 text-brand uppercase tracking-[0.2em] text-[10px] font-black">
              <span className="mr-2">⚡</span>
              Autonomous Growth Protocol
            </Badge>

            <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-foreground">
              Scale Your <br />
              <span className="text-gradient drop-shadow-2xl">Empire.</span>
            </h1>

            <p className="mt-8 text-lg text-muted-foreground sm:text-xl sm:leading-relaxed max-w-xl">
              Linkgrow transforms your social traffic into a high-performance sales engine. Smart links, WhatsApp automation, and precision analytics for the elite creator.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
              <Button size="lg" className="w-full sm:w-auto h-16 rounded-[2rem] px-10 bg-slate-900 text-white hover:bg-brand hover:scale-105 transition-all text-sm font-black uppercase tracking-widest shadow-2xl shadow-slate-200">
                Deploy Your Nexus
                <Icon icon="lucide:zap" className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="h-14 w-14 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-brand group-hover:bg-brand/5 transition-all">
                  <Icon icon="lucide:play" className="h-5 w-5 text-slate-400 group-hover:text-brand" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-foreground transition-colors">Watch Systems</span>
              </div>
            </div>

            {/* Trust Badges & Avatars */}
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                    <Image
                      src={`https://picsum.photos/seed/creator-${i}/100/100`}
                      alt="Creator"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-bold text-slate-500">
                  +12k
                </div>
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((s) => <Icon key={s} icon="lucide:star" className="h-3 w-3 fill-current" />)}
                </div>
                <p className="font-medium text-foreground">Trusted by 12,000+ creators</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Interactive Performance Mockup */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Mockup Container */}
            <div className="animate-float relative aspect-[4/3] w-full rounded-[3rem] bg-slate-50 border-4 border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100" />

              {/* Internal Mockup Dashboard */}
              <div className="absolute inset-0 p-8 flex flex-col gap-6">
                {/* Header bar */}
                <div className="flex justify-between items-center bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="h-4 w-32 rounded-full bg-slate-100" />
                  <div className="h-8 w-8 rounded-full bg-brand" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Traffic</p>
                    <p className="text-4xl font-black text-foreground tracking-tighter">84.2K</p>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-full bg-brand"
                      />
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Leads</p>
                    <p className="text-4xl font-black text-brand tracking-tighter">1,204</p>
                    <div className="flex gap-1">
                      {[1, 1, 1, 1, 1].map((_, i) => <div key={i} className="h-1 w-full rounded-full bg-brand/20" />)}
                    </div>
                  </div>
                </div>

                {/* Growth Chart */}
                <div className="flex-1 bg-slate-950 rounded-3xl p-8 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                  <div className="absolute inset-0 bg-grid-white opacity-[0.05]" />
                  <div className="flex justify-between items-start mb-6">
                    <p className="text-white font-black uppercase tracking-widest text-[10px]">Real-time Performance</p>
                    <Icon icon="lucide:activity" className="h-4 w-4 text-brand animate-pulse" />
                  </div>
                  <div className="flex items-end justify-between h-32 gap-2">
                    {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        className="flex-1 bg-brand/80 rounded-t-lg hover:bg-brand transition-colors"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Glass Overlays */}
              <div className="absolute -bottom-6 -right-6 h-32 w-48 rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-white/30 p-4 hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 rounded-full bg-brand" />
                  <div className="h-3 w-20 rounded bg-slate-200" />
                </div>
                <div className="h-2 w-full rounded bg-slate-100" />
              </div>

              {/* Floating Performance Indicator */}
              <motion.div
                style={{ y: y2 }}
                className="absolute -right-8 top-1/4 bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-2xl space-y-4 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center">
                    <Icon icon="lucide:arrow-up-right" className="h-5 w-5 text-brand" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-lg font-black text-foreground">+42.5%</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Growth Surge</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute -top-10 -right-10 h-24 w-24 animate-bounce rounded-2xl bg-accent/20 blur-xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 animate-pulse rounded-full bg-brand/20 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
