import Image from 'next/image'

interface TemplateSelectionProps {
  onSelect: (template: string) => void
}

const templates = [
  { id: 'template1', name: 'Winter Wonderland', thumbnail: '/templates/template1.jpg' },
  { id: 'template2', name: 'Cozy Fireplace', thumbnail: '/templates/template2.jpg' },
  { id: 'template3', name: 'Festive Tree', thumbnail: '/templates/template3.jpg' },
]
export default function TemplateSelection({ onSelect }: TemplateSelectionProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Choose a Template</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="cursor-pointer group"
            onClick={() => onSelect(template.id)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={template.thumbnail}
                alt={template.name}
                width={200}
                height={150}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-center">{template.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
