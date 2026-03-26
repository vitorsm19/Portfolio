import { useState, useEffect, useCallback } from 'react'

interface UseTypewriterOptions {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
  loop?: boolean
}

export function useTypewriter({
  words,
  typeSpeed = 100,
  deleteSpeed = 60,
  delaySpeed = 3000,
  loop = true,
}: UseTypewriterOptions): string {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const currentWord = words[wordIndex] ?? ''

  const handleTyping = useCallback(() => {
    if (isPaused) {
      return
    }

    if (!isDeleting) {
      // Typing forward
      if (text.length < currentWord.length) {
        setText(currentWord.slice(0, text.length + 1))
      } else {
        // Finished typing the word — pause before deleting
        setIsPaused(true)
      }
    } else {
      // Deleting backward
      if (text.length > 0) {
        setText(currentWord.slice(0, text.length - 1))
      } else {
        // Finished deleting — advance to next word
        setIsDeleting(false)
        const nextIndex = wordIndex + 1

        if (nextIndex < words.length) {
          setWordIndex(nextIndex)
        } else if (loop) {
          setWordIndex(0)
        }
      }
    }
  }, [text, currentWord, isDeleting, isPaused, wordIndex, words.length, loop])

  // Main typing loop
  useEffect(() => {
    if (isPaused) {
      return
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed
    const timeout = setTimeout(handleTyping, speed)

    return () => clearTimeout(timeout)
  }, [handleTyping, isDeleting, isPaused, typeSpeed, deleteSpeed])

  // Pause at end of word before deleting
  useEffect(() => {
    if (!isPaused) {
      return
    }

    const timeout = setTimeout(() => {
      setIsPaused(false)
      setIsDeleting(true)
    }, delaySpeed)

    return () => clearTimeout(timeout)
  }, [isPaused, delaySpeed])

  return text
}
