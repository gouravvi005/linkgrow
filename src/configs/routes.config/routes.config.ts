import dashboardsRoute from './dashboardsRoute'
import conceptsRoute from './conceptsRoute'
import uiComponentsRoute from './uiComponentsRoute'
import authRoute from './authRoute'
import authDemoRoute from './authDemoRoute'
import guideRoute from './guideRoute'
import creatorRoute from './creatorRoute'
import type { Routes } from '@/@types/routes'

export const protectedRoutes: Routes = {
    ...dashboardsRoute,
    ...creatorRoute,
    ...uiComponentsRoute,
    ...authDemoRoute,
    ...conceptsRoute,
    ...guideRoute,
}

export const publicRoutes: Routes = {
    '/': {
        key: 'public.home',
        authority: [],
    },
    '/about': {
        key: 'public.about',
        authority: [],
    },
    '/contact': {
        key: 'public.contact',
        authority: [],
    },
    '/cookies': {
        key: 'public.cookies',
        authority: [],
    },
    '/faq': {
        key: 'public.faq',
        authority: [],
    },
    '/features': {
        key: 'public.features',
        authority: [],
    },
    '/pricing': {
        key: 'public.pricing',
        authority: [],
    },
    '/privacy': {
        key: 'public.privacy',
        authority: [],
    },
    '/terms': {
        key: 'public.terms',
        authority: [],
    },
    '/workflow': {
        key: 'public.workflow',
        authority: [],
    },
}

export const authRoutes = authRoute
