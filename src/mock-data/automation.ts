export interface WhatsappTemplate {
    id: string
    name: string
    trigger: string
    message: string
    isActive: boolean
    sentCount: number
    readCount: number
}

export interface AutoReplyRule {
    id: string
    keyword: string
    platform: 'instagram' | 'twitter' | 'facebook'
    response: string
    isActive: boolean
    triggerCount: number
}

export interface AutoCommentRule {
    id: string
    postUrl?: string
    triggerKeyword: string
    response: string
    isActive: boolean
    commentCount: number
}

export interface ScheduledPost {
    id: string
    platform: 'instagram' | 'youtube' | 'linkedin' | 'twitter' | 'tiktok'
    content: string
    scheduledAt: string // ISO date string
    status: 'scheduled' | 'posted' | 'failed'
    mediaUrl?: string
}

export const initialWhatsappTemplates: WhatsappTemplate[] = [
    {
        id: 'wa-1',
        name: 'Welcome Lead Guide',
        trigger: 'New lead joins Email Collection',
        message: 'Hey {{name}}! Thanks for joining my insider circle. Here is your free guide: https://linkgrow.io/gouravvi/guide',
        isActive: true,
        sentCount: 142,
        readCount: 128
    },
    {
        id: 'wa-2',
        name: 'Course Purchase confirmation',
        trigger: 'Course purchased successfully',
        message: 'Hi {{name}}! Welcome to the course. Access your dashboard here: https://linkgrow.io/dashboard/courses',
        isActive: true,
        sentCount: 38,
        readCount: 37
    }
]

export const initialAutoReplies: AutoReplyRule[] = [
    {
        id: 'reply-1',
        keyword: 'GUIDE',
        platform: 'instagram',
        response: 'Hey there! Thanks for asking. Here is the link to my complete frontend development ebook: https://linkgrow.io/gouravvi/ebook 🚀',
        isActive: true,
        triggerCount: 843
    },
    {
        id: 'reply-2',
        keyword: 'NEXTJS',
        platform: 'instagram',
        response: 'Awesome! My Next.js custom boilerplate repository can be downloaded here: https://github.com/gouravvi/nextjs-boilerplate',
        isActive: true,
        triggerCount: 290
    }
]

export const initialAutoComments: AutoCommentRule[] = [
    {
        id: 'comment-1',
        triggerKeyword: 'templates',
        response: 'Sent the template links directly to your DM! Let me know if you need any help.',
        isActive: true,
        commentCount: 142
    },
    {
        id: 'comment-2',
        triggerKeyword: 'pricing',
        response: 'You can check our full comparison plans here: linkgrow.io/pricing',
        isActive: false,
        commentCount: 0
    }
]

export const initialScheduledPosts: ScheduledPost[] = [
    {
        id: 'post-1',
        platform: 'instagram',
        content: '5 Frontend Design Tricks for 2026 to make your websites pop! 🎨 #css #webdesign #frontend',
        scheduledAt: '2026-06-21T10:00:00.000Z',
        status: 'scheduled',
        mediaUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
        id: 'post-2',
        platform: 'twitter',
        content: 'Why Tailwind CSS v4 is a game changer for build pipelines and developer experience. A quick thread 🧵👇',
        scheduledAt: '2026-06-22T14:30:00.000Z',
        status: 'scheduled'
    },
    {
        id: 'post-3',
        platform: 'linkedin',
        content: 'Reflecting on building LinkGrow: scaling to thousands of visitors and optimizing Next.js Core Web Vitals for maximum performance. Read the article!',
        scheduledAt: '2026-06-24T09:00:00.000Z',
        status: 'scheduled'
    },
    {
        id: 'post-4',
        platform: 'youtube',
        content: 'Mastering Next.js Server Actions & Suspense in 10 minutes!',
        scheduledAt: '2026-06-18T18:00:00.000Z',
        status: 'posted'
    }
]
export type PostPlatformType = ScheduledPost['platform']
