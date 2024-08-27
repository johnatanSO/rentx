import { IRental } from '@/models/interfaces/IRental'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IFilters } from '../components/screens/Management/AllRentalsManagement/interfaces/IFilters'
import { getAllRentalsService } from '@/services/rentals/getAllRentals/GetAllRentalsService'
import { httpClientProvider } from '@/providers/HttpClientProvider'

export function useAllRentalList() {
  const [rentals, setRentals] = useState<IRental[]>([])
  const [loadingRentals, setLoadingRentals] = useState<boolean>(true)

  const searchParams = useSearchParams()

  function getRentals() {
    setLoadingRentals(true)

    const filters: IFilters = {
      carId: searchParams.get('carId'),
      filterEndDate: searchParams.get('filterEndDate'),
      filterStartDate: searchParams.get('filterStartDate'),
      userId: searchParams.get('userId'),
    }

    getAllRentalsService(filters, httpClientProvider)
      .then(({ data: { items } }) => {
        setRentals(items)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoadingRentals(false)
      })
  }

  useEffect(() => {
    getRentals()
  }, [searchParams])

  return {
    getRentals,
    loadingRentals,
    setLoadingRentals,
    rentals,
  }
}
