'use client'

import Input from '@/components/ui/Input'
import { TbSearch } from 'react-icons/tb'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import useDebounce from '@/utils/hooks/useDebounce'

const UserListSearch = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleDebounceFn = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set('query', value)
            params.set('pageIndex', '1')
        } else {
            params.delete('query')
        }
        router.replace(`${pathname}?${params.toString()}`)
    }

    const debounceFn = useDebounce(handleDebounceFn, 500)

    return (
        <Input
            placeholder="Search users..."
            prefix={<TbSearch className="text-lg" />}
            onChange={(e) => debounceFn(e.target.value)}
            defaultValue={searchParams.get('query') ?? ''}
        />
    )
}

export default UserListSearch
