import { useMemo } from "react"

type ImageLinks = { thumbnail?: string; smallThumbnail?: string }

export type Book = {
  id: string
  title: string
  author?: string
  description?: string
  coverUrl?: string
  imageLinks?: ImageLinks
  googleId?: string
}

type Props = { book: Book; onSelect?: (b: Book) => void }

const PLACEHOLDER = encodeURI(
  `data:image/svg+xml;utf8,` +
  `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="480" viewBox="0 0 320 480">` +
  `<rect width="320" height="480" fill="#0a0a0a"/>` +
  `<rect x="36" y="72" width="248" height="336" rx="18" fill="#141414" stroke="#2a2a2a" stroke-width="2"/>` +
  `</svg>`
)

function https(url?: string) {
  if (!url) return undefined
  return url.replace(/^http:\/\//i, "https://")
}

function googleCoverFromId(id?: string) {
  if (!id) return undefined
  return `https://books.google.com/books/content?id=${encodeURIComponent(
    id
  )}&printsec=frontcover&img=1&zoom=1&source=gbs_api`
}

export default function BookCard({ book, onSelect }: Props) {
  const cover = useMemo(() => {
    const byLinks =
      https(book.coverUrl) ||
      https(book.imageLinks?.thumbnail) ||
      https(book.imageLinks?.smallThumbnail)
    const byGoogleId =
      googleCoverFromId(book.googleId) ||
      (/^[\w-]{10,}$/.test(book.id) ? googleCoverFromId(book.id) : undefined)
    return byLinks || byGoogleId || PLACEHOLDER
  }, [book])

  return (
    <div className="card card-pressable overflow-hidden">
      <button onClick={() => onSelect?.(book)} className="w-full text-left" type="button">
        <div className="aspect-[2/3] w-full overflow-hidden" style={{ background: "rgba(255,255,255,.04)" }}>
          <img
            src={cover}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
            loading="lazy"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement
              if (el.src !== PLACEHOLDER) el.src = PLACEHOLDER
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-base font-semibold">{book.title}</h3>
          {book.author ? <p className="mt-1 text-sm text-[var(--muted)]">{book.author}</p> : null}
          {book.description ? (
            <p className="mt-3 line-clamp-3 text-sm text-[var(--muted)]">{book.description}</p>
          ) : null}
          <div className="mt-4 flex items-center gap-2">
            <span className="badge">Book</span>
            <span className="badge">Library</span>
          </div>
        </div>
      </button>
    </div>
  )
}
