'use client'

import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/public/linkgrow/PageShell'
import { Button } from '@/components/public/ui/button'
import { Badge } from '@/components/public/ui/badge'
import { CTA } from '@/components/public/home/CTA'
import { FAQ } from '@/components/public/home/FAQ'
import { cn } from '@/lib/utils'

import { featureCategories } from '@/mock/mock'

export default function FeaturesPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute top-0 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-brand/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 -z-10 h-[700px] w-[700px] rounded-full bg-accent/5 blur-[150px] animate-pulse delay-1000" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.03]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 rounded-full border-brand/20 bg-brand/5 px-4 py-1.5 text-brand">
              The Growth Suite
            </Badge>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground leading-[1.1] mb-8">
              Engineered for <br />
              <span className="text-gradient">Total Growth.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground font-medium leading-relaxed">
              Every feature we build is designed with one goal: To convert your social media traffic into paying customers faster.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Categories */}
      <div className="space-y-32 pb-32">
        {featureCategories.map((category, idx) => (
          <section key={category.id} className="relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className={cn(
                "flex flex-col lg:flex-row items-center gap-16 lg:gap-24",
                category.reverse && "lg:flex-row-reverse"
              )}>
                {/* Content */}
                <div className="flex-1 w-full">
                  <motion.div
                    initial={{ opacity: 0, x: category.reverse ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className={cn(
                      "text-sm font-black uppercase tracking-[0.3em] mb-4 block",
                      category.color === 'brand' ? "text-brand" : "text-accent"
                    )}>
                      {category.subtitle}
                    </span>
                    <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground mb-8 leading-[1.1]">
                      {category.title}
                    </h2>
                    <p className="text-lg text-slate-500 font-medium mb-12 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8">
                      {category.features.map((feature, i) => (
                        <div key={i} className="group">
                          <div className={cn(
                            "h-12 w-12 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:rotate-6",
                            category.color === 'brand' ? "bg-brand/10 text-brand" : "bg-accent/10 text-accent"
                          )}>
                            <Icon icon={feature.icon} className="h-6 w-6" />
                          </div>
                          <h4 className="text-xl font-black mb-2 tracking-tight">{feature.title}</h4>
                          <p className="text-slate-500 font-medium text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Visual */}
                <div className="flex-1 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative group"
                  >
                    <div className={cn(
                      "absolute -inset-4 rounded-[4rem] blur-3xl opacity-20 transition-opacity group-hover:opacity-30",
                      category.color === 'brand' ? "bg-brand" : "bg-accent"
                    )} />
                    <div className="relative rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-2xl bg-white aspect-[4/3]">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Feature Grid / Comparison Section */}
      <section className="py-32 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground mb-6">Everything you need</h2>
            <p className="text-xl text-slate-500 font-medium">Over 100+ micro-features designed to help you scale.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Custom Backgrounds', 'Video Links', 'Email Opt-ins', 'Pixel Tracking',
              'Auto-save Leads', 'CSV Exports', 'Password Links', 'Social Icons',
              'Sensitive Content', 'Link Scheduling', 'Animated Buttons', 'Priority Links',
              'Profile Pictures', 'Fonts & Styling', 'Deep Linking', 'UTM Parameters'
            ].map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 hover:shadow-lg transition-all group">
                <Icon icon="lucide:check-circle-2" className="text-brand h-5 w-5 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & CTA */}
      <FAQ />
      <CTA />
    </PageShell>
  )
}
