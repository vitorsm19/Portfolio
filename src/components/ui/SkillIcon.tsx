import { type Skill } from '@/data/skills'

interface SkillIconProps {
  skill: Skill
  size?: 'primary' | 'secondary'
  className?: string
}

export function SkillIcon({ skill, size = 'primary', className }: SkillIconProps) {
  const isPrimary = size === 'primary'

  return (
    <div
      className={`flex flex-col items-center justify-end gap-0 ${className ?? ''}`}
    >
      <svg
        viewBox={skill.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={skill.label}
        className={
          isPrimary
            ? 'w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[72px] lg:h-[72px]'
            : 'w-[22px] h-[22px] sm:w-[24px] sm:h-[24px]'
        }
        dangerouslySetInnerHTML={{ __html: skill.svgContent }}
      />
      <span
        className={
          isPrimary
            ? 'mt-2 text-xs lg:text-sm text-text-primary/80 font-medium'
            : 'mt-1 text-[9px] text-text-primary/60'
        }
      >
        {skill.label}
      </span>
    </div>
  )
}
