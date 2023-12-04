'use client'

import { useContext, useEffect, useState } from 'react'
import { Filters } from './Filters'
import style from './Home.module.scss'
import { ListCars } from './ListCars'
import { Car } from './interfaces/Car'
import { useSearchParams } from 'next/navigation'
import { getAvaliableCarsService } from '@/services/cars/getAvaliableCars/GetAvaliableCarsService'
import { AlertContext } from '@/contexts/alertContext'

interface Props {
  cars: Car[]
}

export function Home({ cars }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [filteredCars, setFilteredCars] = useState<Car[]>(cars)
  const searchParams = useSearchParams()
  const [loadingCars, setLoadingCars] = useState<boolean>(false)

  async function getFilteredCars(name: string, categoryId: string) {
    setLoadingCars(true)
    getAvaliableCarsService({ name, categoryId })
      .then(({ data }) => {
        setFilteredCars(data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar buscar carros - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingCars(false)
      })
  }

  useEffect(() => {
    const name = searchParams.get('name') || ''
    const categoryId = searchParams.get('categoryId') || ''

    if (name || categoryId) {
      getFilteredCars(name, categoryId)
    }
  }, [searchParams])

  return (
    <div className={style.carsContainer}>
      <Filters />
      <ListCars loading={loadingCars} cars={filteredCars} />
    </div>
  )
}
