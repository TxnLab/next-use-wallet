import Big from 'big.js'

export type RoundingMode = 'roundDown' | 'roundUp' | 'roundHalfUp' | 'roundHalfEven'

/**
 * Converts an amount in microalgos to Algos:
 * ```
 * microalgos / (10 ^ 6)
 * ```
 * @example
 * // returns 420.69
 * convertMicroalgosToAlgos(420690000)
 *
 * @param microalgos
 * @param rm Big.js rounding mode {@link https://mikemcl.github.io/big.js/#rm}
 * @returns `microalgos` converted to Algos
 */
export const convertMicroalgosToAlgos = (microalgos: number, rm: RoundingMode = 'roundDown') => {
  const divisor = new Big(10).pow(6)
  return new Big(microalgos).div(divisor).round(6, Big[rm]).toNumber()
}

/**
 * Converts an amount in Algos to microalgos:
 * ```
 * algos * (10 ^ 6)
 * ```
 * @example
 * // returns 420690000
 * convertAlgosToMicroalgos(420.69)
 *
 * @param algos
 * @param rm Big.js rounding mode {@link https://mikemcl.github.io/big.js/#rm}
 * @returns `algos` converted to microalgos
 */
export const convertAlgosToMicroalgos = (algos: number, rm: RoundingMode = 'roundDown') => {
  const multiplier = new Big(10).pow(6)
  return new Big(algos).times(multiplier).round(0, Big[rm]).toNumber()
}

/**
 * Converts an amount in USD to microalgos:
 * ```
 * (usd / algoUsd) * (10 ^ 6)
 * ```
 * @example
 * // returns 420690000
 * convertUsdToMicroalgos(89.60, 0.213)
 *
 * @param usd
 * @param algoUsd current ALGO/USD price
 * @param rm Big.js rounding mode {@link https://mikemcl.github.io/big.js/#rm}
 * @returns `usd` converted to microalgos
 */
export const convertUsdToMicroalgos = (
  usd: number,
  algoUsd: number,
  rm: RoundingMode = 'roundDown'
) => {
  const algos = new Big(usd).div(algoUsd).round(6, Big[rm]).toNumber()
  return convertAlgosToMicroalgos(algos)
}

/**
 * Converts an amount in microalgos to USD:
 * ```
 * (microalgos / (10 ^ 6)) * algoUsd
 * ```
 * @example
 * // returns 89.60
 * convertMicroalgosToUsd(420690000, 0.213)
 *
 * @param microalgos
 * @param algoUsd current ALGO/USD price
 * @param rm Big.js rounding mode {@link https://mikemcl.github.io/big.js/#rm}
 * @returns `microalgos` converted to USD
 */
export const convertMicroalgosToUsd = (
  microalgos: number,
  algoUsd: number,
  rm: RoundingMode = 'roundDown'
) => {
  const algos = convertMicroalgosToAlgos(microalgos)
  return new Big(algos).times(algoUsd).round(2, Big[rm]).toNumber()
}

/**
 * Converts an amount in USD to cents:
 * ```
 * usd * 100
 * ```
 * @example
 * // returns 42069
 * convertUsdToCents(420.69)
 *
 * @param usd
 * @param rm Big.js rounding mode {@link https://mikemcl.github.io/big.js/#rm}
 * @returns `usd` converted to cents
 */
export const convertUsdToCents = (usd: number, rm: RoundingMode = 'roundDown') => {
  return new Big(usd).times(100).round(0, Big[rm]).toNumber()
}

/**
 * Converts an amount in cents to USD:
 * ```
 * cents / 100
 * ```
 * @example
 * // returns 420.69
 * convertCentsToUsd(42069)
 *
 * @param cents
 * @param rm Big.js rounding mode {@link https://mikemcl.github.io/big.js/#rm}
 * @returns `cents` converted to USD
 */
export const convertCentsToUsd = (cents: number, rm: RoundingMode = 'roundDown') => {
  return new Big(cents).div(100).round(2, Big[rm]).toNumber()
}

/**
 * Converts an amount in cents to microalgos:
 * ```
 * ((cents / 100) / algoUsd) * (10 ^ 6)
 * ```
 * @example
 * // returns 1975070422
 * convertCentsToMicroalgos(42069, 0.213)
 *
 * @param cents
 * @param algoUsd current ALGO/USD price
 * @param rm Big.js rounding mode {@link https://mikemcl.github.io/big.js/#rm}
 * @returns `cents` converted to microalgos
 */
export const convertCentsToMicroalgos = (
  cents: number,
  algoUsd: number,
  rm: RoundingMode = 'roundDown'
) => {
  const usd = new Big(cents).div(100).round(2, Big[rm]).toNumber()
  return convertUsdToMicroalgos(usd, algoUsd)
}
