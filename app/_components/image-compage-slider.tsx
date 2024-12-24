"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowLeftRight } from 'lucide-react'

interface ImageComparisonSliderProps {
  oldImageSrc: string
  newImageSrc: string
  width: number
  height: number
}

export default function ImageComparisonSlider({ oldImageSrc, newImageSrc, width, height }: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={oldImageSrc}
          alt="Old image"
          width={width}
          height={height}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div
          className="absolute top-0 left-0 h-full overflow-hidden transition-all duration-150 ease-out"
          style={{ width: `${sliderPosition}%` }}
        >
          <Image
            src={newImageSrc}
            alt="New image"
            width={width}
            height={height}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize"
          style={{ WebkitAppearance: 'none', appearance: 'none' }}
        />
        <div
          className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
            <ArrowLeftRight className="w-6 h-6 text-gray-800" />
          </div>
        </div>
      </div>
    </div>
  )
}

