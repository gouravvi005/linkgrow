import { NAV_ITEM_TYPE_TITLE } from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'
import dashboardsNavigationConfig from './dashboards.navigation.config'
import conceptsNavigationConfig from './concepts.navigation.config'
import sidebarConfig from './sidebarConfig'

const creatorNavigationConfig: NavigationTree = {
    key: 'creator',
    path: '',
    title: 'Creator',
    translateKey: 'nav.creator',
    icon: 'concepts',
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ADMIN, USER],
    subMenu: sidebarConfig
}

const navigationConfig: NavigationTree[] = [
    ...dashboardsNavigationConfig,
    creatorNavigationConfig,
    ...conceptsNavigationConfig
]

export default navigationConfig
