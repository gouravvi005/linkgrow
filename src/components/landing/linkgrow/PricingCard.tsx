'use client'

import { Icon } from '@iconify/react'
import { Button } from '@/components/landing/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

type PricingCardProps = {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  index: number
}

export function PricingCard({ name, price, description, features, highlighted, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        "relative flex flex-col p-6 sm:p-8 rounded-3xl transition-all duration-700 group",
        highlighted
          ? "bg-slate-950 text-white shadow-[0_0_80px_-20px_rgba(34,197,94,0.3)] scale-105 z-10 border border-brand/50"
          : "bg-white border border-slate-100 hover:border-brand/20 hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.05)]"
      )}
    >
      {highlighted && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_20px_40px_-10px_rgba(34,197,94,0.5)]">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className={cn(
          "text-2xl font-black tracking-tight",
          highlighted ? "text-white" : "text-foreground"
        )}>
          {name}
        </h3>
        <p className={cn(
          "text-sm font-medium leading-relaxed",
          highlighted ? "text-slate-400" : "text-slate-500"
        )}>
          {description}
        </p>
      </div>

      <div className="mb-10 flex items-baseline gap-2">
        <span className={cn(
          "text-3xl font-black tracking-tighter",
          highlighted ? "text-white" : "text-foreground"
        )}>
          {price}
        </span>
        {price !== 'Free' && price !== '₹0' && (
          <span className={cn(
            "text-lg font-bold",
            highlighted ? "text-slate-600" : "text-slate-400"
          )}>
            /mo
          </span>
        )}
      </div>

      <div className="space-y-5 flex-1 mb-12">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-4 group/item">
            <div className={cn(
              "h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-500",
              highlighted
                ? "bg-brand/20 text-brand"
                : "bg-slate-50 text-slate-300 group-hover/item:bg-brand group-hover/item:text-white"
            )}>
              <Icon icon="lucide:check" className="h-3.5 w-3.5" />
            </div>
            <span className={cn(
              "text-sm font-bold transition-colors duration-300",
              highlighted ? "text-slate-300" : "text-slate-600 group-hover/item:text-foreground"
            )}>
              {feature}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant={highlighted ? 'brand' : 'outline'}
        className={cn(
          "w-full h-16 rounded-2xl text-sm font-black transition-all duration-500 overflow-hidden relative group/btn",
          highlighted
            ? "bg-brand text-white shadow-[0_25px_50px_-12px_rgba(34,197,94,0.5)] hover:scale-[1.02] active:scale-[0.98] border-0"
            : "bg-white border-2 border-slate-100 hover:border-brand hover:text-brand hover:bg-slate-50/50"
        )}
      >
        <span className="relative z-10">Get Started</span>
        {highlighted && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
        )}
      </Button>
    </motion.div>
  )
}
