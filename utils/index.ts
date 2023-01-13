import { convertMicroalgosToAlgos } from './convert'

export * from './convert'
export * from './nfd'

export const classNames = (...classes: Array<string>) => {
  return classes.filter(Boolean).join(' ')
}

export const formatNumber = (number: number, options?: Intl.NumberFormatOptions | undefined) => {
  return new Intl.NumberFormat(undefined, options).format(number)
}

export const formatPrice = (
  price: number,
  isAlgos?: boolean,
  options?: Intl.NumberFormatOptions | undefined
) => {
  const algos = isAlgos ? price : convertMicroalgosToAlgos(price)
  return new Intl.NumberFormat(undefined, options).format(algos)
}

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

  return `${start}...${end}`
}
