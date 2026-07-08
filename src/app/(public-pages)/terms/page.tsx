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

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      lastUpdated="MAY 2026"
      summary="The Linkgrow protocol is designed for elite creators. By deploying your workspace, you enter a professional pact of high-performance growth and mutual respect."
    >
      <Section title="The Nexus Pact" icon="lucide:handshake" index={0}>
        <p>
          Welcome to the high-velocity creator economy. By using Linkgrow, you agree to our performance standards and community protocols.
        </p>
      </Section>

      <Section title="Workspace Integrity" icon="lucide:layout" index={1}>
        <p>
          You are the architect of your digital presence. Keep your access keys secure and your templates optimized. Any activity within your nexus is your domain.
        </p>
      </Section>

      <Section title="Community Ethics" icon="lucide:users" index={2}>
        <p>
          We operate a zero-friction, zero-noise ecosystem. Prohibited activities include:
        </p>
        <ul className="space-y-4">
          <li className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <Icon icon="lucide:slash" className="h-6 w-6 text-red-500" />
            <span>Unsolicited automated spam or phishing campaigns.</span>
          </li>
          <li className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <Icon icon="lucide:slash" className="h-6 w-6 text-red-500" />
            <span>Distribution of restricted or illegal materials.</span>
          </li>
        </ul>
      </Section>

      <Section title="Growth Subscriptions" icon="lucide:credit-card" index={3}>
        <p>
          Performance tiers (Starter, Pro, Business) are billed on a recurring basis. Cancel or upgrade your capacity anytime via your dashboard. We prioritize billing transparency.
        </p>
      </Section>

      <Section title="System Limitations" icon="lucide:zap-off" index={4}>
        <p>
          We strive for 100% engine uptime, but services are provided "as is." We are not liable for external platform shifts or social media algorithm fluctuations.
        </p>
      </Section>
    </LegalShell>
  )
}
