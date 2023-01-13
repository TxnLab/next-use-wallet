import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { NfdRecordThumbnail, SearchByPrefixParams } from './NfdLookup.types'

export const nfdSearchByPrefix = async (params: SearchByPrefixParams) => {
  const { data } = await axios({
    url: 'https://api.nf.domains/nfd',
    method: 'get',
    params: {
      ...params,
      view: 'thumbnail'
    }
  })

  return data
}

interface UseNfdSearch {
  params: SearchByPrefixParams
  options?: UseQueryOptions<Array<NfdRecordThumbnail>, AxiosError>
}

export default function useNfdSearch({ params, options }: UseNfdSearch) {
  const result = useQuery<Array<NfdRecordThumbnail>, AxiosError>(
    ['nfd-search', { params }],
    () => nfdSearchByPrefix(params),
    {
      ...options
    }
  )

  return result
}
