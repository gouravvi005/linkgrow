'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Badge } from '@/components/landing/ui/badge'

import { socialLogos as logos, impactStats as stats } from '@/mock/landing-mock'


export function SocialProof() {
  return (
    <section className="py-10 bg-white overflow-hidden relative">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-brand/5 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* 3D Angled Logo Marquee */}
        <div className="relative mb-10 perspective-2000">
          <motion.div
            initial={{ rotateX: 20, rotateZ: -2 }}
            className="flex overflow-hidden"
          >
            <motion.div
              animate={{ x: [0, -2000] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex flex-none gap-10 items-center py-10"
            >
              {[...logos, ...logos, ...logos].map((logo, i) => (
                <div key={i} className="flex items-center gap-4 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all cursor-default scale-110">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100">
                    <Icon icon={logo.icon} className="h-7 w-7 text-slate-400 group-hover:text-brand" />
                  </div>
                  <span className="text-3xl font-black tracking-tighter text-slate-300 hover:text-foreground transition-colors uppercase italic">{logo.name}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Side Gradients for fading effect */}
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-white to-transparent z-10" />
        </div>

        {/* Impact Headline */}
        <div className="text-center mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 rounded-full border-brand/20 bg-brand/5 px-4 py-1.5 text-brand">
              Global Network
            </Badge>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground mb-10 leading-[0.9]">
              Built for <br />
              <span className="text-gradient drop-shadow-sm">Modern Scale.</span>
            </h2>
            <p className="mt-10 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Replacing static bio-links with high-velocity infrastructure designed for the creator economy.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-12 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="relative bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] border border-slate-100 h-full flex flex-col justify-between overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">

                <div>
                  <div className="h-16 w-16 rounded-2xl bg-brand/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                    <Icon icon={stat.icon} className="h-8 w-8 text-brand" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tighter text-foreground mb-6">
                    {stat.value}
                  </h3>
                  <div className="h-1 w-20 bg-brand rounded-full mb-6" />
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-brand">
                    {stat.label}
                  </p>
                  <p className="text-slate-500 leading-relaxed font-semibold">
                    {stat.description}
                  </p>
                </div>

                {/* Corner Decorative Element */}
                <div className="absolute -bottom-8 -right-8 h-24 w-24 bg-brand/5 rounded-full blur-2xl group-hover:bg-brand/10 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Global Pulse Visualization */}
        <div className="mt-28 flex flex-col items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">System Pulse Live</span>
          </div>

          <div className="relative glass px-10 py-5 rounded-[2rem] border border-white/50 flex items-center gap-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-white/40 backdrop-blur-3xl group cursor-default overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative h-4 w-4">
              <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping" />
              <div className="relative rounded-full bg-emerald-500 h-4 w-4 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </div>

            <div className="flex flex-col">
              <p className="text-[12px] font-black text-foreground uppercase tracking-widest leading-none mb-1">
                Global Activity
              </p>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                New high-conversion link deployed in <span className="text-brand">Dubai, UAE</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


