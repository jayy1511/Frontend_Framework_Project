export type GoogleBookSuggestion = {
  title: string
  authors: string[]
  publishedDate?: string
  isbn13?: string
  thumbnail?: string
}

export async function searchBooksByTitle(query: string): Promise<GoogleBookSuggestion[]> {
  if (!query.trim()) return []
  const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(query)}&maxResults=10`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch suggestions')
  const data = await res.json()
  const items = Array.isArray(data.items) ? data.items : []
  return items.map((it: any) => {
    const info = it?.volumeInfo ?? {}
    const ids = info.industryIdentifiers ?? []
    const isbn13 = ids.find((x: any) => x.type === 'ISBN_13')?.identifier
    return {
      title: info.title ?? '',
      authors: info.authors ?? [],
      publishedDate: info.publishedDate,
      isbn13,
      thumbnail: info.imageLinks?.thumbnail,
    }
  })
}
