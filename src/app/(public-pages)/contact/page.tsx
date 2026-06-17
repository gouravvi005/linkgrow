'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Badge } from '@/components/landing/ui/badge'
import { Button } from '@/components/landing/ui/button'
import { CTA } from '@/components/landing/home/CTA'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-brand/5 blur-[120px] animate-pulse" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.03]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 rounded-full border-brand/20 bg-brand/5 px-4 py-1.5 text-brand">
              Get in Touch
            </Badge>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground leading-[1.1] mb-8">
              Let's grow <br />
              <span className="text-gradient">together.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Content - Floating Conversational Style */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Main Form Area */}
            <div className="flex-1 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="bg-white border border-slate-100 rounded-[4rem] p-10 lg:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-brand" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                  <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
                    Start a <br />
                    <span className="text-gradient">conversation.</span>
                  </h2>
                </div>

                <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="relative group">
                      <input
                        type="text"
                        required
                        className="peer w-full bg-transparent border-b-2 border-slate-100 py-4 font-bold text-xl focus:border-brand outline-none transition-all placeholder-transparent"
                        placeholder="Name"
                        id="name"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 top-4 text-xl font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm"
                      >
                        What's your name?
                      </label>
                    </div>
                    <div className="relative group">
                      <input
                        type="email"
                        required
                        className="peer w-full bg-transparent border-b-2 border-slate-100 py-4 font-bold text-xl focus:border-brand outline-none transition-all placeholder-transparent"
                        placeholder="Email"
                        id="email"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 top-4 text-xl font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm"
                      >
                        And your email?
                      </label>
                    </div>
                  </div>

                  <div className="relative group">
                    <select
                      id="source"
                      required
                      className="peer w-full bg-transparent border-b-2 border-slate-100 py-4 font-bold text-xl focus:border-brand outline-none transition-all appearance-none text-slate-300 focus:text-foreground"
                    >
                      <option value="" disabled selected>Where did you find us?</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter / X</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="youtube">YouTube</option>
                      <option value="referral">Friend / Referral</option>
                      <option value="other">Other</option>
                    </select>
                    <Icon icon="lucide:chevron-down" className="absolute right-0 top-6 h-6 w-6 text-slate-300 pointer-events-none group-focus-within:rotate-180 transition-transform" />
                    <label
                      htmlFor="source"
                      className="absolute left-0 -top-6 text-sm font-black text-brand uppercase tracking-widest"
                    >
                      Discovery Source
                    </label>
                  </div>

                  <div className="relative group">
                    <textarea
                      rows={1}
                      required
                      className="peer w-full bg-transparent border-b-2 border-slate-100 py-4 font-bold text-xl focus:border-brand outline-none transition-all resize-none min-h-[100px] placeholder-transparent"
                      placeholder="Message"
                      id="message"
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="absolute left-0 top-4 text-xl font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm"
                    >
                      How can we help you grow?
                    </label>
                  </div>

                  <Button className="h-20 px-16 rounded-full bg-slate-900 text-white hover:bg-brand hover:scale-105 transition-all text-xl font-black shadow-2xl">
                    Push to Connect
                    <Icon icon="lucide:arrow-up-right" className="ml-2 h-6 w-6" />
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Support Sidebar */}
            <div className="lg:w-96 w-full space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-slate-950 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 h-40 w-40 bg-brand/10 blur-[60px]" />
                <h3 className="text-2xl font-black mb-6 tracking-tight">Instant Access</h3>
                <p className="text-white/60 font-bold mb-10 leading-relaxed">Prefer real-time chat? Connect directly with our team via WhatsApp.</p>
                <Button className="w-full h-16 rounded-2xl bg-brand text-white hover:bg-brand/90 font-black text-lg shadow-lg shadow-brand/20 transition-transform active:scale-95">
                  Open WhatsApp
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-slate-50 border border-slate-100 rounded-[3rem] p-10"
              >
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8">Follow Our Journey</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Instagram', 'Twitter', 'LinkedIn', 'YouTube'].map((social) => (
                    <button key={social} className="h-12 rounded-xl bg-white border border-slate-100 text-sm font-black text-slate-600 hover:border-brand hover:text-brand transition-all flex items-center justify-center gap-2">
                      <Icon icon={`simple-icons:${social.toLowerCase()}`} />
                      {social}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQ Section */}
      <section className="py-24 bg-slate-50/50 relative overflow-hidden border-y border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground mb-4">Quick Answers</h2>
            <p className="text-lg text-slate-500 font-medium">Common questions people ask before contacting us.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'How fast can I set up my page?', a: 'You can have your first high-performance bio page live in under 5 minutes. No code, no complex settings.' },
              { q: 'Is there hidden pricing?', a: 'Absolutely not. What you see is what you pay. No setup fees, no per-lead charges, ever.' },
              { q: 'Can I switch plans later?', a: 'Yes, you can upgrade or downgrade your plan at any time through your dashboard. No questions asked.' }
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-8">
                  <h3 className="text-xl font-black text-brand mb-4 tracking-tight">{faq.q}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
            <div className="text-center pt-8">
              <Link href="/faq" className="text-brand font-black text-sm uppercase tracking-widest hover:underline inline-flex items-center gap-2">
                View all FAQs <Icon icon="lucide:arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
