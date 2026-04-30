import { Icon } from '@iconify/react'
import { Card, CardContent } from '@/components/public/ui/card'

type FeatureCardProps = {
  number: string
  title: string
  description: string
  icon: string
  cardClassName: string
}

export function FeatureCard({ number, title, description, icon, cardClassName }: FeatureCardProps) {
  return (
    <Card className={`transition hover:-translate-y-1 hover:shadow-medium border-transparent ${cardClassName}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-muted-foreground">{number}</p>
          <Icon icon={icon} className="h-5 w-5 text-foreground" />
        </div>
        <h3 className="mt-3 text-xl font-bold leading-tight text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        <a href="#" className="mt-4 inline-block text-sm font-semibold text-foreground hover:text-forest-muted">
          Learn more...
        </a>
      </CardContent>
    </Card>
  )
}
