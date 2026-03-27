import { type Skill } from '@/data/skills'

interface SkillIconProps {
  skill: Skill
  size?: 'primary' | 'secondary'
  className?: string
}

export function SkillIcon({ skill, size = 'primary', className }: SkillIconProps) {
  const isPrimary = size === 'primary'

  return (
    <div className={`flex flex-col items-center justify-end gap-0 ${className ?? ''}`}>
      <svg
        viewBox={skill.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={skill.label}
        className={
          isPrimary ? 'w-12.5 h-12.5 sm:w-15 sm:h-15 lg:w-18 lg:h-18' : 'w-5.5 h-5.5 sm:w-6 sm:h-6'
        }
        dangerouslySetInnerHTML={{ __html: skill.svgContent }}
      />
    </div>
  )
}
