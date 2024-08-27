import { ICar } from '@/models/interfaces/ICar'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { getAllCarsService } from '@/services/cars/getAllCars/GetAllCarsService'
import { useEffect, useState } from 'react'

export function useAllCarList() {
  const [cars, setCars] = useState<ICar[]>([])
  const [loadingCars, setLoadingCars] = useState<boolean>(true)

  const [searchString, setSearchString] = useState<string>('')

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchString.toLowerCase()),
  )

  function getCars() {
    setLoadingCars(true)
    getAllCarsService(httpClientProvider)
      .then(({ data: { items } }) => {
        setCars(items)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoadingCars(false)
      })
  }

  useEffect(() => {
    getCars()
  }, [])

  return {
    cars: filteredCars,
    loadingCars,
    setSearchString,
    searchString,
  }
}
