import { Icon } from '@iconify/react'
import { SectionReveal } from './SectionReveal'
import { Button } from '../ui/button'

export function FinalCard() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-500 px-4 py-20 sm:px-6 lg:px-8">
      <SectionReveal className="mx-auto w-full max-w-4xl text-center text-white">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              Ready to Turn Your Bio Link Into a Lead Engine?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-green-100">
              Join 10,000+ businesses already converting social media visitors into WhatsApp leads. Start free today.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button href="/signup" variant='forest'>
              Start Your Free Trial
              <Icon icon="lucide:arrow-up-right" className="h-5 w-5" />
            </Button>
            <p className="text-green-200 text-sm sm:text-base">
              No credit card • 14-day free trial • Cancel anytime
            </p>
          </div>
          <div className="flex justify-center items-center gap-8 text-green-200">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle-2" className="h-5 w-5" />
              Setup in 5 minutes
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle-2" className="h-5 w-5" />
              24/7 support
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle-2" className="h-5 w-5" />
              Money-back guarantee
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
