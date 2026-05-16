"use client"

import { createElement, type CSSProperties, type ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

interface RevealProps {
  children: ReactNode
  delayMs?: number
  className?: string
  as?: "div" | "li" | "section" | "article"
  from?: "up" | "left"
}

export function Reveal({
  children,
  delayMs = 0,
  className = "",
  as = "div",
  from = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const transform = from === "left" ? "translateX(-32px)" : "translateY(20px)"

  const style: CSSProperties = {
    transitionDelay: `${delayMs}ms`,
    transform: visible ? "none" : transform,
    opacity: visible ? 1 : 0,
  }

  return createElement(
    as,
    {
      ref,
      style,
      className: `transition-[opacity,transform] duration-700 ease-out will-change-transform ${className}`,
    },
    children,
  )
}
