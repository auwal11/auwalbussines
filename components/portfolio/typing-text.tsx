"use client"

import { useEffect, useState } from "react"

interface TypingTextProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
  className?: string
}

export function TypingText({
  words,
  typingSpeed = 75,
  deletingSpeed = 40,
  pauseMs = 1400,
  className,
}: TypingTextProps) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pauseMs)
      return () => clearTimeout(t)
    }

    if (deleting && text === "") {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        )
      },
      deleting ? deletingSpeed : typingSpeed,
    )
    return () => clearTimeout(t)
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pauseMs])

  return (
    <span className={className} aria-live="polite">
      <span className="typing-caret">{text}</span>
    </span>
  )
}
