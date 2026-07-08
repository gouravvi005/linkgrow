'use client'

import { useState, useMemo } from 'react'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Tag from '@/components/ui/Tag'
import toast from '@/components/ui/toast'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import classNames from '@/utils/classNames'
import isLastChild from '@/utils/isLastChild'
import CreditCardDialog from '@/components/view/CreditCardDialog'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper } from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import { countryList } from '@/constants/countries.constant'
import dayjs from 'dayjs'
import type { User } from '../types'

type OrderHistory = { id: string; item: string; status: string; amount: number; date: number }
type BillingSectionProps = { data: User }

const { Tr, Td, TBody } = Table
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const statusColor: Record<string, string> = { paid: 'bg-emerald-500', pending: 'bg-amber-400' }
const columnHelper = createColumnHelper<OrderHistory>()

const columns = [
    columnHelper.accessor('item', {
        header: 'Product',
        cell: (props) => <span className="font-semibold">{props.row.original.item}</span>,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (props) => (
            <div className="flex items-center gap-2">
                <Badge className={statusColor[props.row.original.status]} />
                <span className="heading-text font-bold capitalize">{props.row.original.status}</span>
            </div>
        ),
    }),
    columnHelper.accessor('date', {
        header: 'Date',
        cell: (props) => dayjs.unix(props.row.original.date).format('MM/DD/YYYY'),
    }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (props) => (
            <NumericFormat displayType="text" value={(Math.round(props.row.original.amount * 100) / 100).toFixed(2)} prefix="$" thousandSeparator />
        ),
    }),
]

const initialSelectedCard = { cardHolderName: '', ccNumber: '', cardExpiry: '', code: '' }

const BillingSection = ({ data }: BillingSectionProps) => {
    const [selectedCard, setSelectedCard] = useState(initialSelectedCard)
    const [dialogOpen, setDialogOpen] = useState(false)

    const table = useReactTable({ data: data.orderHistory || [], columns, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel() })

    const countryName = useMemo(() => countryList.find((c) => c.value === data.personalInfo?.country)?.label, [data.personalInfo?.country])

    const handleEdit = (cardHolderName: string, cardExpiry: string) => {
        setSelectedCard({ ...initialSelectedCard, cardHolderName, cardExpiry })
        setDialogOpen(true)
    }

    const handleSubmit = () => {
        setSelectedCard(initialSelectedCard)
        setDialogOpen(false)
        toast.push(<Notification title="Successfully updated!" type="success" />, { placement: 'top-center' })
    }

    return (
        <>
            <h6 className="mb-4">Purchase history</h6>
            <Table>
                <TBody>
                    {table.getRowModel().rows.slice(0, 10).map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                            ))}
                        </Tr>
                    ))}
                </TBody>
            </Table>
            <h6 className="mt-8">Addresses</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {['Billing Address', 'Delivery Address'].map((label) => (
                    <Card key={label}>
                        <div className="font-bold heading-text">{label}</div>
                        <div className="mt-4 flex flex-col gap-1 font-semibold">
                            <span>{data.personalInfo?.address}</span>
                            <span>{data.personalInfo?.city}</span>
                            <span>{data.personalInfo?.postcode}</span>
                            <span>{countryName}</span>
                        </div>
                    </Card>
                ))}
            </div>
            <h6 className="mt-8">Payment Methods</h6>
            <Card className="mt-4" bodyClass="py-0">
                {data.paymentMethod?.map((card, index) => (
                    <div key={card.last4Number} className={classNames('flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4', !isLastChild(data.paymentMethod || [], index) && 'border-b border-gray-200 dark:border-gray-600')}>
                        <div className="flex items-center gap-3">
                            {card.cardType === 'VISA' && <img src="/img/others/img-8.png" alt="visa" />}
                            {card.cardType === 'MASTER' && <img src="/img/others/img-9.png" alt="master" />}
                            <div>
                                <div className="flex items-center">
                                    <div className="text-gray-900 dark:text-gray-100 font-semibold">{card.cardHolderName} •••• {card.last4Number}</div>
                                    {card.primary && <Tag className="bg-sky-100 text-primary dark:bg-primary/20 dark:text-primary rounded-md border-0 mx-2"><span className="capitalize"> Primary </span></Tag>}
                                </div>
                                <span>Expired {months[parseInt(card.expMonth) - 1]} 20{card.expYear}</span>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button size="sm" onClick={() => handleEdit(card.cardHolderName, `${card.expMonth}${card.expYear}`)}>Edit</Button>
                        </div>
                    </div>
                ))}
                <CreditCardDialog title="Edit credit card" defaultValues={selectedCard} dialogOpen={dialogOpen} onDialogClose={() => { setSelectedCard(initialSelectedCard); setDialogOpen(false) }} onSubmit={handleSubmit} />
            </Card>
        </>
    )
}

export default BillingSection
