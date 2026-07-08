'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Loading from '@/components/shared/Loading'
import { apiGetCustomerLog } from '@/services/CustomersService'
import sleep from '@/utils/sleep'
import dayjs from 'dayjs'
import isEmpty from 'lodash/isEmpty'
import { PiEyeDuotone, PiCloudCheckDuotone, PiCreditCardDuotone, PiTicketDuotone, PiPhoneOutgoingDuotone } from 'react-icons/pi'
import useSWR from 'swr'

type Activities = { id: string; date: number; events: { type: string; dateTime: number; description: string }[] }[]

const TimeLineMedia = ({ type }: { type: string }) => {
    switch (type) {
        case 'PRODUCT-VIEW': return <PiEyeDuotone />
        case 'PRODUCT-UPDATE': return <PiCloudCheckDuotone />
        case 'PAYMENT': return <PiCreditCardDuotone />
        case 'SUPPORT-TICKET': return <PiTicketDuotone />
        case 'TICKET-IN-PROGRESS': return <PiPhoneOutgoingDuotone />
        default: return <></>
    }
}

const TimeLineContent = ({ type, description, name }: { type: string; description: string; name: string }) => {
    const titles: Record<string, string> = { 'PRODUCT-VIEW': 'View Plan', 'PRODUCT-UPDATE': 'Change Plan', 'PAYMENT': 'Payment', 'SUPPORT-TICKET': 'Support Ticket', 'TICKET-IN-PROGRESS': 'Support Ticket Update' }
    const title = titles[type]
    if (!title) return <></>
    return (
        <div>
            <h6 className="font-bold">{title}</h6>
            <p className="font-semibold">{type !== 'TICKET-IN-PROGRESS' ? `${name} ` : ''}{description}</p>
        </div>
    )
}

const ActivitySection = ({ userName, id }: { userName: string; id: string }) => {
    const { data, isLoading } = useSWR(
        ['/api/customers/log', { id }],
        ([_, params]) => apiGetCustomerLog<Activities, { id: string }>(params),
        { revalidateOnFocus: false, revalidateIfStale: false },
    )

    const [fetchData, setfetchData] = useState(false)
    const [showNoMoreData, setShowNoMoreData] = useState(false)

    const handleLoadMore = async () => {
        setfetchData(true)
        await sleep(500)
        setShowNoMoreData(true)
        setfetchData(false)
    }

    return (
        <Loading loading={isLoading}>
            {data && data.map((log) => (
                <div key={log.id} className="mb-4">
                    <div className="mb-4 font-bold uppercase flex items-center gap-4">
                        <span className="w-[70px] heading-text">{dayjs.unix(log.date).format('DD MMMM')}</span>
                        <div className="border-b border-2 border-gray-200 dark:border-gray-600 border-dashed w-full" />
                    </div>
                    <div className="flex flex-col gap-4">
                        {isEmpty(log.events) ? (
                            <div>No Activities</div>
                        ) : (
                            log.events.map((event, index) => (
                                <div key={event.type + index} className="flex items-center">
                                    <span className="font-semibold w-[100px]">{dayjs.unix(event.dateTime).format('h:mm A')}</span>
                                    <Card className="max-w-[600px] w-full" bodyClass="py-3">
                                        <div className="flex items-center gap-4">
                                            <div className="text-primary text-3xl"><TimeLineMedia type={event.type} /></div>
                                            <TimeLineContent name={userName} type={event.type} description={event?.description} />
                                        </div>
                                    </Card>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ))}
            <div className="text-center">
                {showNoMoreData ? (
                    <span className="font-semibold h-[40px] flex items-center justify-center">No more activities</span>
                ) : (
                    <Button loading={fetchData} onClick={handleLoadMore}>Load More</Button>
                )}
            </div>
        </Loading>
    )
}

export default ActivitySection
