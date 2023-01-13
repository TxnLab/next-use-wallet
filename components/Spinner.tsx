export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{ borderTopColor: 'transparent' }}
        className="w-24 h-24 border-8 border-sky-300 rounded-full animate-spin"
      />
    </div>
  )
}
