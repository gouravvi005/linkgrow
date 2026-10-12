const getDashboard = async () => {
    try {
        const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        const response = await fetch(`${apiURL}/api/v1/dashboards`, {
            cache: 'no-store',
        })
        if (!response.ok) return null
        const result = await response.json()
        return result?.data ?? result
    } catch (err) {
        console.error('Error fetching dashboard:', err)
        return null
    }
}

export default getDashboard
