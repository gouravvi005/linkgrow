'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Badge } from '@/components/landing/ui/badge'
import { CTA } from '@/components/landing/home/CTA'
import { cn } from '@/lib/utils'

import { faqData } from '@/mock/landing-mock'

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-brand/5 blur-[120px] animate-pulse" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.03]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 rounded-full border-brand/20 bg-brand/5 px-4 py-1.5 text-brand">
              Knowledge Base
            </Badge>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground leading-[1.1] mb-8">
              Everything you <br />
              <span className="text-gradient">need to know.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground font-medium leading-relaxed">
              Find detailed answers to common questions about our platform, features, billing, and security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 shrink-0 space-y-2">
              {faqData.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setOpenIndex(0)
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all text-left",
                    activeCategory === cat.id
                      ? "bg-brand text-white shadow-xl shadow-brand/20 scale-105"
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  )}
                >
                  <Icon icon={cat.icon} className="h-5 w-5" />
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Questions List */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {faqData.find(c => c.id === activeCategory)?.questions.map((faq, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-[2.5rem] border border-slate-100 transition-all overflow-hidden",
                        openIndex === i ? "bg-white shadow-2xl border-brand/10" : "bg-slate-50/50 hover:bg-white"
                      )}
                    >
                      <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex items-center justify-between p-8 text-left"
                      >
                        <span className={cn(
                          "text-xl font-black tracking-tight",
                          openIndex === i ? "text-brand" : "text-foreground"
                        )}>
                          {faq.q}
                        </span>
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center transition-all",
                          openIndex === i ? "bg-brand text-white rotate-180" : "bg-white text-slate-400 border border-slate-100"
                        )}>
                          <Icon icon="lucide:chevron-down" className="h-4 w-4" />
                        </div>
                      </button>

                      <AnimatePresence>
                        {openIndex === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 pb-8 pt-0 text-slate-500 font-medium leading-relaxed max-w-3xl">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-y border-white/5">
        <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,94,0.1)_0%,transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-black mb-12 tracking-tight text-white">Still have questions?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'lucide:message-circle', title: 'Live Chat', desc: 'Average response: 5 mins', action: 'Start Chat' },
              { icon: 'lucide:mail', title: 'Email Support', desc: 'hello@linkgrow.io', action: 'Send Email' },
              { icon: 'lucide:twitter', title: 'Twitter Support', desc: '@linkgrow_io', action: 'Tweet Us' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-sm hover:bg-white/10 transition-all group">
                <div className="h-14 w-14 rounded-2xl bg-brand text-white flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Icon icon={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black mb-2 text-white">{item.title}</h3>
                <p className="text-white/40 font-medium text-sm mb-8">{item.desc}</p>
                <button className="text-brand font-black text-sm uppercase tracking-widest hover:underline">
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
