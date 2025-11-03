export function normalizeGoogleVolume(v:any){
  const info = v?.volumeInfo || {}
  const ids = info.industryIdentifiers || []
  const isbn10 = ids.find((x:any)=>x.type==="ISBN_10")?.identifier
  const isbn13 = ids.find((x:any)=>x.type==="ISBN_13")?.identifier
  return {
    id: v?.id || cryptoRandomId(),
    title: info.title || "Untitled",
    author: Array.isArray(info.authors) ? info.authors[0] : info.authors,
    description: info.description || "",
    imageLinks: info.imageLinks,
    googleId: v?.id,
    isbn10,
    isbn13,
    coverUrl: info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail
  }
}
function cryptoRandomId(){
  return Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)
}
