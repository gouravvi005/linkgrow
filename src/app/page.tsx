import type { Metadata } from 'next'
import { PageShell } from '@/components/public/linkgrow/PageShell'
import { SocialProof } from '@/components/public/home/SocialProof'
import { Features } from '@/components/public/home/Features'
import { Problems } from '@/components/public/home/Problems'
import { Workflow } from '@/components/public/home/Workflow'
import { Integrations } from '@/components/public/home/Integrations'
import { FAQ } from '@/components/public/home/FAQ'
import { CTA } from '@/components/public/home/CTA'
import { Hero } from '@/components/public/home/Hero'

export const metadata: Metadata = {
  title: 'Linkgrow | All-in-One Creator Growth Platform',
  description: 'Smart link-in-bio, WhatsApp automation, and analytics for creators. Scale your audience and turn followers into customers.',
}

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <SocialProof />
      <Features />
      <Problems />
      <Workflow />
      <Integrations />
      <FAQ />
      <CTA />
    </PageShell>
  )
}
