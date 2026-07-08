const getMail = async (queryParams: { [key: string]: any }) => {
    const { mail: id } = queryParams
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const response = await fetch(`${apiURL}/api/v1/mail?mail=${id}`)
    const result = await response.json(); return result?.data ?? result
}
export default getMail

