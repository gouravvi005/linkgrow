'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto', className)}>
      {children}
    </div>
  )
}

interface BentoCardProps {
  children: ReactNode
  className?: string
  title?: string
  description?: string
  icon?: ReactNode
  tag?: string
}

export function BentoCard({
  children,
  className,
  title,
  description,
  icon,
  tag
}: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card-grey p-6 transition-all hover:shadow-xl dark:bg-slate-900/50',
        className
      )}
    >
      <div className="relative z-10">
        {tag && (
          <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
            {tag}
          </span>
        )}
        {icon && <div className="mb-4 text-brand">{icon}</div>}
        {title && <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>}
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      <div className="relative z-10 mt-4">
        {children}
      </div>

      {/* Decorative gradient background on hover */}
      <div className="absolute inset-0 -z-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  )
}
