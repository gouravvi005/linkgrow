'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Button } from '@/components/public/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'

import { navLinks } from '@/mock/mock'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "py-4"
          : "py-8"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className={cn(
          "mx-auto flex items-center justify-between transition-all duration-500 rounded-[2rem]",
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1)] px-8 py-3"
            : "bg-transparent px-0 py-0"
        )}>
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-bold text-muted-foreground transition-all hover:text-foreground relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand scale-x-0 transition-transform group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-bold text-foreground hover:text-brand transition-colors mr-2">
              Login
            </Link>
            <Button
              href="/signup"
              className="group relative rounded-full px-8 h-11 text-sm font-black overflow-hidden shadow-lg shadow-brand/20 transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <Icon icon="lucide:zap" className="h-4 w-4 fill-current group-hover:animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Button>

            <button
              className={cn(
                "md:hidden p-2 rounded-xl transition-colors",
                isScrolled ? "hover:bg-slate-50" : "hover:bg-white/10"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon icon={mobileMenuOpen ? "lucide:x" : "lucide:menu"} className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-[calc(100%+1rem)] inset-x-4 z-40 md:hidden"
          >
            <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-100 p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 -z-0 h-32 w-32 bg-brand/5 blur-3xl rounded-full" />

              <nav className="flex flex-col gap-4 relative z-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-black text-foreground hover:text-brand transition-colors flex items-center justify-between group"
                  >
                    {link.label}
                    <Icon icon="lucide:arrow-right" className="h-6 w-6 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                ))}
                <div className="h-px bg-slate-100 my-4" />
                <div className="flex flex-col gap-4">
                  <Button href="/login" variant="outline" className="w-full py-7 rounded-2xl text-lg font-bold">Login</Button>
                  <Button href="/signup" className="w-full py-7 rounded-2xl text-lg font-black shadow-xl shadow-brand/20">Get Started</Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
