'use client'

import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TbEye } from 'react-icons/tb'
import dayjs from 'dayjs'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'

type User = {
    id: string
    name: string
    email: string
    img: string
    role: string
    lastOnline: number
    status: string
    title: string
}

type UserListTableProps = {
    userList: User[]
    userListTotal: number
    pageIndex?: number
    pageSize?: number
    loading?: boolean
}

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: User }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar size={40} shape="circle" src={row.img} />
            <div>
                <Link
                    className="hover:text-primary font-semibold text-gray-900 dark:text-gray-100"
                    href={`/concepts/users/user-details/${row.id}`}
                >
                    {row.name}
                </Link>
                <div className="text-xs text-gray-500">{row.email}</div>
            </div>
        </div>
    )
}

const ActionColumn = ({ onViewDetail }: { onViewDetail: () => void }) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="View Profile">
                <div
                    className="text-xl cursor-pointer select-none font-semibold"
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye />
                </div>
            </Tooltip>
        </div>
    )
}

const UserListTable = ({
    userList,
    userListTotal,
    pageIndex = 1,
    pageSize = 10,
    loading = false,
}: UserListTableProps) => {
    const router = useRouter()
    const { onAppendQueryParams } = useAppendQueryParams()

    const handleViewDetails = (user: User) => {
        router.push(`/concepts/users/user-details/${user.id}`)
    }

    const columns: ColumnDef<User>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => <NameColumn row={props.row.original} />,
            },
            {
                header: 'Title',
                accessorKey: 'title',
                cell: (props) => <span className="font-semibold">{props.row.original.title}</span>,
            },
            {
                header: 'Role',
                accessorKey: 'role',
                cell: (props) => <span className="capitalize">{props.row.original.role}</span>,
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <Tag className={statusColor[row.status] || 'bg-gray-200 text-gray-800'}>
                            <span className="capitalize">{row.status}</span>
                        </Tag>
                    )
                },
            },
            {
                header: 'Last Online',
                accessorKey: 'lastOnline',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex flex-col">
                            <span className="font-semibold">
                                {dayjs.unix(row.lastOnline).format('MMMM D, YYYY')}
                            </span>
                            <small className="text-gray-500">
                                {dayjs.unix(row.lastOnline).format('hh:mm A')}
                            </small>
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onViewDetail={() => handleViewDetails(props.row.original)}
                    />
                ),
            },
        ],
        [],
    )

    const handlePaginationChange = (page: number) => {
        onAppendQueryParams({ pageIndex: String(page) })
    }

    const handleSelectChange = (value: number) => {
        onAppendQueryParams({ pageSize: String(value), pageIndex: '1' })
    }

    const handleSort = (sort: OnSortParam) => {
        onAppendQueryParams({ order: sort.order, sortKey: sort.key })
    }

    return (
        <DataTable
            columns={columns}
            data={userList}
            noData={userList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={loading}
            pagingData={{ total: userListTotal, pageIndex, pageSize }}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default UserListTable
