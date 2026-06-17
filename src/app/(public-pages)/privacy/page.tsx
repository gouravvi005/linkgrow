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

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      lastUpdated="MAY 2026"
      summary="We've replaced standard legal barriers with transparent protocols. Your growth is your business, your data is your identity. We guard both with absolute intensity."
    >
      <Section title="Our Privacy Promise" icon="lucide:shield-check" index={0}>
        <p>
          Privacy isn't a legal hurdle—it's a high-performance feature. We architect Linkgrow to ensure your community remains your community.
        </p>
      </Section>

      <Section title="Data Architecture" icon="lucide:database" index={1}>
        <p>
          We only capture high-velocity growth signals. Your identity, your platform links, and your capture intelligence. No excess, no leakage.
        </p>
        <ul className="grid sm:grid-cols-2 gap-4">
          <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="h-2 w-2 rounded-full bg-brand" />
            <span>Encrypted Identity</span>
          </li>
          <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="h-2 w-2 rounded-full bg-brand" />
            <span>Nexus Attribution</span>
          </li>
        </ul>
      </Section>

      <Section title="Global Protection" icon="lucide:globe" index={2}>
        <p>
          All data is shielded by <strong>AES-256 bank-grade encryption</strong> and deployed across distributed edge nodes for maximum security and zero latency.
        </p>
      </Section>

      <Section title="Zero External Access" icon="lucide:lock" index={3}>
        <p>
          We do not trade, sell, or leak your audience metrics. Our revenue comes from your success, not from selling your creator secrets.
        </p>
      </Section>

      <Section title="Full Sovereignty" icon="lucide:user-check" index={4}>
        <p>
          You retain 100% control. Export your leads in one click. Update your profile instantly. Delete your entire digital footprint whenever you choose.
        </p>
      </Section>
    </LegalShell>
  )
}
