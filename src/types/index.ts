export interface User {
  id: string
  clerkId: string
  email: string
  firstName?: string
  lastName?: string
  createdAt: Date
  updatedAt: Date
}

export interface Profile {
  id: string
  userId: string
  username: string
  displayName: string
  bio?: string
  avatar?: string
  theme: Record<string, any>
  customDomain?: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Link {
  id: string
  profileId: string
  title: string
  url: string
  description?: string
  image?: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  userId: string
  profileId: string
  title: string
  description?: string
  price: number
  fileUrl: string
  fileName: string
  fileSize: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  userId: string
  name: string
  description?: string
  price: number
  interval: string
  stripeId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Subscriber {
  id: string
  email: string
  name?: string
  profileId: string
  createdAt: Date
}

export interface Order {
  id: string
  userId: string
  productId?: string
  subscriptionId?: string
  stripeId: string
  amount: number
  currency: string
  status: string
  createdAt: Date
}

export interface Analytics {
  id: string
  linkId?: string
  profileId?: string
  userId: string
  type: string
  metadata: Record<string, any>
  createdAt: Date
}

export interface Theme {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
  borderRadius: number
}

export interface DashboardStats {
  totalClicks: number
  totalRevenue: number
  totalSubscribers: number
  totalProducts: number
}