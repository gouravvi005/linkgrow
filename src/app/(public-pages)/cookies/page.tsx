'use client'

import { LegalShell } from '@/components/landing/linkgrow/LegalShell'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

function Section({ title, icon, children, index }: { title: string, icon: string, children: React.ReactNode, index: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white border border-slate-100 p-12 sm:p-16 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-brand/20 transition-all group overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-2 h-full bg-brand/10 group-hover:bg-brand transition-colors" />

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="h-14 w-14 rounded-2xl bg-brand/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
          <Icon icon={icon} className="h-7 w-7 text-brand" />
        </div>
        <div className="space-y-3 flex-1">
          <h2 className="text-2xl font-black text-foreground tracking-tighter leading-none group-hover:text-brand transition-colors">{title}</h2>
          <div className="text-base text-slate-500 font-medium leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default function CookiesPage() {
  return (
    <LegalShell
      title="Cookie Policy"
      lastUpdated="MAY 2026"
      summary="Our cookies aren't trackers—they're engine components. We use them to keep your dashboard fast, your session secure, and your growth insights accurate."
    >
      <Section title="Engine Intelligence" icon="lucide:cookie" index={0}>
        <p>
          We use smart session tech to remember your identity and preferences. This ensures your Linkgrow experience remains fluid and personalized.
        </p>
      </Section>

      <Section title="Nexus Protocols" icon="lucide:layers" index={1}>
        <p>
          Cookies power four critical functions in our high-performance architecture:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
            <h3 className="text-xl font-black text-foreground">Secure Auth</h3>
            <p className="text-sm">Keeping you safely logged into your creator command center.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
            <h3 className="text-xl font-black text-foreground">User Stylometry</h3>
            <p className="text-sm">Remembering your custom themes, layouts, and workspace configurations.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
            <h3 className="text-xl font-black text-foreground">Traffic Analysis</h3>
            <p className="text-sm">Gaining high-level insights into how creators interact with our engine.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
            <h3 className="text-xl font-black text-foreground">Campaign Logic</h3>
            <p className="text-sm">Measuring the effectiveness of our own community growth efforts.</p>
          </div>
        </div>
      </Section>

      <Section title="External Signals" icon="lucide:signal" index={2}>
        <p>
          We partner with <strong>Google Analytics</strong> and <strong>Meta Pixel</strong> to monitor ecosystem health. They may set cookies to track usage, but your personal identity is never shared.
        </p>
      </Section>

      <Section title="Total Control" icon="lucide:sliders-horizontal" index={3}>
        <p>
          You command your browser. You can block or flush cookies via your settings. Note that disabling essential cookies will degrade your Linkgrow dashboard's performance.
        </p>
      </Section>
    </LegalShell>
  )
}
