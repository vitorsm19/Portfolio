'use client'

import Image from 'next/image'
import logo from '@/assets/logo.png'
import { InfoIcon, CodeIcon, DocumentIcon, MessageIcon } from '@/components/icons'
import { navigationItems } from '@/data/navigation'
import type { NavItem } from '@/data/navigation'

const iconMap: Record<
  NavItem['iconName'],
  React.ComponentType<{ size?: number; className?: string }>
> = {
  info: InfoIcon,
  code: CodeIcon,
  document: DocumentIcon,
  message: MessageIcon,
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

export function Header() {
  return (
    <header className="w-full bg-bg-primary/80 backdrop-blur-sm relative z-20 shadow-[0_2px_1px_rgba(0,0,0,0.09),0_4px_2px_rgba(0,0,0,0.09),0_8px_4px_rgba(0,0,0,0.09),0_16px_8px_rgba(0,0,0,0.09),0_32px_16px_rgba(0,0,0,0.09)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-8 py-5 lg:py-0 h-auto lg:h-[100px]">
        <Image src={logo} alt="Logo" className="w-28" priority />

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            {navigationItems.map((item) => {
              const Icon = iconMap[item.iconName]

              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    aria-label={`Navigate to ${item.label}`}
                    className="group relative flex items-center justify-center w-[60px] h-[60px] rounded-[60px] cursor-pointer transition-all duration-500 shadow-[0_10px_25px_rgba(0,0,0,0.1)] lg:hover:w-[180px] lg:hover:shadow-none"
                  >
                    {/* Gradient background — fades in on hover (desktop only) */}
                    <span className="absolute inset-0 rounded-[50px] gradient-bg-accent opacity-0 transition-opacity duration-500 lg:group-hover:opacity-100" />

                    {/* Blur glow behind — fades in on hover (desktop only) */}
                    <span className="absolute inset-0 rounded-[50px] gradient-bg-accent opacity-0 blur-[15px] -z-10 transition-opacity duration-500 lg:group-hover:opacity-50" />

                    {/* Icon — visible by default, scales to 0 on desktop hover */}
                    <span className="relative z-10 text-text-heading transition-all duration-500 delay-[250ms] lg:group-hover:scale-0 lg:group-hover:opacity-0 group-hover:text-accent lg:group-hover:text-text-heading">
                      <Icon size={24} />
                    </span>

                    {/* Label — hidden by default, scales in on desktop hover */}
                    <span className="absolute z-10 text-white text-[1.1em] uppercase tracking-[0.1em] font-semibold scale-0 opacity-0 transition-all duration-500 lg:group-hover:scale-100 lg:group-hover:opacity-100 lg:group-hover:delay-[250ms] whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
