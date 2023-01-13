import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useMemo, useState } from 'react'
import useNfdSearch, { nfdSearchByPrefix } from './NfdLookup.hooks'
import { truncateAddress } from './NfdLookup.utils'
import type { NfdRecordThumbnail } from './NfdLookup.types'
import Tooltip from 'components/Tooltip'
import styles from 'styles/Tooltip.module.css'
import useDebounce from 'hooks/useDebounce'
import { classNames, isValidName } from 'utils'

interface NfdLookupProps {
  value: string
  onChange: (string: string) => void
  className?: string
  placeholder?: string
  exclude?: string | string[]
  limit?: number
}

export default function NfdLookup({
  value,
  onChange,
  className = '',
  placeholder,
  exclude,
  limit = 10
}: NfdLookupProps) {
  const debouncedQuery = useDebounce(value, 500)

  const trimExtension = (name: string) => {
    return name.replace(/\.\w+$|\./gm, '')
  }

  const enableQuery = useMemo(
    () =>
      trimExtension(debouncedQuery).length > 0 &&
      trimExtension(debouncedQuery).length <= 27 &&
      debouncedQuery === value &&
      debouncedQuery.match(/^[a-zA-Z0-9\.]+$/gm) !== null,
    [debouncedQuery, value]
  )

  const { data, isInitialLoading, error } = useNfdSearch({
    params: {
      prefix: trimExtension(debouncedQuery).toLowerCase(),
      limit
    },
    options: {
      enabled: enableQuery,
      keepPreviousData: true
    }
  })

  const showOptions = enableQuery && !isInitialLoading

  const [nfdMatch, setNfdMatch] = useState<NfdRecordThumbnail | null>(null)

  const handleComboBoxChange = (value: string) => {
    const match = data?.find((nfd) => nfd.depositAccount === value)

    if (match) {
      setNfdMatch(match)
    }

    onChange(value)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (nfdMatch) {
      setNfdMatch(null)
    }

    onChange(event.target.value)
  }

  const fetchExactMatch = async (query: string) => {
    const prefix = trimExtension(query).toLowerCase()

    const results = await nfdSearchByPrefix({ prefix, limit })

    return results[0]
  }

  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    if (!isValidName(inputValue)) {
      return
    }

    try {
      const result =
        data?.find((nfd) => nfd.name === inputValue) || (await fetchExactMatch(inputValue))

      const resultAddress = result.depositAccount

      if (!resultAddress) {
        return
      }

      if (exclude) {
        const isExcluded = Array.isArray(exclude)
          ? exclude.includes(resultAddress)
          : resultAddress === exclude

        if (isExcluded) {
          return
        }
      }

      onChange(resultAddress)
    } catch (err) {
      console.error(err)
    }
  }

  const renderOptions = () => {
    const filterData = (result: NfdRecordThumbnail) => {
      const resultAddress = result.depositAccount

      if (!resultAddress) {
        return false
      }

      if (exclude) {
        if (Array.isArray(exclude)) {
          return !exclude.includes(resultAddress)
        }

        return resultAddress !== exclude
      }

      return true
    }

    const suggestions = data?.filter(filterData) || []

    if (error) {
      return (
        <div className="cursor-default select-none relative py-2 px-4 text-gray-500">
          <span className="text-red-500">Error:</span> {error.message}
        </div>
      )
    }

    if (suggestions.length === 0) {
      return (
        <div className="cursor-default select-none relative py-2 px-4 text-gray-500">
          No matches found, try a different name
        </div>
      )
    }

    return suggestions.map((suggestion) => (
      <Combobox.Option key={suggestion.name} value={suggestion.depositAccount} as={Fragment}>
        {({ active }) => (
          <li
            onClick={() => setNfdMatch(suggestion)}
            className={classNames(
              active || suggestion.name === value
                ? 'bg-sky-600 text-white'
                : 'bg-white text-gray-900',
              'cursor-default select-none py-2 px-4 truncate'
            )}
          >
            {suggestion.name}
            {suggestion.depositAccount && (
              <span
                className={classNames(
                  active || suggestion.name === value ? 'text-white/75' : 'text-gray-400',
                  'ml-4'
                )}
              >
                {truncateAddress(suggestion.depositAccount)}
              </span>
            )}
          </li>
        )}
      </Combobox.Option>
    ))
  }

  return (
    <Combobox value={value} onChange={handleComboBoxChange}>
      <div className="relative">
        <div className="relative w-full text-left bg-white rounded-md cursor-default focus:outline-none sm:text-sm">
          <Combobox.Input
            className={classNames(nfdMatch ? 'pr-12' : '', className)}
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoComplete="new-password"
            spellCheck="false"
            placeholder={placeholder}
          />
          {nfdMatch && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
              <a
                href={`https://app.nf.domains/name/${nfdMatch.name}`}
                target="_blank"
                id="nfd-badge"
                className="relative rounded-full overflow-hidden h-7 w-7 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-500 group border-2 border-white"
                rel="noreferrer"
              >
                <Image src="/nfd.svg" alt="NFD" width={400} height={400} />
              </a>
              <Tooltip anchorId="nfd-badge" content={nfdMatch.name} className={styles.custom} />
            </div>
          )}
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {showOptions ? (
            <Combobox.Options className="absolute w-full z-10 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {renderOptions()}
            </Combobox.Options>
          ) : (
            <div />
          )}
        </Transition>
      </div>
    </Combobox>
  )
}
