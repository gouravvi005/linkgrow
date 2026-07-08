'use server'
import type { SignInCredential } from '@/@types/auth'

const validateCredential = async (values: SignInCredential) => {
    try {
        const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        const response = await fetch(`${apiURL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        if (!response.ok) {
            return null
        }

        const result = await response.json()
        // Better Auth login returns { user, session }
        const user = result?.user || result?.data?.user || result?.data || result
        return user
    } catch (error) {
        console.error('Error validating credentials from backend:', error)
        return null
    }
}

export default validateCredential
