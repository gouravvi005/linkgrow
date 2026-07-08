const getArticle = async (id: string) => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const response = await fetch(`${apiURL}/api/v1/helps/articles/${id}`)
    const result = await response.json(); return result?.data ?? result
}
export default getArticle

