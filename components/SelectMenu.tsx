import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment, ReactNode } from 'react'
import { classNames } from 'utils'

interface SelectMenuOption {
  value: string
  label: string | ReactNode
}

interface SelectMenuInterface<T extends SelectMenuOption> {
  label?: string
  selected: T
  setSelected: (selected: T) => void
}

type SelectMenuProps<T extends SelectMenuOption> = (
  | {
      options: Array<T>
      children?: never
    }
  | {
      options?: never
      children: ReactNode
    }
) &
  SelectMenuInterface<T>

export default function SelectMenu<T extends SelectMenuOption>({
  label,
  options = [],
  selected,
  setSelected,
  children
}: SelectMenuProps<T>) {
  const renderOptions = () => {
    if (children) {
      return children
    }

    return options.map((option) => (
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
              className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
            >
              {option.label}
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
    ))
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {label}
            </Listbox.Label>
          )}

          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm">
              <span className="block truncate">{selected.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {renderOptions()}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
