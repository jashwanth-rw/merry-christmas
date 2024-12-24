import { FaDownload, FaTwitter, FaInstagram } from 'react-icons/fa'

interface DownloadShareProps {
  cardUrl: string | null;
}

export default function DownloadShare({ cardUrl }: DownloadShareProps) {
  const handleDownload = () => {
    // Implement download logic here
    console.log('Downloading card:', cardUrl)
  }

  const handleShare = (platform: string) => {
    // Implement share logic here
    console.log('Sharing on', platform, 'Card URL:', cardUrl)
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Download & Share</h2>
      <button
        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        onClick={handleDownload}
      >
        <FaDownload className="mr-2" />
        Download Card
      </button>
      <div className="flex space-x-4">
        <button
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          onClick={() => handleShare('Twitter')}
        >
          <FaTwitter className="mr-2" />
          Share on Twitter
        </button>
        <button
          className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center"
          onClick={() => handleShare('Instagram')}
        >
          <FaInstagram className="mr-2" />
          Share on Instagram
        </button>
      </div>
    </div>
  )
}

