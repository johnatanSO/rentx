'use client'
import { useState, useEffect, useContext } from 'react'
import { Filters } from './Filters'
import style from './Home.module.scss'
import { ListCars } from './ListCars'
import { Car } from './interfaces/Car'
import { getAvaliableCarsService } from '@/services/cars/getAvaliableCars/GetAvaliableCarsService'
import { useSearchParams } from 'next/navigation'
import { AlertContext } from '@/contexts/alertContext'

export function Home() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [avaliableCars, setAvaliableCars] = useState<Car[]>([])
  const [loadingAvaliableCars, setLoadingAvaliableCars] =
    useState<boolean>(true)
  const searchParams = useSearchParams()

  async function getAvaliableCars() {
    setLoadingAvaliableCars(true)
    const name = searchParams.get('name') || ''
    const categoryId = searchParams.get('categoryId') || ''

    getAvaliableCarsService({ name, categoryId })
      .then(({ data }) => {
        setAvaliableCars(data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar buscar carros disponíveis - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingAvaliableCars(true)
      })
  }

  useEffect(() => {
    getAvaliableCars()
  }, [searchParams])

  return (
    <div className={style.carsContainer}>
      <Filters />
      <ListCars avaliableCars={avaliableCars} />
    </div>
  )
}
