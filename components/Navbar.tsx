import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { ReactNode } from 'react'

export default function Navbar() {
  const { data, isLoading, error } = useQuery(['ver'], () =>
    fetch('/api/version').then((res) => res.json())
  )

  const renderGitHubLink = () => {
    const Link = (props: { children: ReactNode }) => (
      <a
        href="https://github.com/TxnLab/use-wallet"
        className="rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-sky-400"
        target="_blank"
        rel="noreferrer"
      >
        {props.children}
      </a>
    )

    if (isLoading) {
      return null
    }

    if (error) {
      return <Link>View on GitHub</Link>
    }

    return <Link>Version {data.version}</Link>
  }

  return (
    <nav className="bg-sky-500" aria-label="Global">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center px-2 w-full justify-between sm:w-auto sm:justify-start lg:px-0">
            <div className="flex flex-shrink-0 items-center">
              <Image
                src="/use-wallet.svg"
                alt="UseWallet"
                width={640}
                height={107}
                className="h-5 w-auto"
              />
            </div>

            <div className="ml-8 lg:flex lg:space-x-4">{renderGitHubLink()}</div>
          </div>
        </div>
      </div>
    </nav>
  )
}
