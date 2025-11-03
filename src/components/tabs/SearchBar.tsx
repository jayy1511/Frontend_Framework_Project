import { useState } from "react"

type Props = {
  defaultValue?: string
  placeholder?: string
  onChange?: (v: string) => void
  onSubmit?: (v: string) => void
}

export default function SearchBar({ defaultValue = "", placeholder = "Search books or authors...", onChange, onSubmit }: Props){
  const [q, setQ] = useState(defaultValue)

  return (
    <form
      onSubmit={(e)=>{ e.preventDefault(); onSubmit?.(q) }}
      className="searchbar relative mx-auto w-full max-w-5xl"
    >
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-70">
      </span>
      <input
        className="pl-11 pr-12 h-12 rounded-2xl w-full bg-[var(--bg-3)] text-[var(--text)] placeholder-[var(--muted)] outline-none"
        style={{ boxShadow: "0 0 0 1px var(--ring) inset" }}
        value={q}
        onChange={(e)=>{ setQ(e.target.value); onChange?.(e.target.value) }}
        placeholder={placeholder}
        type="text"
      />
      {q ? (
        <button
          type="button"
          onClick={()=>{ setQ(""); onChange?.(""); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 btn-ghost px-2 py-1"
        >
          Clear
        </button>
      ) : null}
    </form>
  )
}
