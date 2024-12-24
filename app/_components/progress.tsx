'use client'

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

export function LoadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1
        if (newProgress === 100) {
          clearInterval(timer)
        }
        return newProgress
      })
    }, 1200) // Updates every 100ms to complete in 10 seconds

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="w-full space-y-2">
      <Progress value={progress} className="w-full" />
      <p className="text-center text-sm text-gray-500">
        Generating your Christmas card... {progress}% (takes ~2mins)
      </p>
    </div>
  )
}

