export function GradientLabel({
  children,
  tracking = '0.25em',
}: {
  children: React.ReactNode
  tracking?: string
}) {
  return (
    <span
      className="inline-block font-mono text-[11px] font-bold uppercase text-accent"
      style={{ letterSpacing: tracking }}
    >
      {children}
    </span>
  )
}
