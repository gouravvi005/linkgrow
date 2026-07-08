'use client'

import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import ProfileSection from './ProfileSection'
import BillingSection from './BillingSection'
import ActivitySection from './ActivitySection'
import type { User } from '../types'

type UserDetailsProps = { data: User }

const { TabNav, TabList, TabContent } = Tabs

const UserDetails = ({ data }: UserDetailsProps) => {
    return (
        <div className="flex flex-col gap-4">
            <Card className="w-full">
                <Tabs defaultValue="profile">
                    <TabList>
                        <TabNav value="profile">Profile</TabNav>
                        <TabNav value="billing">Billing</TabNav>
                        <TabNav value="activity">Activity</TabNav>
                    </TabList>
                    <div className="p-4">
                        <TabContent value="profile">
                            <ProfileSection data={data} />
                        </TabContent>
                        <TabContent value="billing">
                            <BillingSection data={data} />
                        </TabContent>
                        <TabContent value="activity">
                            <ActivitySection userName={data.name} id={data.id} />
                        </TabContent>
                    </div>
                </Tabs>
            </Card>
        </div>
    )
}

export default UserDetails
