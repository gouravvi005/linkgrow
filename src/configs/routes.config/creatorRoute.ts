import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const creatorRoute: Routes = {
    '/creator/mini-site': {
        key: 'creator.miniSite',
        authority: [ADMIN, USER],
    },
    '/creator/mini-site/links': {
        key: 'creator.miniSite.links',
        authority: [ADMIN, USER],
    },
    '/creator/mini-site/theme': {
        key: 'creator.miniSite.theme',
        authority: [ADMIN, USER],
    },
    '/creator/mini-site/social-links': {
        key: 'creator.miniSite.socialLinks',
        authority: [ADMIN, USER],
    },
    '/creator/link-in-bio/pages': {
        key: 'creator.linkInBio.pages',
        authority: [ADMIN, USER],
    },
    '/creator/link-in-bio/analytics': {
        key: 'creator.linkInBio.analytics',
        authority: [ADMIN, USER],
    },
}

export default creatorRoute
