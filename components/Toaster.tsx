import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import toast, { Toaster, resolveValue } from 'react-hot-toast'

const Loading = () => (
  <svg
    className="animate-spin h-6 w-6 text-gray-900"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

export default function CustomToaster() {
  const renderIcon = (type: string) => {
    const getIcon = (type: string) => {
      switch (type) {
        case 'success':
          return <CheckCircleIcon className="h-6 w-6 text-green-400" />
        case 'error':
          return <XCircleIcon className="h-6 w-6 text-red-400" />
        case 'loading':
          return <Loading />
        default:
          return null
      }
    }

    if (!['success', 'error', 'loading'].includes(type)) {
      return null
    }

    return <div className="flex-shrink-0">{getIcon(type)}</div>
  }

  return (
    <Toaster position="bottom-right">
      {(t) => (
        <Transition
          appear
          show={t.visible}
          as={Fragment}
          enter="transition transform ease-out duration-300"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-w-md w-full bg-white shadow-2xl rounded-lg pointer-events-auto flex ring-1 ring-gray-900 ring-opacity-5 sm:shadow-lg">
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                {renderIcon(t.type)}

                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <div className="text-sm font-medium text-gray-900">
                    {resolveValue(t.message, t)}
                  </div>
                </div>

                {t.type !== 'loading' && (
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                      onClick={() => toast.dismiss(t.id)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Transition>
      )}
    </Toaster>
  )
}
