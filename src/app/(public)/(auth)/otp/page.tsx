'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Button } from '@/components/public/ui/button'

export default function OTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1]
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div>
        <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Nexus Verify.</h1>
        <p className="text-slate-500 font-medium">Enter the 6-digit sequence dispatched to you.</p>
      </div>

      <div className="space-y-10">
        <div className="flex justify-between gap-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-16 sm:w-14 sm:h-20 text-center text-3xl font-black bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-brand focus:bg-white focus:ring-0 outline-none transition-all"
            />
          ))}
        </div>

        <div className="space-y-6">
          <Button
            onClick={() => { setIsLoading(true); setTimeout(() => setIsLoading(false), 2000); }}
            className="w-full h-16 rounded-2xl bg-brand text-white hover:bg-brand/90 hover:scale-[1.02] active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-2xl shadow-brand/20"
          >
            {isLoading ? 'Verifying...' : 'Authorize Sequence'}
          </Button>

          <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest">
            No sequence received? <button className="text-brand hover:underline">Re-Dispatch</button>
          </p>
        </div>

        <div className="text-center">
          <Link href="/login" className="text-brand font-black text-[10px] uppercase tracking-[0.3em] hover:underline flex items-center justify-center gap-2">
            <Icon icon="lucide:arrow-left" className="h-4 w-4" />
            Abort & Return
          </Link>
        </div>
      </div>
    </div>
  )
}
