'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { BentoGrid, BentoCard } from './BentoGrid'
import { Badge } from '@/components/public/ui/badge'

export function Features() {
  return (
    <section className="py-32 bg-white overflow-hidden relative">
      {/* Ultra-Premium Background Elements */}
      <div className="absolute top-0 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-brand/5 blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 left-1/4 -z-10 h-[700px] w-[700px] rounded-full bg-accent/5 blur-[150px] animate-pulse delay-1000" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.02]" />
      <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)] -z-0" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="outline" className="mb-6 rounded-full border-brand/20 bg-brand/5 px-4 py-1.5 text-brand">
              Intelligence Engine
            </Badge>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-foreground leading-[0.9] mb-8">
              Everything you <br />
              need to <span className="text-gradient drop-shadow-sm">Grow.</span>
            </h2>
            <p className="mt-10 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              We've replaced dozens of disconnected tools with a single,
              high-performance ecosystem built to scale your influence.
            </p>
          </motion.div>
        </div>

        <BentoGrid className="gap-10">
          {/* Card 1: Smart Builder */}
          <BentoCard
            tag="Link-in-Bio"
            title="Visual Page Architecture"
            description="Our ultra-fast builder lets you assemble premium link pages with zero friction."
            icon={<Icon icon="lucide:layout-template" className="h-12 w-12" />}
            className="md:col-span-2 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] group"
          >
            <div className="mt-12 flex justify-center perspective-2000">
              <motion.div
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ rotateX: 4, rotateY: -4, translateZ: 50 }}
                className="w-full max-w-sm space-y-5 rounded-[2.5rem] bg-slate-50/80 p-10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] border border-slate-100 backdrop-blur-xl relative"
              >
                {[
                  { icon: 'simple-icons:instagram', label: 'My Portfolio', color: 'from-purple-500 to-pink-500', delay: 0 },
                  { icon: 'simple-icons:youtube', label: 'Watch Latest', color: 'from-red-500 to-rose-600', delay: 0.1 },
                  { icon: 'simple-icons:whatsapp', label: 'Book a Call', color: 'from-emerald-500 to-teal-600', delay: 0.2 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.delay + 0.3 }}
                    className="group/item flex items-center gap-5 rounded-[1.25rem] bg-white p-5 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.04)] border border-slate-50 transition-all hover:scale-[1.04] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:border-brand/20"
                  >
                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br shadow-lg transform transition-transform group-hover/item:rotate-6", item.color)}>
                      <Icon icon={item.icon} className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 w-32 rounded-full bg-slate-100 mb-2.5 group-hover/item:bg-brand/10 transition-colors" />
                      <div className="h-2 w-20 rounded-full bg-slate-50" />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover/item:bg-brand/5 transition-colors">
                      <Icon icon="lucide:arrow-right" className="text-slate-300 transition-all group-hover/item:text-brand group-hover/item:translate-x-1" />
                    </div>
                  </motion.div>
                ))}

                {/* Simulated Cursor */}
                <motion.div
                  animate={{ x: [150, 100, 150], y: [150, 50, 150] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute pointer-events-none"
                >
                  <Icon icon="lucide:mouse-pointer-2" className="h-6 w-6 text-slate-900 fill-white shadow-2xl" />
                </motion.div>
              </motion.div>
            </div>
          </BentoCard>

          {/* Card 2: WhatsApp Sync */}
          <BentoCard
            tag="Automation"
            title="Instant Conversion"
            description="Bridge the gap between discovery and conversation."
            icon={<Icon icon="lucide:message-circle" className="h-12 w-12" />}
            className="bg-card-lime relative overflow-hidden group shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]"
          >
            <div className="mt-16 flex justify-center">
              <div className="relative">
                <div className="h-28 w-56 rounded-[2.5rem] bg-white/90 p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-white/50 backdrop-blur-2xl">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <Icon icon="lucide:user-plus" className="h-7 w-7" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-3.5 w-28 rounded-full bg-slate-100" />
                      <div className="h-2.5 w-20 rounded-full bg-slate-50" />
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-8 -right-8 h-20 w-20 rounded-[2rem] bg-brand flex items-center justify-center shadow-[0_20px_40px_-8px_rgba(34,197,94,0.4)] border-[6px] border-white rotate-6"
                >
                  <Icon icon="simple-icons:whatsapp" className="h-10 w-10 text-white" />
                </motion.div>

                {/* Floating Pulse Rings */}
                <div className="absolute -top-8 -right-8 h-20 w-20 rounded-[2rem] border-2 border-brand/30 animate-ping" />
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Auto DM */}
          <BentoCard
            tag="Engagement"
            title="AI Ghostwriter"
            description="Respond to every fan interaction without lifting a finger."
            icon={<Icon icon="lucide:sparkles" className="h-12 w-12" />}
            className="bg-card-blue group shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]"
          >
            <div className="mt-14 space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex justify-start"
              >
                <div className="rounded-[1.5rem] rounded-tl-none bg-white p-5 text-[12px] shadow-xl border border-blue-100 max-w-[90%] font-semibold leading-relaxed text-slate-700">
                  "I'm obsessed! Link to presets?"
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-end"
              >
                <div className="rounded-[1.5rem] rounded-tr-none bg-gradient-to-br from-brand to-emerald-600 p-5 text-[12px] text-white shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)] max-w-[90%] font-black leading-relaxed">
                  "Sent! Check your inbox ⚡️"
                </div>
              </motion.div>
            </div>
          </BentoCard>

          {/* Card 4: Analytics */}
          <BentoCard
            tag="Intelligence"
            title="Strategic Data"
            description="Deep-dive into conversion funnels and audience behavior."
            icon={<Icon icon="lucide:trending-up" className="h-12 w-12" />}
            className="md:col-span-2 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] group"
          >
            <div className="mt-14 grid grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {[
                  { label: 'Growth Velocity', val: '+342%', sub: 'Last 30 days', color: 'text-brand' },
                  { label: 'Active Funnels', val: '12', sub: 'Running now', color: 'text-accent' },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 group-hover:bg-white group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] transition-all duration-700">
                    <p className="text-[11px] text-muted-foreground uppercase font-black tracking-[0.3em] mb-3">{stat.label}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-black text-foreground tracking-tighter">{stat.val}</span>
                      <Badge className={cn("rounded-full border-0 font-black text-[11px] px-3 py-1", stat.color === 'text-brand' ? 'bg-brand/10 text-brand' : 'bg-accent/10 text-accent')}>
                        ACTIVE
                      </Badge>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold">{stat.sub}</p>
                  </div>
                ))}
              </div>
              <div className="h-48 flex items-end gap-3 px-4">
                {[30, 65, 40, 90, 55, 80, 50, 100, 75, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 bg-gradient-to-t from-brand/5 via-brand/20 to-brand/60 rounded-t-2xl relative"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand rounded-full shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}



