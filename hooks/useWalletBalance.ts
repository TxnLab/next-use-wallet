import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@txnlab/use-wallet'
import { useEffect, useState } from 'react'
import algodClient from 'lib/algodClient'
import { formatPrice } from 'utils'

export default function useWalletBalance() {
  const [walletBalance, setWalletBalance] = useState<string | null>(null)
  const [walletAvailableBalance, setWalletAvailableBalance] = useState<string | null>(null)

  const { activeAccount } = useWallet()

  const getAccountInfo = async () => {
    if (!activeAccount) throw new Error('No selected account.')
    const accountInfo = await algodClient.accountInformation(activeAccount.address).do()

    return accountInfo
  }

  const { data: accountInfo } = useQuery(['balance', activeAccount?.address], getAccountInfo, {
    enabled: !!activeAccount?.address,
    refetchInterval: 30000
  })

  useEffect(() => {
    if (
      accountInfo &&
      accountInfo.amount !== undefined &&
      accountInfo['min-balance'] !== undefined
    ) {
      const balance = formatPrice(accountInfo.amount, false, { minimumFractionDigits: 6 })
      const availableBalance = formatPrice(accountInfo.amount - accountInfo['min-balance'], false, {
        minimumFractionDigits: 6
      })

      if (balance !== walletBalance) {
        setWalletBalance(balance)
        return
      }

      if (parseFloat(availableBalance) < 0) {
        setWalletAvailableBalance('0.000000')
        return
      }

      if (availableBalance !== walletAvailableBalance) {
        setWalletAvailableBalance(availableBalance)
        return
      }
    } else {
      setWalletBalance('0.000000')
      setWalletAvailableBalance('0.000000')
    }
  }, [accountInfo, walletBalance, walletAvailableBalance])

  return {
    walletBalance,
    walletAvailableBalance
  }
}
