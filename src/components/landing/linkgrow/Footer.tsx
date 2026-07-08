'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Button } from '@/components/landing/ui/button'
import { Logo } from './Logo'

import { footerLinks } from '@/mock/landing-mock'

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-brand/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.02]" />

      <div className="mx-auto w-full max-w-7xl relative z-10">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-12 mb-24">
          <div className="lg:col-span-4 space-y-8">
            <Logo />
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              Empowering the next generation of creators with 
              autonomous growth tools and high-performance link architectures.
            </p>
            <div className="flex gap-4">
              {['instagram', 'twitter', 'linkedin', 'youtube'].map((social) => (
                <Link 
                  key={social} 
                  href={`#${social}`}
                  className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 transition-all hover:bg-brand hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-brand/20"
                >
                  <Icon icon={`simple-icons:${social}`} className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="font-black text-foreground mb-8 uppercase tracking-[0.2em] text-[10px]">Product</h4>
              <ul className="space-y-4">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground font-bold hover:text-brand transition-colors flex items-center gap-2 group">
                      {link.label}
                      <Icon icon="lucide:arrow-right" className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black text-foreground mb-8 uppercase tracking-[0.2em] text-[10px]">Resources</h4>
              <ul className="space-y-4">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground font-bold hover:text-brand transition-colors flex items-center gap-2 group">
                      {link.label}
                      <Icon icon="lucide:arrow-right" className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-black text-foreground mb-8 uppercase tracking-[0.2em] text-[10px]">Stay in the Loop</h4>
              <p className="text-sm text-muted-foreground mb-6 font-medium">Join 20k+ creators getting our weekly growth tips.</p>
              <form className="space-y-3">
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 focus:bg-white transition-all"
                  />
                </div>
                <Button type="submit" className="w-full rounded-2xl py-4 h-auto font-black shadow-lg shadow-brand/10">
                  Join Newsletter
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-400 font-bold">
            © {new Date().getFullYear()} Linkgrow Inc. Made with ❤️ for Creators.
          </p>
          <div className="flex items-center gap-8 text-sm text-slate-400 font-bold">
            {footerLinks.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-brand transition-colors">
                {link.label.split(' ')[0]}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
            <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
