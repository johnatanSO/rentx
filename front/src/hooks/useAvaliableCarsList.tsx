import { getAvaliableCarsService } from '@/services/cars/getAvaliableCars/GetAvaliableCarsService'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { ICar } from '@/models/interfaces/ICar'

export function useAvaliableCarsList() {
  const [cars, setCars] = useState<ICar[]>([])
  const [loadingGetCars, setLoadingGetCars] = useState<boolean>(true)
  const searchParams = useSearchParams()

  function getAvaliableCars() {
    setLoadingGetCars(true)

    const name = searchParams.get('name')
    const categoryId = searchParams.get('categoryId')

    getAvaliableCarsService({ name, categoryId }, httpClientProvider)
      .then(({ data: { items } }) => {
        setCars(items)
      })
      .catch(() => {
        console.log('Erro ao buscar carros disponíveis')
      })
      .finally(() => {
        setLoadingGetCars(false)
      })
  }

  useEffect(() => {
    getAvaliableCars()
  }, [searchParams])

  return {
    cars,
    loadingGetCars,
  }
}
