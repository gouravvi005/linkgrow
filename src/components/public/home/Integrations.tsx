'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Badge } from '@/components/public/ui/badge'

const integrations = [
  { name: 'Instagram', icon: 'simple-icons:instagram', color: 'bg-[#E4405F]', size: 'lg' },
  { name: 'WhatsApp', icon: 'simple-icons:whatsapp', color: 'bg-[#25D366]', size: 'lg' },
  { name: 'TikTok', icon: 'simple-icons:tiktok', color: 'bg-[#000000]', size: 'sm' },
  { name: 'YouTube', icon: 'simple-icons:youtube', color: 'bg-[#FF0000]', size: 'lg' },
  { name: 'LinkedIn', icon: 'simple-icons:linkedin', color: 'bg-[#0A66C2]', size: 'sm' },
  { name: 'Spotify', icon: 'simple-icons:spotify', color: 'bg-[#1DB954]', size: 'sm' },
  { name: 'Discord', icon: 'simple-icons:discord', color: 'bg-[#5865F2]', size: 'sm' },
  { name: 'Twitch', icon: 'simple-icons:twitch', color: 'bg-[#9146FF]', size: 'sm' },
]

export function Integrations() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/5 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 rounded-full border-brand/20 bg-brand/5 px-4 py-1.5 text-brand">
            Ecosystem
          </Badge>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-foreground mb-8">
            Connect everything <br />
            <span className="text-gradient">you need.</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Linkgrow integrates with the world’s most popular social platforms
            and business tools to supercharge your workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-4 max-w-5xl mx-auto">
          {integrations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`flex flex-col items-center justify-center p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative ${item.size === 'lg' ? 'md:row-span-1' : ''}`}
            >
              {/* Individual Halo Effect */}
              <div className={`absolute inset-0 ${item.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

              <div className={`h-16 w-16 rounded-2xl ${item.color} text-white flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                <Icon icon={item.icon} className="h-8 w-8" />
              </div>

              <span className="font-black text-slate-800 uppercase tracking-tighter text-sm">{item.name}</span>
              <div className="mt-2 h-1 w-8 bg-slate-100 group-hover:bg-brand transition-colors rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

