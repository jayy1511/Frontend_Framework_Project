export type ImageLinks = { thumbnail?: string; smallThumbnail?: string }

export type BookLike = {
  id?: string
  title?: string
  coverUrl?: string
  imageLinks?: ImageLinks
  googleId?: string
  isbn10?: string
  isbn13?: string
}

const PLACEHOLDER = encodeURI(
  `data:image/svg+xml;utf8,`+
  `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480" viewBox="0 0 320 480">`+
  `<rect width="320" height="480" fill="#0a0a0a"/>`+
  `<rect x="36" y="72" width="248" height="336" rx="18" fill="#141414" stroke="#2a2a2a" stroke-width="2"/>`+
  `</svg>`
)

function https(u?: string){ return u ? u.replace(/^http:\/\//i,"https://") : undefined }
function gById(id?: string){ return id ? `https://books.google.com/books/content?id=${encodeURIComponent(id)}&printsec=frontcover&img=1&zoom=1&source=gbs_api` : undefined }
function olByIsbn(isbn?: string){ return isbn ? `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-L.jpg?default=false` : undefined }

export function getCover(b: BookLike){
  const viaExplicit = https(b.coverUrl)
  const viaLinks = https(b.imageLinks?.thumbnail) || https(b.imageLinks?.smallThumbnail)
  const viaGoogle = gById(b.googleId) || gById(b.id)
  const viaOL = olByIsbn(b.isbn13) || olByIsbn(b.isbn10)
  return viaExplicit || viaLinks || viaGoogle || viaOL || PLACEHOLDER
}

export { PLACEHOLDER }
