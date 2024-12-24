import { useEffect, useState } from 'react'
import { Stage, Layer, Image, Text } from 'react-konva'
import useImage from 'use-image'

interface PreviewProps {
  image: File | null
  template: string | null
  customText: string
  textColor: string
  fontSize: number
}

export default function Preview({ image, template, customText, textColor, fontSize }: PreviewProps) {
  const [uploadedImage] = useImage(image ? URL.createObjectURL(image) : '')
  const [templateImage] = useImage(template ? `/templates/${template}.jpg` : '')
  const [stageSize, setStageSize] = useState({ width: 400, height: 300 })

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(400, window.innerWidth - 40)
      setStageSize({ width, height: width * 0.75 })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Preview</h2>
      <div className="border rounded-lg overflow-hidden">
        <Stage width={stageSize.width} height={stageSize.height}>
          <Layer>
            {templateImage && (
              <Image
                image={templateImage}
                width={stageSize.width}
                height={stageSize.height}
              />
            )}
            {uploadedImage && (
              <Image
                image={uploadedImage}
                width={stageSize.width / 2}
                height={stageSize.height / 2}
                x={stageSize.width / 4}
                y={stageSize.height / 4}
                draggable
              />
            )}
            <Text
              text={customText}
              fontSize={fontSize * (stageSize.width / 400)}
              fill={textColor}
              x={20}
              y={stageSize.height - 60}
              width={stageSize.width - 40}
              align="center"
            />
          </Layer>
        </Stage>
      </div>
    </div>
  )
}

