'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Button } from '@/components/public/ui/button'
import ContinueWithSocial from '@/components/public/linkgrow/ContinueWithSocial'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div>
        <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Build your empire.</h1>
        <p className="text-slate-500 font-medium">Create your high-performance growth account.</p>
      </div>

      <div className="space-y-8">
        <ContinueWithSocial />

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]"><span className="bg-white px-4 text-slate-300">New Protocol</span></div>
        </div>

        <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); setIsLoading(true); setTimeout(() => setIsLoading(false), 2000); }}>
          <div className="relative group">
            <input
              type="text"
              required
              className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
              placeholder="Name"
            />
            <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
              Full Name
            </label>
          </div>

          <div className="relative group">
            <input
              type="email"
              required
              className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
              placeholder="Email"
            />
            <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
              Corporate Email
            </label>
          </div>

          <div className="relative group">
            <input
              type="password"
              required
              className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
              placeholder="Password"
            />
            <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
              Create Password
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input type="checkbox" id="terms" className="mt-1 h-4 w-4 rounded border-slate-200 text-brand focus:ring-brand" required />
            <label htmlFor="terms" className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-relaxed">
              I agree to the <Link href="/terms" className="text-brand hover:underline">Nexus Protocol</Link> and <Link href="/privacy" className="text-brand hover:underline">Privacy Shield</Link>.
            </label>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full h-16 rounded-2xl bg-brand text-white hover:bg-brand/90 hover:scale-[1.02] active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-2xl shadow-brand/20">
            {isLoading ? 'Initializing...' : 'Deploy Account'}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
          Already active? <Link href="/login" className="text-brand hover:underline">Return to Nexus</Link>
        </p>
      </div>
    </div>
  )
}
