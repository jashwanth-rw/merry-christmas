export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-xl">Creating your magical Christmas card...</p>
      </div>
    </div>
  )
}

