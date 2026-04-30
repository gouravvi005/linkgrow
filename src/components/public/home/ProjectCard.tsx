import Image from 'next/image'
import { Icon } from '@iconify/react'
import { Button } from '@/components/public/ui/button'
import { Card, CardContent } from '@/components/public/ui/card'

type ProjectCardProps = {
  title: string
  tag: string
  description: string
  image: string
}

export function ProjectCard({ title, tag, description, image }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-forest text-white transition hover:-translate-y-1 border-transparent">
      <CardContent className="p-4">
        {/* <Image src={image} alt={title} width={600} height={300} className="h-36 w-full rounded-2xl object-cover" /> */}
        <div className="mt-4">
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-forest-foreground-muted">
            {tag}
          </span>
          <h3 className="mt-3 text-lg font-bold">{title}</h3>
          <p className="mt-2 text-sm text-forest-foreground-muted">{description}</p>
          <Button
            type="button"
            size="sm"
            className="mt-4"
            variant="brand"
          >
            View Case Study
            <Icon icon="lucide:arrow-up-right" className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
