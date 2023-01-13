import toast from 'react-hot-toast'

export const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  const text = e.currentTarget.getAttribute('data-clipboard-text')
  navigator.clipboard.writeText(text as string)

  const message = e.currentTarget.getAttribute('data-clipboard-message') || 'Copied to clipboard!'

  toast(message, {
    duration: 5000
  })
}
