import { Listbox } from '@headlessui/react'
import { BoltIcon, CheckIcon, SignalIcon, SignalSlashIcon } from '@heroicons/react/20/solid'
import { Provider, PROVIDER_ID, useWallet } from '@txnlab/use-wallet'
import Image from 'next/image'
import { useMemo } from 'react'
import SelectMenu from 'components/SelectMenu'
import { classNames } from 'utils'

export default function Connect() {
  const { providers, activeAccount } = useWallet()

  const renderActiveAccount = (provider: Provider) => {
    if (
      !provider.isActive ||
      !activeAccount ||
      !provider.accounts.find((acct) => acct.address === activeAccount.address)
    ) {
      return null
    }

    if (provider.metadata.id === PROVIDER_ID.MYALGO) {
      const options = provider.accounts.map((account) => ({
        value: account.address,
        label: (
          <>
            <span className="inline-flex items-center rounded bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 mr-3">
              {account.name}
            </span>
            <span className="text-sm">{account.address}</span>
          </>
        ),
        account
      }))

      const selected =
        options.find((option) => option.value === activeAccount.address) || options[0]

      return (
        <SelectMenu
          selected={selected}
          setSelected={(selected) => provider.setActiveAccount(selected.value)}
        >
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              className={({ active }) =>
                classNames(
                  active ? 'text-white bg-sky-600' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-3 pr-10'
                )
              }
              value={option}
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={classNames(
                      selected ? 'font-semibold' : 'font-normal',
                      'block truncate'
                    )}
                  >
                    <span
                      className={classNames(
                        selected && active
                          ? 'bg-sky-700 text-white'
                          : selected
                          ? 'bg-gray-100 text-gray-800'
                          : active
                          ? 'bg-sky-600 text-white'
                          : 'bg-white text-gray-800',
                        'inline-flex items-center rounded px-2.5 py-0.5 text-sm font-medium mr-3'
                      )}
                    >
                      {option.account.name}
                    </span>
                    <span className="text-sm">{option.account.address}</span>
                  </span>

                  {selected ? (
                    <span
                      className={classNames(
                        active ? 'text-white' : 'text-sky-600',
                        'absolute inset-y-0 right-0 flex items-center pr-3'
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </SelectMenu>
      )
    }

    const account = provider.accounts[0]

    if (!account) {
      return null
    }

    return (
      <div
        className={classNames(
          !provider.isActive ? 'opacity-50 pointer-events-none' : '',
          'mt-1 flex items-center w-full rounded-md border-2 border-transparent py-2 sm:text-sm'
        )}
      >
        <span className="truncate">
          <span className="inline-flex items-center rounded bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 mr-3">
            {account.name}
          </span>
          <span className="text-sm">{account.address}</span>
        </span>
      </div>
    )
  }

  const showSetActiveButtons = useMemo(() => {
    if (!providers) return false

    const areMultipleConnected = providers?.filter((provider) => provider.isConnected).length > 1
    const areNoneActive = !Object.values(providers).some((provider) => provider.isActive)

    return areMultipleConnected || areNoneActive
  }, [providers])

  const renderActions = (provider: Provider) => {
    const showSetActiveButton = showSetActiveButtons && provider.isConnected

    return (
      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="flex w-0 flex-1">
          {provider.isConnected ? (
            <button
              type="button"
              onClick={provider.disconnect}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              <SignalSlashIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              <span className="ml-3">Disconnect</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={provider.connect}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              <SignalIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
              <span className="ml-3">Connect</span>
            </button>
          )}
        </div>

        {showSetActiveButton && (
          <div className="-ml-px flex w-0 flex-1">
            <button
              type="button"
              onClick={provider.setActiveProvider}
              className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500 disabled:opacity-50 disabled:text-gray-700 group"
              disabled={provider.isActive}
            >
              <BoltIcon
                className="h-5 w-5 text-yellow-400 group-disabled:text-gray-300"
                aria-hidden="true"
              />
              <span className="ml-3">Set Active</span>
            </button>
          </div>
        )}
      </div>
    )
  }

  const renderCard = (provider: Provider) => {
    return (
      <li
        key={provider.metadata.id}
        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
      >
        <div className="px-5 py-3 sm:px-6 sm:py-4">
          {/* Provider name and icon */}
          <div className="flex w-full items-start justify-between">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="flex items-center truncate sm:text-lg font-medium text-gray-900 h-8 sm:h-10">
                  {provider.metadata.name}
                </h3>
                {provider.isActive && (
                  <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                )}
              </div>
            </div>
            <Image
              width={40}
              height={40}
              alt={provider.metadata.name}
              src={provider.metadata.icon}
              className="h-8 w-8 sm:h-10 sm:w-10 sm:-mr-2 flex-shrink-0 rounded-full bg-white"
            />
          </div>

          {/* Active account(s) */}
          <div
            className={classNames(
              !provider.isConnected ? 'hidden sm:block sm:invisible' : '',
              'mt-5 sm:mt-6 sm:h-10'
            )}
          >
            <label className="sr-only">Active account for {provider.metadata.name}</label>
            {renderActiveAccount(provider)}
          </div>
        </div>

        {/* Action(s) */}
        <div>{renderActions(provider)}</div>
      </li>
    )
  }

  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {providers?.map(renderCard)}
    </ul>
  )
}
