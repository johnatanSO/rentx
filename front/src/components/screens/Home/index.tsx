'use client'
import { useState, useEffect } from 'react'
import { Filters } from './Filters'
import style from './Home.module.scss'
import { ListCars } from './ListCars'
import { Car } from './interfaces/Car'
import { getAvaliableCarsService } from '@/services/cars/getAvaliableCars/GetAvaliableCarsService'
import { useSearchParams } from 'next/navigation'

export function Home() {
  const [avaliableCars, setAvaliableCars] = useState<Car[]>([])
  const searchParams = useSearchParams()

  async function getAvaliableCars() {
    const name = searchParams.get('name') || ''
    const categoryId = searchParams.get('categoryId') || ''

    const { data } = await getAvaliableCarsService({ name, categoryId })
    setAvaliableCars(data.items)
  }

  useEffect(() => {
    getAvaliableCars()
  }, [searchParams])

  return (
    <div className={style.carsContainer}>
      <h3>Dirija o carro dos seus sonhos</h3>
      <Filters />
      <ListCars avaliableCars={avaliableCars} />
    </div>
  )
}
