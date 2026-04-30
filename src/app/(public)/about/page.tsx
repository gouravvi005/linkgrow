'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { PageShell } from '@/components/public/linkgrow/PageShell'
import { Badge } from '@/components/public/ui/badge'
import { CTA } from '@/components/public/home/CTA'
import { cn } from '@/lib/utils'

import { aboutValues as values, platformStandards } from '@/mock/mock'

export default function AboutPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute top-0 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-brand/5 blur-[120px] animate-pulse" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.03]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 rounded-full border-brand/20 bg-brand/5 px-4 py-1.5 text-brand">
              Our Mission
            </Badge>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground leading-[1.1] mb-8">
              Helping creators <br />
              <span className="text-gradient">build empires.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground font-medium leading-relaxed">
              We started Linkgrow with a simple idea: Social media traffic is temporary, but business relationships are permanent. 
              Our platform bridges the gap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand/10 blur-3xl rounded-full" />
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl aspect-video">
                <img 
                  src="https://picsum.photos/seed/linkgrow-about/800/450" 
                  alt="Our Story" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black mb-8 tracking-tight">The Linkgrow Story</h2>
              <div className="space-y-6 text-lg text-slate-500 font-medium">
                <p>
                  Linkgrow was founded with a clear vision: The traditional "link-in-bio" is dead. In an era of instant communication, creators need more than a list of buttons—they need an automated lead machine.
                </p>
                <p>
                  We built our platform from the ground up using the latest high-performance cloud technology. We didn't want to just build another tool; we wanted to build the fastest, most secure, and most conversion-focused bridge between social media and business.
                </p>
                <p>
                  As a modern service provider, we are committed to constant innovation. We are launching new features weekly and working closely with our early adopters to shape the future of creator commerce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4 tracking-tight">What drives us</h2>
            <p className="text-lg text-slate-500 font-medium">The principles behind everything we build.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-14 w-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Icon icon={v.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{v.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Standards Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-brand uppercase tracking-[0.3em] mb-4">Infrastructure</h2>
            <p className="text-2xl font-black text-white tracking-tight">Built for performance from day one.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {platformStandards.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-6xl font-black text-brand mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-white/60 font-bold uppercase tracking-widest text-[10px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </PageShell>
  )
}
