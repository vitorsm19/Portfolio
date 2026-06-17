/**
 * Quiet wayfinding label — a lowercase code-path tag (`/ about`) used
 * consistently as one deliberate system across the page. Not an uppercase
 * tracked eyebrow; it's the navigational index for a long, calm scroll.
 */
export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-body text-xs text-text-muted tracking-tight select-none">
      <span className="text-accent">/</span> {children}
    </span>
  )
}
