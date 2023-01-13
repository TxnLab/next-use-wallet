import { ArrowTopRightOnSquareIcon, ClipboardIcon } from '@heroicons/react/20/solid'
import { useWallet } from '@txnlab/use-wallet'
import Image from 'next/image'
import Tooltip from 'components/Tooltip'
import tooltipStyles from 'styles/Tooltip.module.css'
import useWalletBalance from 'hooks/useWalletBalance'
import { copyToClipboard } from 'utils/clipboard'

export default function Account() {
  const { activeAccount, providers } = useWallet()

  const { walletBalance, walletAvailableBalance } = useWalletBalance()

  const activeProvider = providers?.find(
    (provider) => provider.metadata.id === activeAccount?.providerId
  )

  if (!activeAccount) {
    return null
  }

  return (
    <div className="overflow-hidden bg-white shadow rounded-lg">
      <div className="p-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Active Account</h3>
      </div>
      <div className="border-t border-gray-200 px-5 py-2 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:grid sm:grid-cols-5 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="inline-flex items-center text-sm font-medium text-gray-500">Name</dt>
            <dd className="text-gray-900 sm:col-span-4 truncate">{activeAccount.name}</dd>
          </div>
          <div className="py-3 sm:grid sm:grid-cols-5 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="inline-flex items-center text-sm font-medium text-gray-500">Address</dt>
            <dd className="text-gray-900 sm:col-span-4 flex items-center min-w-0">
              <span className="truncate">{activeAccount.address}</span>
              <div className="flex items-center flex-nowrap -my-1">
                <div className="inline-flex -space-x-px rounded-md shadow-sm ml-3 sm:ml-4">
                  <a
                    href={`https://algoexplorer.io/address/${activeAccount.address}`}
                    className="relative inline-flex items-center first:rounded-l-md last:rounded-r-md border border-gray-300 bg-gray-50 px-3.5 py-2.5 sm:px-2.5 sm:py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:z-20 outline-brand-500"
                    target="_blank"
                    rel="noreferrer"
                    id="view-on-algoexplorer"
                    data-tooltip-content="View on AlgoExplorer"
                  >
                    <span className="sr-only">View on AlgoExplorer</span>
                    <ArrowTopRightOnSquareIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    className="relative inline-flex items-center first:rounded-l-md last:rounded-r-md border border-gray-300 bg-gray-50 px-3.5 py-2.5 sm:px-2.5 sm:py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:z-20 outline-brand-500"
                    data-clipboard-text={activeAccount.address}
                    data-clipboard-message="Address copied to clipboard"
                    onClick={copyToClipboard}
                    id="copy-address"
                    data-tooltip-content="Copy address"
                  >
                    <span className="sr-only">Copy address</span>
                    <ClipboardIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <Tooltip anchorId="view-on-algoexplorer" className={tooltipStyles.custom} />
              <Tooltip anchorId="copy-address" className={tooltipStyles.custom} />
            </dd>
          </div>
          <div className="py-3 sm:grid sm:grid-cols-5 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="inline-flex items-center text-sm font-medium text-gray-500">Balance</dt>
            <dd className="inline-flex items-center text-gray-900 sm:col-span-4 truncate">
              <strong className="block font-semibold">{walletBalance}</strong>
              {walletAvailableBalance !== walletBalance && (
                <>
                  <span className="mx-3 text-gray-500">/</span>
                  <span
                    id="available-balance"
                    data-tooltip-content="Available balance"
                    className="block text-gray-500"
                  >
                    {walletAvailableBalance}
                  </span>
                  <Tooltip anchorId="available-balance" className={tooltipStyles.custom} />
                </>
              )}
            </dd>
          </div>
          <div className="py-3 sm:grid sm:grid-cols-5 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="sm:inline-flex sm:items-center text-sm font-medium text-gray-500">
              Provider
            </dt>
            <dd className="inline-flex items-center text-gray-900 sm:col-span-4">
              {activeProvider && (
                <>
                  <Image
                    width={40}
                    height={40}
                    alt={activeProvider.metadata.name}
                    src={activeProvider.metadata.icon}
                    className="h-8 w-8 mr-3 my-1 sm:-my-2 flex-shrink-0 rounded-full bg-white"
                  />
                  {activeProvider.metadata.name}
                </>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
