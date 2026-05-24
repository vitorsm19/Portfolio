'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

/**
 * Discrete sun/moon toggle in the navbar.
 *
 * Both icons render at all times; CSS in globals.css fades between them
 * based on `:root[data-theme="light"]`. This avoids any client-state flash
 * during hydration — the icon shown on first paint already matches the
 * theme the bootstrap script set in <head>.
 *
 * React state only exists to keep the aria-label in sync (and to observe
 * external theme changes, e.g. if multiple tabs sync via localStorage).
 */
export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const sync = () => {
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light')
    }
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const current =
      document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
    const next = current === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }

  return (
    <button
      type="button"
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      title={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      onClick={toggle}
      className="theme-toggle-btn relative inline-flex w-4 h-4 items-center justify-center cursor-pointer"
    >
      {/* Sun — shown in dark theme (click to go light) */}
      <svg
        className="theme-icon theme-icon-sun"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>

      {/* Moon — shown in light theme (click to go dark) */}
      <svg
        className="theme-icon theme-icon-moon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  )
}
