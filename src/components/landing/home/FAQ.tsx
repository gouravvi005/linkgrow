'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Badge } from '@/components/landing/ui/badge'
import { cn } from '@/lib/utils'

import { homeFaqs as faqs } from '@/mock/landing-mock'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Ultra-Premium Background Elements */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-brand/5 blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[150px] animate-pulse delay-1000" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.02]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 rounded-full border-brand/20 bg-brand/5 px-4 py-1.5 text-brand">
              Knowledge Base
            </Badge>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-8">
              Frequently Asked <br />
              <span className="text-gradient">Questions.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Everything you need to know about scaling your digital presence.
              Can't find the answer? Our support team is here to help 24/7.
            </p>
          </motion.div>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={cn(
                "rounded-[2.5rem] border transition-all duration-500 overflow-hidden",
                openIndex === i
                  ? "border-brand/20 bg-white shadow-[0_32px_64px_-16px_rgba(34,197,94,0.1)]"
                  : "border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)]"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-8 text-left group"
              >
                <span className={cn(
                  "text-xl font-black tracking-tight transition-colors duration-300",
                  openIndex === i ? "text-brand" : "text-foreground group-hover:text-brand"
                )}>
                  {faq.q}
                </span>
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm",
                  openIndex === i
                    ? "bg-brand text-white rotate-180 shadow-brand/20"
                    : "bg-white text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 border border-slate-100"
                )}>
                  <Icon icon="lucide:chevron-down" className="h-4 w-4" />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-8 pb-8 pt-0 text-slate-500 font-medium leading-relaxed max-w-2xl">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
