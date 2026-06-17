import { Card, CardContent } from '@/components/landing/ui/card'

type ServiceCardProps = {
  number: string
  title: string
  description: string
  className: string
}

export function ServiceCard({ number, title, description, className }: ServiceCardProps) {
  return (
    <Card className={`transition hover:-translate-y-1 hover:shadow-medium border-transparent ${className}`}>
      <CardContent className="p-6">
        <p className="text-sm font-semibold text-muted-foreground">{number}</p>
        <h3 className="mt-3 text-xl font-bold leading-tight text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        <a href="#" className="mt-5 inline-block text-sm font-semibold text-foreground hover:text-forest-muted">
          Learn more...
        </a>
      </CardContent>
    </Card>
  )
}
