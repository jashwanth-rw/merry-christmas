import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface ImageUploadProps {
  onUpload: (file: File) => void
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      onUpload(file)
      setPreview(URL.createObjectURL(file))
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    multiple: false
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-red-500 transition-colors"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg text-red-600">Drop the image here...</p>
        ) : (
          <p className="text-lg">
            Drag & drop your family photo here, or click to select a file
          </p>
        )}
      </div>
      {preview && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Uploaded Image Preview:</h3>
          <Image src={preview} alt="Uploaded image preview" width={200} height={200} className="rounded-lg" />
        </div>
      )}
    </div>
  )
}
