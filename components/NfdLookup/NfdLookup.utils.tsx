type TruncateAddressOptions = {
  startChars?: number
  endChars?: number
}

export const truncateAddress = (addr: string | undefined, options: TruncateAddressOptions = {}) => {
  if (!addr) {
    return ''
  }

  const { startChars = 6, endChars = 4 } = options

  const start = addr.slice(0, startChars)
  const end = addr.slice(addr.length - endChars)

  return (
    <>
      {start}&hellip;{end}
    </>
  )
}
