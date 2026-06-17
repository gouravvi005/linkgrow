import type { Metadata } from 'next'
import { SocialProof } from '@/components/landing/home/SocialProof'
import { Features } from '@/components/landing/home/Features'
import { Problems } from '@/components/landing/home/Problems'
import { Workflow } from '@/components/landing/home/Workflow'
import { Integrations } from '@/components/landing/home/Integrations'
import { FAQ } from '@/components/landing/home/FAQ'
import { CTA } from '@/components/landing/home/CTA'
import { Hero } from '@/components/landing/home/Hero'

export const metadata: Metadata = {
  title: 'Linkgrow | All-in-One Creator Growth Platform',
  description: 'Smart link-in-bio, WhatsApp automation, and analytics for creators. Scale your audience and turn followers into customers.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <Problems />
      <Workflow />
      <Integrations />
      <FAQ />
      <CTA />
    </>
  )
}
