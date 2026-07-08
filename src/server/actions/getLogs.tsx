const getLogs = async (activityIndex: number = 1, filter?: string[]) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const params = new URLSearchParams()
    params.append('activityIndex', activityIndex.toString())
    if (filter) {
        if (Array.isArray(filter)) {
            filter.forEach(f => params.append('filter', f))
        } else {
            params.append('filter', filter)
        }
    }
    const response = await fetch(`${apiURL}/api/v1/logs?${params.toString()}`)
    const result = await response.json(); return result?.data ?? result
}
export default getLogs

