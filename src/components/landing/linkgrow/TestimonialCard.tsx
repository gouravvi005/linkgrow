import Image from 'next/image'
import { Card, CardContent } from '@/components/landing/ui/card'

type TestimonialCardProps = {
  name: string
  business: string
  quote: string
  image: string
}

export function TestimonialCard({ name, business, quote, image }: TestimonialCardProps) {
  return (
    <Card className="bg-white border-transparent">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          {/* <Image src={image} alt={name} width={52} height={52} className="h-12 w-12 rounded-full object-cover" /> */}
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-xs text-muted-foreground">{business}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-foreground/80">&quot;{quote}&quot;</p>
      </CardContent>
    </Card>
  )
}
