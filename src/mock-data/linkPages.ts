export interface BioLink {
    id: string
    type: 'standard' | 'header' | 'embed' | 'email_collect' | 'calendar' | 'product' | 'blog' | 'whatsapp_automation'
    title: string
    url?: string
    icon?: string
    isActive: boolean
    clicks: number
    embedUrl?: string
    config?: Record<string, any>
    price?: number
    description?: string
    image?: string
    cardStyle?: 'default' | 'image_overlay' | 'news_row' | 'music'
}

export interface SocialLink {
    platform: 'instagram' | 'youtube' | 'linkedin' | 'twitter' | 'tiktok' | 'facebook' | 'github'
    url: string
    isActive: boolean
}

export interface BioSection {
    id: string
    title: string
    items: BioLink[]
    layout?: 'list' | 'grid' | 'grid3' | 'horizontal' | 'featured' | 'pills'
}

export interface BioLinkPage {
    id: string
    title: string
    url: string
    themeId: string
    avatar: string
    bio: string
    status: 'active' | 'draft'
    views: number
    clicks: number
    ctr: number
    sections: BioSection[]
    socialLinks: SocialLink[]
}

export const initialLinkPages: BioLinkPage[] = [
    {
        id: 'page-1',
        title: 'Dwayne Johnson',
        url: 'therock',
        themeId: 'midnight-grey',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
        bio: 'Actor | Producer | Founder | Entrepreneur. Moana, Project Rock, ZOA, Teremana Tequila. 🎬💪',
        status: 'active',
        views: 382490,
        clicks: 148902,
        ctr: 38.9,
        sections: [
            {
                id: 'sec-moana',
                title: 'MOANA Live Action',
                layout: 'grid',
                items: [
                    {
                        id: 'moana-1',
                        type: 'standard',
                        title: 'Moana Live Action | FINAL TRAILER',
                        url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
                        isActive: true,
                        clicks: 45201,
                        image: 'https://images.unsplash.com/photo-1542204172-e7052809f852?auto=format&fit=crop&w=300&h=200&q=80',
                        cardStyle: 'image_overlay'
                    },
                    {
                        id: 'moana-2',
                        type: 'standard',
                        title: 'Moana Live Action | OFFICIAL TEASER',
                        url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
                        isActive: true,
                        clicks: 34102,
                        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=300&h=200&q=80',
                        cardStyle: 'image_overlay'
                    },
                    {
                        id: 'moana-3',
                        type: 'standard',
                        title: 'See Trailers Now',
                        url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
                        isActive: true,
                        clicks: 12053,
                        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=80&h=80&q=80',
                        cardStyle: 'default'
                    }
                ]
            },
            {
                id: 'sec-repeat',
                title: 'Repeat',
                layout: 'grid',
                items: [
                    {
                        id: 'repeat-1',
                        type: 'standard',
                        title: 'Shop Luxury Cologne Collection',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 9812,
                        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'default'
                    },
                    {
                        id: 'repeat-2',
                        type: 'standard',
                        title: 'Shop Repeat Cologne',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 8743,
                        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'default'
                    },
                    {
                        id: 'repeat-3',
                        type: 'standard',
                        title: 'Shop on Amazon',
                        url: 'https://amazon.com',
                        isActive: true,
                        clicks: 6543,
                        image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'default'
                    },
                    {
                        id: 'repeat-4',
                        type: 'standard',
                        title: "Shop Men's Skincare",
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 5431,
                        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'default'
                    }
                ]
            },
            {
                id: 'sec-listen',
                title: 'Listen Now',
                layout: 'grid',
                items: [
                    {
                        id: 'listen-1',
                        type: 'standard',
                        title: 'Listen on Spotify',
                        url: 'https://spotify.com',
                        isActive: true,
                        clicks: 34102,
                        image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'music'
                    },
                    {
                        id: 'listen-2',
                        type: 'standard',
                        title: 'Listen on Apple Music',
                        url: 'https://apple.com',
                        isActive: true,
                        clicks: 23102,
                        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'music'
                    },
                    {
                        id: 'listen-3',
                        type: 'standard',
                        title: 'Listen on Amazon Music',
                        url: 'https://amazon.com',
                        isActive: true,
                        clicks: 12053,
                        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'music'
                    },
                    {
                        id: 'listen-4',
                        type: 'standard',
                        title: 'Listen on YouTube Music',
                        url: 'https://youtube.com',
                        isActive: true,
                        clicks: 18432,
                        image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'music'
                    }
                ]
            },
            {
                id: 'sec-projectrock',
                title: 'Project Rock | Under Armour',
                layout: 'horizontal',
                items: [
                    {
                        id: 'pr-1',
                        type: 'product',
                        title: 'UA Project Rock 6 Shoes',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 14201,
                        price: 160.00,
                        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&h=150&q=80'
                    },
                    {
                        id: 'pr-2',
                        type: 'product',
                        title: "Men's Project Rock Hoodie",
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 11029,
                        price: 80.00,
                        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=150&h=150&q=80'
                    },
                    {
                        id: 'pr-3',
                        type: 'product',
                        title: "Men's Project Rock Shorts",
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 8943,
                        price: 75.00,
                        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=150&h=150&q=80'
                    },
                    {
                        id: 'pr-4',
                        type: 'product',
                        title: 'Project Rock Slides',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 6543,
                        price: 70.00,
                        image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=150&h=150&q=80'
                    }
                ]
            },
            {
                id: 'sec-projectrock-banners',
                title: 'Shop Under Armour Apparel',
                layout: 'list',
                items: [
                    {
                        id: 'prb-1',
                        type: 'standard',
                        title: 'Shop Project Rock for Men, Women and Youth',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 7432,
                        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'default'
                    },
                    {
                        id: 'prb-2',
                        type: 'standard',
                        title: 'Shop on Amazon',
                        url: 'https://amazon.com',
                        isActive: true,
                        clicks: 4321,
                        image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'default'
                    }
                ]
            },
            {
                id: 'sec-smashing',
                title: 'The Smashing Machine',
                layout: 'grid',
                items: [
                    {
                        id: 'smashing-1',
                        type: 'standard',
                        title: 'First Look Trailer',
                        url: 'https://youtube.com',
                        isActive: true,
                        clicks: 14201,
                        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=300&h=200&q=80',
                        cardStyle: 'image_overlay'
                    },
                    {
                        id: 'smashing-2',
                        type: 'standard',
                        title: 'Behind the Scenes',
                        url: 'https://youtube.com',
                        isActive: true,
                        clicks: 11029,
                        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=300&h=200&q=80',
                        cardStyle: 'image_overlay'
                    },
                    {
                        id: 'smashing-3',
                        type: 'standard',
                        title: 'Now Streaming on HBO Max',
                        url: 'https://hbomax.com',
                        isActive: true,
                        clicks: 8943,
                        image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8edd86?auto=format&fit=crop&w=80&h=80&q=80',
                        cardStyle: 'default'
                    }
                ]
            },
            {
                id: 'sec-zoa',
                title: 'ZOA Energy',
                layout: 'horizontal',
                items: [
                    {
                        id: 'zoa-1',
                        type: 'product',
                        title: 'Strawberry Watermelon ZOA',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 14201,
                        price: 29.99,
                        image: 'https://images.unsplash.com/photo-1527960656366-ee2a38bb73bf?auto=format&fit=crop&w=150&h=150&q=80'
                    },
                    {
                        id: 'zoa-2',
                        type: 'product',
                        title: 'Frosted Coconut ZOA',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 11029,
                        price: 29.99,
                        image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=150&h=150&q=80'
                    },
                    {
                        id: 'zoa-3',
                        type: 'product',
                        title: 'Green Apple ZOA',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 8943,
                        price: 29.99,
                        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=150&h=150&q=80'
                    },
                    {
                        id: 'zoa-4',
                        type: 'product',
                        title: 'Tropical Punch ZOA',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 6543,
                        price: 29.99,
                        image: 'https://images.unsplash.com/photo-1534080391025-a7db5eed37f2?auto=format&fit=crop&w=150&h=150&q=80'
                    }
                ]
            },
            {
                id: 'sec-zoa-banner',
                title: 'Shop ZOA Energy Products',
                layout: 'list',
                items: [
                    {
                        id: 'zoab-1',
                        type: 'standard',
                        title: 'Shop all ZOA Energy Drinks and Apparel',
                        url: 'https://zoaenergy.com',
                        isActive: true,
                        clicks: 5432,
                        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'default'
                    }
                ]
            },
            {
                id: 'sec-ufl',
                title: 'UFL',
                layout: 'list',
                items: [
                    {
                        id: 'ufl-1',
                        type: 'standard',
                        title: 'Tickets on Sale Now',
                        url: 'https://theufl.com',
                        isActive: true,
                        clicks: 8742,
                        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'default'
                    },
                    {
                        id: 'ufl-2',
                        type: 'standard',
                        title: 'Shop UFL Merchandise',
                        url: 'https://shop.theufl.com',
                        isActive: true,
                        clicks: 4321,
                        image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'default'
                    }
                ]
            },
            {
                id: 'sec-sevenbucks',
                title: 'Watch | Seven Bucks Film & TV',
                layout: 'grid',
                items: [
                    {
                        id: 'sb-1',
                        type: 'standard',
                        title: 'Red One (In Theaters)',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 14201,
                        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=300&h=200&q=80',
                        cardStyle: 'image_overlay'
                    },
                    {
                        id: 'sb-2',
                        type: 'standard',
                        title: 'Young Rock (NBC)',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 11029,
                        image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=300&h=200&q=80',
                        cardStyle: 'image_overlay'
                    },
                    {
                        id: 'sb-3',
                        type: 'standard',
                        title: 'Black Adam (Warner Bros)',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 8943,
                        image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=300&h=200&q=80',
                        cardStyle: 'image_overlay'
                    },
                    {
                        id: 'sb-4',
                        type: 'standard',
                        title: 'Ballers (HBO)',
                        url: 'https://example.com',
                        isActive: true,
                        clicks: 6543,
                        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=300&h=200&q=80',
                        cardStyle: 'image_overlay'
                    },
                    {
                        id: 'sb-5',
                        type: 'standard',
                        title: 'Explore Film and TV Projects',
                        url: 'https://sevenbucks.com',
                        isActive: true,
                        clicks: 5432,
                        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=80&h=80&q=80',
                        cardStyle: 'default'
                    }
                ]
            },
            {
                id: 'sec-news',
                title: 'News & Press',
                layout: 'list',
                items: [
                    {
                        id: 'news-1',
                        type: 'blog',
                        title: 'Dwayne Johnson Would Like a Next Chapter',
                        url: 'https://gq.com',
                        isActive: true,
                        clicks: 14201,
                        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
                        description: "In GQ's latest cover profile, Dwayne Johnson opens up about movie stardom, family life, and his plans for the next chapter of his career."
                    },
                    {
                        id: 'news-2',
                        type: 'blog',
                        title: 'Signing Partnership Expansion with UFC',
                        url: 'https://ufc.com',
                        isActive: true,
                        clicks: 11029,
                        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=150&h=150&q=80',
                        description: "UFC announces exclusive global footwear partnership expansion with Dwayne Johnson's Project Rock brand."
                    },
                    {
                        id: 'news-3',
                        type: 'blog',
                        title: 'Teremana Tequila Launches Share a Teremana Campaign',
                        url: 'https://teremana.com',
                        isActive: true,
                        clicks: 8943,
                        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=150&h=150&q=80',
                        description: "Dwayne Johnson's ultra-premium tequila brand launches massive nationwide campaign focusing on shared stories and community."
                    }
                ]
            },
            {
                id: 'sec-teremana',
                title: 'Teremana Tequila (21+)',
                layout: 'list',
                items: [
                    {
                        id: 'tere-1',
                        type: 'standard',
                        title: 'Try our Blanco, Reposado and Anejo',
                        url: 'https://teremana.com',
                        isActive: true,
                        clicks: 9842,
                        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=150&h=150&q=80',
                        cardStyle: 'default'
                    }
                ]
            }
        ],
        socialLinks: [
            { platform: 'tiktok', url: 'https://tiktok.com/@therock', isActive: true },
            { platform: 'instagram', url: 'https://instagram.com/therock', isActive: true },
            { platform: 'twitter', url: 'https://x.com/therock', isActive: true },
            { platform: 'facebook', url: 'https://facebook.com/therock', isActive: true },
            { platform: 'youtube', url: 'https://youtube.com/therock', isActive: true }
        ]
    },
    {
        id: 'page-2',
        title: 'LinkGrow Official',
        url: 'linkgrow',
        themeId: 'cozy-blue',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&h=150&q=80',
        bio: 'The ultimate link-in-bio platform built for modern content creators 🚀',
        status: 'active',
        views: 89040,
        clicks: 38240,
        ctr: 42.9,
        sections: [
            {
                id: 'sec-2-1',
                title: 'Links',
                items: [
                    {
                        id: 'link-2-1',
                        type: 'standard',
                        title: 'Get Started for Free 🌟',
                        url: 'https://linkgrow.io/register',
                        icon: 'Zap',
                        isActive: true,
                        clicks: 28430,
                    },
                    {
                        id: 'link-2-2',
                        type: 'standard',
                        title: 'Check out our premium themes 🎨',
                        url: 'https://linkgrow.io/themes',
                        icon: 'Sparkles',
                        isActive: true,
                        clicks: 9810,
                    }
                ]
            }
        ],
        socialLinks: [
            { platform: 'instagram', url: 'https://instagram.com/linkgrow', isActive: true },
            { platform: 'twitter', url: 'https://x.com/linkgrow', isActive: true },
            { platform: 'linkedin', url: 'https://linkedin.com/company/linkgrow', isActive: true }
        ]
    }
]

export interface CustomDomain {
    id: string
    domain: string
    targetSlug: string
    status: 'active' | 'pending' | 'failed'
    createdAt: string
    dnsRecordType: string
    dnsRecordValue: string
}

export const initialCustomDomains: CustomDomain[] = [
    {
        id: 'domain-1',
        domain: 'bio.gourav.me',
        targetSlug: 'gouravvi',
        status: 'active',
        createdAt: '2026-05-10',
        dnsRecordType: 'CNAME',
        dnsRecordValue: 'cname.linkgrow.io'
    },
    {
        id: 'domain-2',
        domain: 'links.designhub.co',
        targetSlug: 'designhub',
        status: 'pending',
        createdAt: '2026-06-18',
        dnsRecordType: 'A',
        dnsRecordValue: '76.76.21.21'
    }
]

export interface QrCodeConfig {
    id: string
    pageUrl: string
    fgColor: string
    bgColor: string
    dotStyle: 'square' | 'dots' | 'rounded'
    logoType: 'none' | 'logo' | 'avatar'
    size: number
}

export const initialQrCodes: QrCodeConfig[] = [
    {
        id: 'qr-1',
        pageUrl: 'https://linkgrow.io/gouravvi',
        fgColor: '#db2777',
        bgColor: '#ffffff',
        dotStyle: 'rounded',
        logoType: 'avatar',
        size: 300
    }
]
