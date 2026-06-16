'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { PricingCard } from '@/components/public/linkgrow/PricingCard'
import { PageShell } from '@/components/public/linkgrow/PageShell'
import { Button } from '@/components/public/ui/button'
import { Badge } from '@/components/public/ui/badge'
import { cn } from '@/lib/utils'
import { FAQ } from '@/components/public/home/FAQ'
import { CTA } from '@/components/public/home/CTA'

import { pricingPlans } from '@/mock/mock'

const comparisonFeatures = [
  { feature: 'Bio Pages', free: '1', starter: '5', pro: 'Unlimited', business: 'Unlimited' },
  { feature: 'WhatsApp Buttons', free: 'Basic', starter: 'Advanced', pro: 'Smart', business: 'Smart' },
  { feature: 'Custom Branding', free: '✗', starter: '✓', pro: '✓', business: '✓' },
  { feature: 'Lead Forms', free: '✗', starter: '✗', pro: '✓', business: '✓' },
  { feature: 'Analytics', free: 'Basic', starter: 'Basic', pro: 'Advanced', business: 'Advanced' },
  { feature: 'Custom Domain', free: '✗', starter: '✓', pro: '✓', business: '✓' },
  { feature: 'Team Seats', free: '✗', starter: '✗', pro: '✗', business: '5' },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute top-[-10%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-brand/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] -z-10 h-[700px] w-[700px] rounded-full bg-accent/10 blur-[150px] animate-pulse delay-1000" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.03]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl">
                <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                Pricing Architecture
              </div>

              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground leading-[0.85] mb-12">
                Pick your <br />
                <span className="text-gradient inline-block transform -skew-x-6">Plan.</span>
              </h1>

              <div className="max-w-2xl mx-auto mb-12">
                <p className="text-xl text-muted-foreground font-medium leading-tight">
                  Autonomous growth shouldn't be complicated. Select a tier <br className="hidden sm:block" />
                  that aligns with your current velocity.
                </p>
              </div>

              {/* Pricing Toggle */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white border border-slate-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] relative">
                  <button
                    onClick={() => setIsAnnual(false)}
                    className={cn(
                      "px-8 py-3 rounded-full text-sm font-black transition-all relative z-10",
                      !isAnnual ? "text-white" : "text-slate-500 hover:text-slate-900"
                    )}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setIsAnnual(true)}
                    className={cn(
                      "px-8 py-3 rounded-full text-sm font-black transition-all relative z-10 flex items-center gap-3",
                      isAnnual ? "text-white" : "text-slate-500 hover:text-slate-900"
                    )}
                  >
                    Annually
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-black",
                      isAnnual ? "bg-white/20 text-white" : "bg-brand/10 text-brand"
                    )}>
                      -20%
                    </span>
                  </button>
                  <motion.div
                    className="absolute inset-y-1.5 bg-slate-900 rounded-full shadow-2xl"
                    initial={false}
                    animate={{
                      x: isAnnual ? '100%' : '0%',
                      left: isAnnual ? '-2px' : '6px',
                      width: 'calc(50% - 4px)'
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {pricingPlans.map((plan, i) => (
          <PricingCard
            key={plan.name}
            {...plan}
            price={isAnnual ? plan.annualPrice : plan.monthlyPrice}
            index={i}
          />
        ))}
      </div>

      {/* Brands Section */}
      <div className="text-center mb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Trusted by 12,000+ creators globally</p>
        <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          {['HBO', 'Netflix', 'Shopify', 'Slack', 'Linear', 'Revolut'].map((brand) => (
            <span key={brand} className="text-4xl font-black text-slate-900 tracking-tighter">{brand}</span>
          ))}
        </div>
      </div>

      {/* True Growth Starts Here Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <Badge variant="outline" className="mb-6 rounded-full border-brand/20 bg-brand/5 px-4 py-1.5 text-brand">
              The Advantage
            </Badge>
            <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-7xl leading-[1.1] mb-8 uppercase">
              True growth <br />
              <span className="text-gradient">starts here.</span>
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {[
              { title: 'Autonomous Funnels', desc: 'Leads are captured and qualified while you sleep.', icon: 'lucide:zap' },
              { title: 'Smart Distribution', desc: 'Direct traffic to your most profitable channels instantly.', icon: 'lucide:share-2' },
              { title: 'Actionable Intel', desc: 'Deep-dive into conversion data that actually matters.', icon: 'lucide:trending-up' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-16 w-16 rounded-[1.5rem] bg-brand/10 text-brand flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <Icon icon={item.icon} className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl mb-6">Compare all features</h2>
            <p className="text-lg text-slate-500 font-medium">Find the perfect plan for your unique workflow.</p>
          </div>

          <div className="overflow-x-auto rounded-[3rem] border border-slate-100 shadow-2xl">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-8 text-sm font-black text-slate-400 uppercase tracking-widest">Features</th>
                  <th className="p-8 text-center text-sm font-black text-foreground uppercase tracking-widest">Free</th>
                  <th className="p-8 text-center text-sm font-black text-foreground uppercase tracking-widest">Starter</th>
                  <th className="p-8 text-center text-sm font-black text-brand uppercase tracking-widest">Pro</th>
                  <th className="p-8 text-center text-sm font-black text-foreground uppercase tracking-widest">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {comparisonFeatures.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-8 text-base font-bold text-foreground">{row.feature}</td>
                    <td className="p-8 text-center text-slate-500 font-bold">{row.free}</td>
                    <td className="p-8 text-center text-slate-500 font-bold">{row.starter}</td>
                    <td className="p-8 text-center text-brand font-black bg-brand/5">{row.pro}</td>
                    <td className="p-8 text-center text-slate-500 font-bold">{row.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] bg-brand/10 blur-[150px] rounded-full" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-12 flex justify-center">
            <div className="h-24 w-24 rounded-full border-4 border-brand/20 p-1">
              <img
                src="/images/avatar.svg"
                alt="Testimonial"
                className="h-full w-full rounded-full object-cover bg-white"
              />
            </div>
          </div>
          <Icon icon="lucide:quote" className="h-16 w-16 text-brand/20 mx-auto mb-8" />
          <h3 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-10">
            "I've recommended Linkgrow to other creators, it is very powerful for getting more eyes on your content."
          </h3>
          <div className="flex flex-col items-center">
            <span className="text-xl font-black text-brand tracking-tight mb-1">Alex Rivera</span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Digital Strategist</span>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl bg-brand rounded-[4rem] p-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-white max-w-2xl">
              <h2 className="text-4xl font-black mb-6 tracking-tight sm:text-6xl">Agency or Enterprise?</h2>
              <p className="text-xl text-white/80 font-medium leading-relaxed">
                Need a custom solution for high-volume lead management?
                We offer custom SLA, bulk accounts, and dedicated integration support.
              </p>
            </div>
            <Button className="bg-white text-brand hover:bg-slate-50 h-20 px-12 rounded-[2rem] text-xl font-black shadow-2xl transition-transform hover:scale-105">
              Contact Sales
              <Icon icon="lucide:mail" className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <CTA />
    </PageShell>
  )
}
