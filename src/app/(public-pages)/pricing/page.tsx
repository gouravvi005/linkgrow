'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { PricingCard } from '@/components/landing/linkgrow/PricingCard'
import { Button } from '@/components/landing/ui/button'
import { Badge } from '@/components/landing/ui/badge'
import { cn } from '@/lib/utils'
import { FAQ } from '@/components/landing/home/FAQ'
import { CTA } from '@/components/landing/home/CTA'

import { pricingPlans, detailedFeatureComparison } from '@/mock/landing-mock'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({})

  const freePlan = pricingPlans.find(p => p.name === 'Free')
  const starterPlan = pricingPlans.find(p => p.name === 'Starter')
  const proPlan = pricingPlans.find(p => p.name === 'Pro')
  const premiumPlan = pricingPlans.find(p => p.name === 'Premium')

  const toggleFeature = (name: string) => {
    setExpandedFeatures(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 100 // Sticky header offset
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
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
                    }}
                    style={{
                      left: '6px',
                      width: 'calc(50% - 6px)'
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
            isAnnual={isAnnual}
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
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-4">All Features</h2>
            <p className="text-lg text-slate-500 font-medium">Compare detailed features across all plans.</p>
          </div>

          {/* Sticky Category Anchors Bar */}
          <div className="sticky top-20 bg-white/95 backdrop-blur-md z-30 py-4 border-y border-slate-100 mb-8 overflow-x-auto scrollbar-none">
            <div className="flex gap-2 min-w-max px-2">
              {detailedFeatureComparison.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-slate-50 hover:bg-brand hover:text-white border border-slate-200/60 transition-all"
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          {/* Main Features Accordion Grid */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-[148px] bg-slate-50/95 backdrop-blur-sm z-20 border-b border-slate-200 shadow-sm">
                <tr>
                  <th className="p-6 text-sm font-black text-slate-400 uppercase tracking-widest w-1/3">Features</th>
                  <th className="p-6 text-center border-l border-slate-200/60">
                    <div className="text-sm font-black text-slate-700 uppercase tracking-widest">{freePlan?.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold mt-1">₹{isAnnual ? freePlan?.annualPrice : freePlan?.monthlyPrice}</div>
                  </th>
                  <th className="p-6 text-center border-l border-slate-200/60">
                    <div className="text-sm font-black text-slate-700 uppercase tracking-widest">{starterPlan?.name}</div>
                    <div className="text-[10px] text-slate-500 font-bold mt-1">₹{isAnnual ? starterPlan?.annualPrice : starterPlan?.monthlyPrice}/mo</div>
                  </th>
                  <th className="p-6 text-center border-l border-slate-200/60 bg-brand/5">
                    <div className="text-sm font-black text-brand uppercase tracking-widest">{proPlan?.name}</div>
                    <div className="text-[10px] text-brand/80 font-bold mt-1">₹{isAnnual ? proPlan?.annualPrice : proPlan?.monthlyPrice}/mo</div>
                  </th>
                  <th className="p-6 text-center border-l border-slate-200/60">
                    <div className="text-sm font-black text-slate-700 uppercase tracking-widest">{premiumPlan?.name}</div>
                    <div className="text-[10px] text-slate-500 font-bold mt-1">₹{isAnnual ? premiumPlan?.annualPrice : premiumPlan?.monthlyPrice}/mo</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {detailedFeatureComparison.map((categoryGroup) => (
                  <React.Fragment key={categoryGroup.id}>
                    {/* Category Header Row */}
                    <tr id={categoryGroup.id} className="bg-slate-100/60 border-t border-slate-200 scroll-mt-40">
                      <td colSpan={5} className="px-6 py-4 text-xs font-black text-brand tracking-widest uppercase">
                        {categoryGroup.category}
                      </td>
                    </tr>

                    {/* Features Rows */}
                    {categoryGroup.features.map((feature, fIdx) => {
                      const isExpanded = !!expandedFeatures[feature.name];
                      return (
                        <React.Fragment key={fIdx}>
                          <tr className="hover:bg-slate-50/50 transition-colors group border-t border-slate-100">
                            {/* Feature Title Row with expand arrow */}
                            <td className="px-6 py-4 sticky left-0 bg-white group-hover:bg-slate-50/50 transition-colors">
                              <button
                                onClick={() => toggleFeature(feature.name)}
                                className="flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-brand transition-colors text-left w-full"
                              >
                                <div className="h-6 w-6 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center shrink-0">
                                  <Icon
                                    icon="lucide:chevron-down"
                                    className={cn("h-4 w-4 text-slate-400 transition-transform duration-300", isExpanded && "rotate-180")}
                                  />
                                </div>
                                {feature.name}
                              </button>
                            </td>

                            {/* Plan Availability Columns */}
                            <td className="px-6 py-4 text-center border-l border-slate-150 text-xs font-bold text-slate-500">
                              {feature.free === '✓' ? <Icon icon="lucide:check" className="h-5 w-5 mx-auto text-brand" /> : feature.free === '-' ? <Icon icon="lucide:x" className="h-4 w-4 mx-auto text-slate-300" /> : feature.free}
                            </td>
                            <td className="px-6 py-4 text-center border-l border-slate-150 text-xs font-bold text-slate-700">
                              {feature.starter === '✓' ? <Icon icon="lucide:check" className="h-5 w-5 mx-auto text-brand" /> : feature.starter === '-' ? <Icon icon="lucide:x" className="h-4 w-4 mx-auto text-slate-300" /> : feature.starter}
                            </td>
                            <td className="px-6 py-4 text-center border-l border-slate-200/60 bg-brand/[0.02] text-xs font-bold text-brand">
                              {feature.pro === '✓' ? <Icon icon="lucide:check" className="h-5 w-5 mx-auto text-brand" /> : feature.pro === '-' ? <Icon icon="lucide:x" className="h-4 w-4 mx-auto text-slate-300" /> : feature.pro}
                            </td>
                            <td className="px-6 py-4 text-center border-l border-slate-150 text-xs font-bold text-slate-700">
                              {feature.premium === '✓' ? <Icon icon="lucide:check" className="h-5 w-5 mx-auto text-brand" /> : feature.premium === '-' ? <Icon icon="lucide:x" className="h-4 w-4 mx-auto text-slate-300" /> : feature.premium}
                            </td>
                          </tr>

                          {/* Accordion Expand Description Row */}
                          {isExpanded && (
                            <tr className="bg-slate-50/50">
                              <td colSpan={5} className="px-6 py-4 border-l-4 border-brand bg-slate-50/40">
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-xs font-medium text-slate-500 max-w-4xl leading-relaxed"
                                >
                                  {feature.description}
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </React.Fragment>
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
    </>
  )
}
