'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Button } from '@/components/public/ui/button'

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div>
        <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">New Protocol.</h1>
        <p className="text-slate-500 font-medium">Re-establish your account security credentials.</p>
      </div>

      <div className="space-y-8">
        <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); setIsLoading(true); setTimeout(() => setIsLoading(false), 2000); }}>
          <div className="relative group">
            <input 
              type="password" 
              required
              className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
              placeholder="New Password"
            />
            <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
              New Password
            </label>
          </div>

          <div className="relative group">
            <input 
              type="password" 
              required
              className="peer w-full bg-transparent border-b-2 border-slate-100 py-3 font-bold text-lg focus:border-brand outline-none transition-all placeholder-transparent"
              placeholder="Confirm"
            />
            <label className="absolute left-0 top-3 text-lg font-bold text-slate-300 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-brand peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest font-black">
              Confirm Sequence
            </label>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full h-16 rounded-2xl bg-brand text-white hover:bg-brand/90 hover:scale-[1.02] active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-2xl shadow-brand/20">
            {isLoading ? 'Updating...' : 'Update Protocol'}
          </Button>
        </form>

        <div className="text-center">
          <Link href="/login" className="text-brand font-black text-[10px] uppercase tracking-[0.3em] hover:underline flex items-center justify-center gap-2">
            <Icon icon="lucide:arrow-left" className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
