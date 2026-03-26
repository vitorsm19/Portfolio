'use client'

import { type Project } from '@/data/projects'
import { ExternalLinkIcon } from '@/components/icons'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="w-[280px] sm:w-[300px] flex-shrink-0 snap-start group">
      {/* Cover area */}
      <div className="h-[200px] bg-bg-primary border border-text-muted/20 rounded-t-lg flex flex-col items-center justify-center gap-3 px-6 transition-colors group-hover:border-accent/30">
        <span className="text-text-heading text-xl font-bold text-center leading-tight">
          {project.title}
        </span>
        <div className="flex flex-wrap justify-center gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-wider text-accent/80 border border-accent/20 rounded-full px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="bg-bg-primary border border-t-0 border-text-muted/20 rounded-b-lg p-5 group-hover:border-accent/30 transition-colors">
        <p className="text-text-secondary text-sm mb-5 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          className="text-text-secondary hover:text-accent transition-colors flex items-center gap-1.5 text-sm font-medium"
        >
          <ExternalLinkIcon size={16} />
          <span>Visit website</span>
        </a>
      </div>
    </div>
  )
}
