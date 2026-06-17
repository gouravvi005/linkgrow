'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { impactStats } from '@/mock/landing-mock'
import { Logo } from '@/components/landing/linkgrow/Logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-poppins min-h-screen bg-white flex overflow-hidden">
      {/* Left Section: Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-32 relative z-10 bg-white shadow-2xl">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-12">
            <Logo />
          </div>
          {children}
        </div>
      </div>

      {/* Right Section: Impact Visualization */}
      <div className="hidden lg:block relative w-0 flex-1 bg-slate-950 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(circle_at_70%_20%,rgba(34,197,94,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />

        <div className="h-full flex flex-col justify-center px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl font-black text-white leading-tight mb-8 tracking-tighter">
              Scale your <br />
              <span className="text-brand">Digital Empire.</span>
            </h2>
            <p className="text-xl text-white/50 font-medium max-w-lg mb-16 leading-relaxed">
              Join the high-velocity creator ecosystem where every link is a lead and every click is an opportunity.
            </p>

            <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-16">
              {impactStats.slice(0, 4).map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black text-brand uppercase tracking-[0.3em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -bottom-20 -right-20 h-96 w-96 bg-brand/10 blur-[100px] rounded-full" />
      </div>
    </div>
  )
}
