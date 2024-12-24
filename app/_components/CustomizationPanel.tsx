import { useState } from 'react'

interface CustomizationPanelProps {
  onCustomize: (text: string, color: string, size: number) => void
  onGenerate: () => void
}

export default function CustomizationPanel({ onCustomize, onGenerate }: CustomizationPanelProps) {
  const [text, setText] = useState('')
  const [textColor, setTextColor] = useState('#ffffff')
  const [fontSize, setFontSize] = useState(20)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    onCustomize(e.target.value, textColor, fontSize)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value)
    onCustomize(text, e.target.value, fontSize)
  }

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value)
    setFontSize(size)
    onCustomize(text, textColor, size)
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Customize Your Card</h2>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your Message
        </label>
        <textarea
          id="message"
          className="w-full p-2 border rounded-lg"
          rows={4}
          placeholder="Enter your holiday message..."
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div>
        <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-1">
          Text Color
        </label>
        <input
          type="color"
          id="textColor"
          value={textColor}
          onChange={handleColorChange}
          className="w-full h-10 rounded-lg cursor-pointer"
        />
      </div>
      <div>
        <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-1">
          Font Size: {fontSize}px
        </label>
        <input
          type="range"
          id="fontSize"
          min="12"
          max="48"
          value={fontSize}
          onChange={handleFontSizeChange}
          className="w-full"
        />
      </div>
      <button
        className="w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        onClick={onGenerate}
      >
        Generate Card
      </button>
    </div>
  )
}

