const getEcommerceDashboard = async () => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const response = await fetch(`${apiURL}/api/v1/dashboards/ecommerce`)
    const result = await response.json()
    return result?.data ?? result
}
export default getEcommerceDashboard
