'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Badge } from '@/components/public/ui/badge'

const problems = [
  {
    title: 'Ghost Engagement',
    description: "You're posting daily, but your reach is flatlining. Followers aren't converting into active fans.",
    icon: 'lucide:ghost',
    tag: 'Stagnation'
  },
  {
    title: 'Conversion Chasm',
    description: 'High traffic, zero sales. Your current bio link is a maze that customers never escape.',
    icon: 'lucide:shredder',
    tag: 'Lost Revenue'
  },
  {
    title: 'Manual Burnout',
    description: 'Manually replying to "DM for price" is killing your creativity. Automation is missing.',
    icon: 'lucide:battery-low',
    tag: 'Inefficiency'
  },
  {
    title: 'Tool Overload',
    description: 'Switching between 5 apps just to manage one link. It’s messy, slow, and expensive.',
    icon: 'lucide:boxes',
    tag: 'Complexity'
  },
]

export function Problems() {
  return (
    <section className="py-32 bg-slate-900 overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(244,63,94,0.05)_0%,transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.05)_0%,transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 rounded-full bg-rose-500/10 text-rose-500 px-6 py-2 text-[10px] font-black tracking-[0.2em] uppercase border border-rose-500/20 shadow-sm">
              The Problem
            </Badge>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-8">
              Sound familiar? <br />
              <span className="text-slate-500">You're not alone.</span>
            </h2>
            <p className="mt-8 text-xl text-slate-400 max-w-3xl mx-auto font-medium">
              Most creators are stuck in a cycle of manual labor and low returns.
              We identified the 4 core killers of creator growth.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-rose-500/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative h-full p-10 rounded-[2.5rem] bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl flex flex-col justify-between hover:border-rose-500/30 transition-all duration-500 group-hover:shadow-2xl">
                <div>
                  <div className="h-14 w-14 rounded-2xl bg-slate-700/50 flex items-center justify-center mb-8 border border-slate-600/50 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                    <Icon icon={p.icon} className="h-7 w-7" />
                  </div>
                  <Badge variant="outline" className="mb-4 border-slate-700 text-slate-500 text-[9px] uppercase tracking-widest font-black group-hover:border-rose-500/50 group-hover:text-rose-400 transition-colors">
                    {p.tag}
                  </Badge>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-rose-50">{p.title}</h3>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {p.description}
                </p>

                {/* Decorative "X" mark */}
                <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Icon icon="lucide:x" className="h-12 w-12 text-rose-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

