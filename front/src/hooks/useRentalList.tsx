import { IRental } from '@/models/interfaces/IRental'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { getRentalsService } from '@/services/rentals/getRentals/GetRentalsService'
import { useEffect, useState } from 'react'

export function useRentalList() {
  const [rentals, setRentals] = useState<IRental[]>([])
  const [loadingRentals, setLoadingRentals] = useState<boolean>(true)

  function getRentals() {
    setLoadingRentals(true)
    getRentalsService(httpClientProvider)
      .then(({ data: { items } }) => {
        setRentals(items)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoadingRentals(false)
      })
  }

  useEffect(() => {
    getRentals()
  }, [])

  return {
    rentals,
    loadingRentals,
    getRentals,
    setLoadingRentals,
  }
}
