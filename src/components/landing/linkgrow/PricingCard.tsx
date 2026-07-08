'use client'

import { Icon } from '@iconify/react'
import { Button } from '@/components/landing/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

type FeatureItem = {
  title: string
  description?: string
}

type FeatureGroup = {
  title?: string
  subtitle?: string
  badge?: string
  items: FeatureItem[]
}

type PricingCardProps = {
  name: string
  monthlyPrice: number
  annualPrice: number
  description: string
  buttonText: string
  featureGroups: FeatureGroup[]
  recommended?: boolean
  isAnnual: boolean
  index: number
}

const getIconForTitle = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('unlimited links')) return 'lucide:link';
  if (t.includes('redirect')) return 'lucide:arrow-right-left';
  if (t.includes('social icons')) return 'lucide:globe';
  if (t.includes('custom themes') || t.includes('personalized')) return 'lucide:palette';
  if (t.includes('analytics')) return 'lucide:bar-chart-3';
  if (t.includes('seo')) return 'lucide:search';
  if (t.includes('qr code')) return 'lucide:qr-code';
  if (t.includes('shops')) return 'lucide:shopping-bag';
  if (t.includes('digital products')) return 'lucide:book-open';
  if (t.includes('audience')) return 'lucide:users';
  if (t.includes('seller fees') || t.includes('commissions')) return 'lucide:dollar-sign';
  if (t.includes('onboarding')) return 'lucide:shield-check';
  if (t.includes('replies') || t.includes('reply') || t.includes('whatsapp') || t.includes('instagram')) return 'lucide:message-circle';
  if (t.includes('shortener')) return 'lucide:scissors';
  if (t.includes('integrations')) return 'lucide:mail';
  if (t.includes('social posts')) return 'lucide:share-2';
  if (t.includes('team tools')) return 'lucide:users';
  return 'lucide:check';
};

export function PricingCard({
  name,
  monthlyPrice,
  annualPrice,
  description,
  buttonText,
  featureGroups,
  recommended,
  isAnnual,
  index
}: PricingCardProps) {
  const mainPrice = isAnnual ? annualPrice : monthlyPrice;
  const isPro = name === 'Pro';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        "relative flex flex-col p-6 sm:p-8 rounded-[2rem] transition-all duration-700 group",
        isPro
          ? "bg-slate-950 text-white shadow-[0_0_80px_-20px_rgba(34,197,94,0.3)] scale-105 z-10 border border-brand/50"
          : "bg-white border border-slate-100 hover:border-brand/20 hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.05)]"
      )}
    >
      {recommended && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_20px_40px_-10px_rgba(34,197,94,0.5)]">
          Recommended
        </div>
      )}

      {/* Header */}
      <div className="mb-6 mt-2">
        <h3 className={cn(
          "text-3xl font-black tracking-tight mb-2",
          isPro ? "text-white" : "text-foreground"
        )}>
          {name}
        </h3>
        <p className={cn(
          "text-sm font-medium leading-tight min-h-[40px]",
          isPro ? "text-slate-400" : "text-slate-500"
        )}>
          {description}
        </p>
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className={cn(
            "text-4xl font-black tracking-tight",
            isPro ? "text-white" : "text-foreground"
          )}>
            ₹{mainPrice}
          </span>
          {mainPrice > 0 && (
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider",
              isPro ? "text-slate-500" : "text-slate-400"
            )}>
              INR/mo
            </span>
          )}
        </div>
        <p className={cn(
          "text-xs font-semibold mt-1",
          isPro ? "text-slate-500" : "text-slate-500"
        )}>
          {mainPrice === 0 ? (
            "Free, forever"
          ) : isAnnual ? (
            `Billed annually, or ₹${monthlyPrice} monthly`
          ) : (
            `Billed monthly, or save with annual billing`
          )}
        </p>
      </div>

      {/* Action Button */}
      <div className="mb-8">
        <Button
          className={cn(
            "w-full h-14 rounded-full text-sm font-black transition-all duration-300 border-2",
            isPro
              ? "bg-brand text-white border-brand hover:opacity-90 shadow-[0_25px_50px_-12px_rgba(34,197,94,0.5)]"
              : "bg-white text-slate-900 border-slate-200 hover:border-brand hover:text-brand hover:bg-slate-50/50"
          )}
        >
          {buttonText}
        </Button>
      </div>

      {/* Features List */}
      <div className="space-y-6 flex-1">
        {featureGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-3">
            {group.title && (
              <h4 className={cn(
                "text-xs font-black uppercase tracking-wider",
                isPro ? "text-white" : "text-slate-900"
              )}>
                {group.title}
              </h4>
            )}

            <div className="space-y-4">
              {group.subtitle && (
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs font-black uppercase tracking-wider opacity-60",
                    isPro ? "text-slate-400" : "text-slate-500"
                  )}>
                    {group.subtitle}
                  </span>
                  {group.badge && (
                    <span className="px-1.5 py-0.5 bg-brand/20 text-brand text-[9px] font-black uppercase rounded-md scale-90">
                      {group.badge}
                    </span>
                  )}
                </div>
              )}

              {group.items.map((item, iIdx) => (
                <div key={iIdx} className="flex items-start gap-3 group/item">
                  <div className={cn(
                    "h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    isPro ? "text-brand" : "text-slate-400 group-hover/item:text-brand"
                  )}>
                    <Icon icon={getIconForTitle(item.title)} className="h-4 w-4" />
                  </div>
                  <div>
                    <span className={cn(
                      "text-xs font-black",
                      isPro ? "text-slate-200" : "text-slate-900"
                    )}>
                      {item.title}
                    </span>
                    {item.description && (
                      <p className={cn(
                        "text-[11px] font-semibold leading-relaxed mt-0.5 pr-2",
                        isPro ? "text-slate-400/80" : "text-slate-500"
                      )}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
