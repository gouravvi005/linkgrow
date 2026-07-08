const getRolesPermissionsUsers = async (queryParams: { [key: string]: any }) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const queryString = new URLSearchParams(queryParams as any).toString()
    const response = await fetch(`${apiURL}/api/v1/roles/users?${queryString}`)
    const result = await response.json(); return result?.data ?? result
}
export default getRolesPermissionsUsers

