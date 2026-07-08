'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Badge } from '@/components/landing/ui/badge'

import { homeWorkflowSteps as steps } from '@/mock/landing-mock'

export function Workflow() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <Badge variant="outline" className="mb-6 rounded-full border-brand/20 bg-brand/5 px-4 py-1.5 text-brand">
            The Blueprint
          </Badge>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-foreground mb-8">
            From zero to viral <br />
            in <span className="text-gradient">4 steps.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Decorative Path Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-50 -translate-y-1/2 hidden lg:block -z-10" />

          <div className="grid gap-12 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative group text-center"
              >
                <div className="relative mx-auto mb-10 h-32 w-32 flex items-center justify-center">
                  {/* Spinning Background Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 group-hover:border-brand/50 transition-colors"
                  />

                  {/* Main Icon Container */}
                  <div className={`h-24 w-24 rounded-[2rem] ${step.color} text-white flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500`}>
                    <Icon icon={step.icon} className="h-10 w-10" />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm border-4 border-white shadow-xl">
                    {i + 1}
                  </div>
                </div>

                <div className="px-4">
                  <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-tight">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connector */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden h-12 w-1 bg-slate-50 mx-auto mt-6" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

