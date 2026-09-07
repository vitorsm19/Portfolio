'use client'

import { useEffect, useRef } from 'react'

/**
 * Fine paper grain. Fixed and pointer-events-none so it never sits on a
 * scrolling container (that would repaint the whole layer every frame).
 * It is what stops the flat surfaces from reading as flat.
 */
export function Grain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width: w, height: h } = canvas
    const imageData = ctx.createImageData(w, h)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255
      data[i] = v
      data[i + 1] = v
      data[i + 2] = v
      data[i + 3] = 26
    }

    ctx.putImageData(imageData, 0, 0)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="grain pointer-events-none fixed inset-0 z-[60] h-screen w-screen"
      width={1440}
      height={900}
      aria-hidden="true"
    />
  )
}
