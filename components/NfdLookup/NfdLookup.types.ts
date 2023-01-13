export interface NfdRecordThumbnail {
  appID?: number
  caAlgo?: string[]
  depositAccount?: string
  name: string
  owner?: string
  parentAppID?: number
  properties?: {
    internal?: { [key: string]: string }
    userDefined?: { [key: string]: string }
    verified?: { [key: string]: string }
  }
  state?: 'available' | 'minting' | 'reserved' | 'forSale' | 'owned'
  unverifiedCa?: { [key: string]: string[] }
  unverifiedCaAlgo?: string[]
}

export type SearchByPrefixParams = {
  prefix: string
  limit?: number
}
