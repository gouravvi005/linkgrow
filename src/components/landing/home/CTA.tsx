'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Button } from '@/components/landing/ui/button'
import { Badge } from '@/components/landing/ui/badge'
import { cn } from '@/lib/utils'

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.15)_0%,transparent_50%)]" />
      <div className="absolute bottom-0 left-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_20%_80%,rgba(0,183,255,0.1)_0%,transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-7xl rounded-[4rem] bg-slate-950 px-8 py-24 text-center text-white relative overflow-hidden shadow-[0_48px_96px_-24px_rgba(0,0,0,0.5)]"
      >
        {/* Animated Orbs inside the card */}
        <div className="absolute top-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-brand/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px] animate-pulse delay-700" />

        {/* Mesh Grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.03] -z-0 invert" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="outline" className="mb-8 rounded-full border-white/10 bg-white/5 px-6 py-2 text-brand font-bold uppercase tracking-widest text-xs">
              Limited Time Offer
            </Badge>
          </motion.div>

          <h2 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.9] mb-10 text-white">
            Ready to grow your <br />
            <span className="text-gradient drop-shadow-2xl">audience?</span>
          </h2>

          <p className="mx-auto max-w-2xl text-xl text-slate-400 mb-14 font-medium leading-relaxed">
            Join <span className="text-white font-bold">12,000+ creators</span> who are scaling their brands with Linkgrow.
            No credit card required. Cancel anytime.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Button
              size="lg"
              className="group relative rounded-full px-16 h-16 text-xl font-black bg-brand text-white hover:bg-brand/90 shadow-[0_20px_40px_-10px_rgba(34,197,94,0.5)] transition-all hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Now
                <Icon icon="lucide:arrow-right" className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-16 h-16 text-xl font-bold border-white/10 text-white hover:bg-white/5 backdrop-blur-sm transition-all"
            >
              Talk to Sales
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { icon: 'lucide:shield-check', text: 'Secure & Private' },
              { icon: 'lucide:zap', text: '14-day Pro trial' },
              { icon: 'lucide:globe', text: 'Trusted Globally' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-tighter">
                <Icon icon={item.icon} className="h-5 w-5 text-brand" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
