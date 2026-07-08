'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import dayjs from 'dayjs'
import { HiOutlineTrash } from 'react-icons/hi'
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import type { User } from '../types'

type ProfileSectionProps = { data: User }

const UserInfoField = ({ title, value }: { title: string; value?: string }) => (
    <div>
        <span className="text-gray-500 font-semibold">{title}</span>
        <p className="heading-text font-bold text-gray-900 dark:text-gray-100">{value || '-'}</p>
    </div>
)

const statusColor: Record<string, string> = {
    active: 'bg-emerald-100 dark:bg-emerald-200/20 text-emerald-600 dark:text-emerald-400 border-0',
    blocked: 'bg-red-100 dark:bg-red-200/20 text-red-600 dark:text-red-400 border-0',
}

const ProfileSection = ({ data }: ProfileSectionProps) => {
    const router = useRouter()
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleSocialNavigate = (link: string = '') => {
        window.open(`https://${link}`, '_blank', 'rel=noopener noreferrer')
    }

    const handleDelete = () => {
        setDialogOpen(false)
        router.push('/concepts/users/user-list')
        toast.push(
            <Notification title="Successfully Deleted" type="success">
                User successfully deleted
            </Notification>,
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex items-center gap-4">
                    <Avatar size={90} shape="circle" src={data.img} />
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold">{data.name}</h4>
                            <Tag className={statusColor[data.status] || 'bg-gray-100 text-gray-600'}>
                                <span className="capitalize">{data.status}</span>
                            </Tag>
                        </div>
                        <p className="text-gray-500 font-semibold">{data.title || 'User'}</p>
                        <p className="text-xs text-primary font-semibold capitalize mt-1">{data.role} Account</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="solid" onClick={() => router.push('/concepts/chat')}>
                        Send Message
                    </Button>
                    <Button
                        customColorClass={() => 'text-error hover:border-error hover:ring-1 ring-error hover:text-error'}
                        icon={<HiOutlineTrash />}
                        onClick={() => setDialogOpen(true)}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <UserInfoField title="Email" value={data.email} />
                <UserInfoField title="Phone" value={data.personalInfo?.phoneNumber} />
                <UserInfoField title="Date of Birth" value={data.personalInfo?.birthday} />
                <UserInfoField title="Location" value={data.personalInfo?.location} />
                <UserInfoField title="Last Online" value={dayjs.unix(data.lastOnline).format('DD MMM YYYY hh:mm A')} />
                <div>
                    <span className="text-gray-500 font-semibold">Social Links</span>
                    <div className="flex mt-2 gap-2">
                        <Button size="sm" icon={<FaFacebookF className="text-[#2259f2]" />} onClick={() => handleSocialNavigate(data.personalInfo?.facebook)} />
                        <Button size="sm" icon={<FaXTwitter className="text-black dark:text-white" />} onClick={() => handleSocialNavigate(data.personalInfo?.twitter)} />
                        <Button size="sm" icon={<FaLinkedinIn className="text-[#155fb8]" />} onClick={() => handleSocialNavigate(data.personalInfo?.linkedIn)} />
                        <Button size="sm" icon={<FaPinterestP className="text-[#df0018]" />} onClick={() => handleSocialNavigate(data.personalInfo?.pinterest)} />
                    </div>
                </div>
            </div>

            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete user"
                onClose={() => setDialogOpen(false)}
                onRequestClose={() => setDialogOpen(false)}
                onCancel={() => setDialogOpen(false)}
                onConfirm={handleDelete}
            >
                <p>Are you sure you want to delete this user? This action cannot be undone.</p>
            </ConfirmDialog>
        </div>
    )
}

export default ProfileSection
