export interface Course {
    id: string
    title: string
    thumbnail: string
    price: number
    students: number
    status: 'published' | 'draft'
    rating: number
    lessonsCount: number
}

export interface AffiliateLink {
    id: string
    productName: string
    url: string
    commissionRate: string
    clicks: number
    conversions: number
    earnings: number
}

export interface Coupon {
    code: string
    discountType: 'percentage' | 'fixed'
    discountValue: number
    isActive: boolean
    usedCount: number
    maxUses?: number
}

export interface EarningStat {
    month: string
    sales: number
    tips: number
    affiliates: number
}

export const initialCourses: Course[] = [
    {
        id: 'course-1',
        title: 'Mastering Premium Tailwind CSS & UI Design',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&h=250&q=80',
        price: 49,
        students: 284,
        status: 'published',
        rating: 4.8,
        lessonsCount: 24
    },
    {
        id: 'course-2',
        title: 'Next.js 15 App Router & API Architecture Deep-Dive',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&h=250&q=80',
        price: 79,
        students: 112,
        status: 'published',
        rating: 4.9,
        lessonsCount: 36
    },
    {
        id: 'course-3',
        title: 'The Creator Blueprint: Monetize Your Audience',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&h=250&q=80',
        price: 99,
        students: 0,
        status: 'draft',
        rating: 0,
        lessonsCount: 15
    }
]

export const initialAffiliates: AffiliateLink[] = [
    {
        id: 'aff-1',
        productName: 'Hostinger Cloud Hosting',
        url: 'https://hostinger.com?referral=gouravvi',
        commissionRate: '20%',
        clicks: 840,
        conversions: 42,
        earnings: 504.0
    },
    {
        id: 'aff-2',
        productName: 'Vercel Pro Subscription',
        url: 'https://vercel.com/referred?by=gourav',
        commissionRate: '15%',
        clicks: 1420,
        conversions: 89,
        earnings: 400.5
    },
    {
        id: 'aff-3',
        productName: 'Framer Design Pro Plans',
        url: 'https://framer.com?via=gouravtech',
        commissionRate: '25%',
        clicks: 530,
        conversions: 18,
        earnings: 135.0
    }
]

export const initialCoupons: Coupon[] = [
    {
        code: 'LAUNCH30',
        discountType: 'percentage',
        discountValue: 30,
        isActive: true,
        usedCount: 84,
        maxUses: 200
    },
    {
        code: 'INSDIER5',
        discountType: 'fixed',
        discountValue: 5,
        isActive: true,
        usedCount: 23,
    },
    {
        code: 'EXPIRED100',
        discountType: 'percentage',
        discountValue: 100,
        isActive: false,
        usedCount: 10,
        maxUses: 10
    }
]

export const initialEarningStats: EarningStat[] = [
    { month: 'Jan', sales: 1200, tips: 150, affiliates: 340 },
    { month: 'Feb', sales: 1800, tips: 240, affiliates: 450 },
    { month: 'Mar', sales: 2400, tips: 190, affiliates: 600 },
    { month: 'Apr', sales: 3100, tips: 350, affiliates: 810 },
    { month: 'May', sales: 4200, tips: 420, affiliates: 980 },
    { month: 'Jun', sales: 5800, tips: 510, affiliates: 1039 }
]
export type CouponDiscountType = Coupon['discountType']
