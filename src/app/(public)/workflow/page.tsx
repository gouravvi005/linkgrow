'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { PageShell } from '@/components/public/linkgrow/PageShell'
import { Badge } from '@/components/public/ui/badge'
import { CTA } from '@/components/public/home/CTA'
import { FAQ } from '@/components/public/home/FAQ'
import { cn } from '@/lib/utils'
import { Button } from '@/components/public/ui/button'

import { workflowSteps as steps } from '@/mock/mock'

export default function WorkflowPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
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
              The Engine
            </Badge>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground leading-[1.1] mb-8">
              How it works <br />
              <span className="text-gradient">for you.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground font-medium leading-relaxed">
              From zero to lead generation in under 5 minutes. No complex setups, just pure conversion logic.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-25">
          <div className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />

            <div className="grid gap-12 lg:grid-cols-4">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  className="relative group"
                >
                  <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-4">
                    <div className={cn(
                      "h-16 w-16 rounded-[1.5rem] flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6",
                      step.color === 'brand' ? "bg-brand/10 text-brand" : "bg-accent/10 text-accent"
                    )}>
                      <Icon icon={step.icon} className="h-8 w-8" />
                    </div>
                    <span className="text-sm font-black text-slate-300 mb-2 block uppercase tracking-widest">{step.number}</span>
                    <h3 className="text-2xl font-black mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{step.description}</p>
                  </div>

                  {/* Decorative Dot */}
                  <div className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-10 w-10 bg-white border-4 border-slate-50 rounded-full items-center justify-center z-10 shadow-lg">
                    <div className={cn(
                      "h-3 w-3 rounded-full animate-pulse",
                      step.color === 'brand' ? "bg-brand" : "bg-accent"
                    )} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Visualization Placeholder */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl bg-slate-950 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,94,0.15)_0%,transparent_50%)]" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-white">
              <Badge variant="outline" className="mb-6 rounded-full border-white/20 bg-white/5 px-4 py-1.5 text-white">
                Live Demo
              </Badge>
              <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight tracking-tight">
                See the <span className="text-brand">Linkgrow</span> magic in action.
              </h2>
              <div className="space-y-6 mb-12">
                {[
                  'Real-time lead alerts',
                  'Instant WhatsApp triggers',
                  'Conversion tracking live'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-6 w-6 rounded-full bg-brand/20 flex items-center justify-center text-brand">
                      <Icon icon="lucide:check" className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-bold text-white/80">{item}</span>
                  </div>
                ))}
              </div>
              <Button className="h-16 px-10 rounded-2xl bg-brand text-white hover:bg-brand/90 text-lg font-black shadow-xl">
                Try Builder Now
              </Button>
            </div>
            <div className="flex-1 w-full relative">
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] bg-slate-900 group-hover:scale-[1.02] transition-transform duration-700">
                <img
                  src="https://picsum.photos/seed/workflow-demo/800/600"
                  alt="Workflow Demo"
                  className="w-full h-full object-cover opacity-60"
                />
                {/* Floating UI Elements Placeholder */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 left-10 p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl w-48"
                >
                  <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                  <div className="h-2 w-12 bg-white/20 rounded" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <CTA />
    </PageShell>
  )
}
