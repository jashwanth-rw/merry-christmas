'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { NavMenu } from "./_components/nav-menu"
import { LoadingProgress } from "./_components/progress"
import Image from 'next/image'
import ImageComparisonSlider from './_components/image-compage-slider'
import RollingProjects from './_components/RollingProjects'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [polling, setPolling] = useState(false)
  const [id, setId] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setIsLoading(true)
      
      // Generate a random string for the id
      const randomString = Math.random().toString(36).substr(2, 9);
      setId(randomString);

      // Call the API to initiate image processing
      const formData = new FormData();
      formData.append('files', e.target.files[0], e.target.files[0].name);
      formData.append('id', randomString);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-image/`, {
          method: 'POST',
          body: formData,
          mode: 'cors', // Ensure CORS is handled
        });

        if (!response.ok) {
          throw new Error('Failed to initiate image processing');
        }

        // Start polling for the status
        setPolling(true);
        pollStatus(randomString);
      } catch (error) {
        console.error('Error initiating image processing:', error);
        setIsLoading(false);
      }
    }
  }

  const pollStatus = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/status/${id}`);
      const data = await response.json();

      if (data.status === 'processing') {
        // Continue polling
        setTimeout(() => pollStatus(id), 5000);
      } else if (data.status === 'done') {
        // Stop polling and fetch the image
        setPolling(false);
        fetchImage(id);
      }
    } catch (error) {
      console.error('Error polling status:', error);
      setPolling(false);
    }
  }

  const fetchImage = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-image/${id}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultImage(url); // Set the URL of the blob as the result image
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching image:', error);
      setIsLoading(false);
    }
  }

  const handleSampleImageSelect = (src: string) => {
    const numMatch = src.match(/\d+/);
    if (numMatch && numMatch[0]) {
      const resultSrc = `/result_sample${numMatch[0]}.png`;
      console.log("Result src is ", resultSrc);
      setIsLoading(true);
      setResultImage(resultSrc);
      setIsLoading(false);
    }
  }

  const handleReset = () => {
    setFile(null)
    setResultImage(null)
    setId(null)
    setPolling(false)
  }

  const sampleImages = [
    '/sample1.jpg',
    '/sample2.jpg',
    '/sample3.jpg',
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className='flex justify-between items-center'>
          <div className="container mx-auto px-4 h-16 flex flex-col items-start justify-center">
            <div className="font-semibold text-lg">AI Greeting Card Generator</div>
            <a href="https://randomwalk.ai"  target="_blank" className="text-xs text-gray-500">by RandomWalk.ai</a>
          </div>
          <NavMenu />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-md mx-auto">
          {!isLoading && !resultImage && (
            <>
              {/* Hero Image */}
              <div className="relative w-full h-64 mb-8">
                <div className="absolute inset-0 flex items-center justify-center ">
                  <div className="absolute w-48 h-48 bg-yellow-300 rounded-blob transform rotate-45"></div>
                  <Image
                    src="/ref.gif"
                    alt="Christmas Card Demo"
                    width={300}
                    height={300}
                    className="relative z-10 rounded-xl"
                    priority
                  />
                </div>
              </div>

              {/* Headings */}
              <h1 className="text-4xl font-bold text-center mb-4">
                Generate your AI Christmas Card
              </h1>
              <p className="text-xl text-center mb-8">
                100% Automatically and <span className="bg-yellow-300 px-2 py-1 rounded">Free</span>
              </p>

              {/* Upload Button */}
              <div className="space-y-8">
                <label className="block">
                  <Button 
                    className="w-full h-14 text-lg bg-blue-500 hover:bg-blue-600"
                    asChild
                  >
                    <div>Upload Image</div>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {/* Sample Images Section */}
                <div className="text-center">
                  <p className="text-gray-600 mb-4">No image? Try one of these:</p>
                  <div className="grid grid-cols-3 gap-4">
                    {sampleImages.map((src, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-200" onClick={() => handleSampleImageSelect(src)}>
                        <Image
                          src={src}
                          alt={`Sample ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {isLoading && (
            <div className="space-y-4">
              {file && (
                <div className="rounded-lg overflow-hidden shadow-lg mb-4">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Selected Image"
                    className="w-full h-auto"
                  />
                </div>
              )}
              <LoadingProgress />
            </div>
          )}
          {
            isLoading && (
              <RollingProjects />
            )
          }
          {resultImage && !isLoading && (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={resultImage}
                  alt="Generated Christmas Card"
                  className="w-full h-auto"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = resultImage
                    link.download = 'christmas-card.png'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                  className="h-12"
                >
                  Download Card
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="h-12"
                >
                  Try New Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
