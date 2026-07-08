import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import UserListTable from './_components/UserListTable'
import UserListSearch from './_components/UserListSearch'
import getRolesPermissionsUsers from '@/server/actions/getRolesPermissionsUsers'
import type { PageProps } from '@/@types/common'

export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams
    const data = await getRolesPermissionsUsers(params)

    const pageIndex = parseInt(params.pageIndex as string) || 1
    const pageSize = parseInt(params.pageSize as string) || 10

    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Users List</h3>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <div className="w-full md:w-72">
                            <UserListSearch />
                        </div>
                    </div>
                    <UserListTable
                        userList={data.list as any[]}
                        userListTotal={data.total}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                    />
                </div>
            </AdaptiveCard>
        </Container>
    )
}
