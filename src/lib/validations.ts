import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const profileSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/),
  displayName: z.string().min(1).max(50),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  theme: z.record(z.string(), z.any()).optional(),
  customDomain: z.string().optional(),
  isPublished: z.boolean().optional(),
})

export const linkSchema = z.object({
  title: z.string().min(1).max(100),
  url: z.string().url(),
  description: z.string().max(200).optional(),
  image: z.string().url().optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
})

export const productSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  price: z.number().positive(),
  fileUrl: z.string().url(),
  fileName: z.string(),
  fileSize: z.number().int().positive(),
  isActive: z.boolean().optional(),
})

export const subscriptionSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  price: z.number().positive(),
  interval: z.enum(['month', 'year']),
  stripeId: z.string(),
  isActive: z.boolean().optional(),
})

export const subscriberSchema = z.object({
  email: z.string().email(),
  name: z.string().max(100).optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>