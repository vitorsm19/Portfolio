export function GhostText({
  text,
  highlights,
  accentWords = [],
  className = '',
}: {
  text: string
  highlights: string[]
  accentWords?: string[]
  className?: string
}) {
  const all = [...highlights, ...accentWords]
  const regex = new RegExp(
    `(${all.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi',
  )
  const parts = text.split(regex)

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isAccent = accentWords.some((w) => w.toLowerCase() === part.toLowerCase())
        const isHighlight = highlights.some((h) => h.toLowerCase() === part.toLowerCase())
        if (isAccent)
          return (
            <span key={i} className="text-accent opacity-100">
              {part}
            </span>
          )
        if (isHighlight)
          return (
            <span key={i} className="opacity-100 text-text-primary">
              {part}
            </span>
          )
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}
