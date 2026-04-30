export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  image: string
  readTime: string
  date: string
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'instagram-bio-to-whatsapp-leads',
    title: 'Turn Your Instagram Bio Into a WhatsApp Lead Funnel',
    excerpt: 'Learn the exact Linkgrow setup top businesses use to convert profile visitors into direct WhatsApp conversations.',
    image: 'https://picsum.photos/seed/Linkgrow-blog-1/900/600',
    readTime: '6 min read',
    date: 'Apr 2, 2026',
    content: [
      'Your bio link should do more than list links. It should move visitors toward one clear action.',
      'With Linkgrow, each page block is designed to increase trust and reduce friction before the WhatsApp click.',
      'Use pre-filled messages to qualify intent fast, then route leads to your team in real time.',
    ],
  },
  {
    slug: 'whatsapp-lead-forms-best-practices',
    title: 'WhatsApp Lead Forms: 7 Best Practices for Higher Conversions',
    excerpt: 'From form length to CTA copy, here are practical improvements that increase completed leads.',
    image: 'https://picsum.photos/seed/Linkgrow-blog-2/900/600',
    readTime: '5 min read',
    date: 'Mar 27, 2026',
    content: [
      'Keep forms short. Name, phone, and one qualifying field is often enough.',
      'Use benefit-led labels and reassure users with quick response promises.',
      'Sync submissions instantly to WhatsApp so your response time stays under five minutes.',
    ],
  },
  {
    slug: 'restaurant-whatsapp-marketing-playbook',
    title: 'Restaurant WhatsApp Marketing Playbook with Linkgrow',
    excerpt: 'A practical approach for restaurants to capture reservations, catering inquiries, and repeat orders.',
    image: 'https://picsum.photos/seed/Linkgrow-blog-3/900/600',
    readTime: '7 min read',
    date: 'Mar 18, 2026',
    content: [
      'Create separate CTA sections for reservations, events, and delivery.',
      'Use weekly offers in your bio page and attach pre-filled WhatsApp messages.',
      'Measure clicks and lead quality so you can scale what performs best.',
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
