'use client'

import { useEffect, useState } from 'react'
import { Filters } from './Filters'
import style from './Home.module.scss'
import { ListCars } from './ListCars'
import { Car } from './interfaces/Car'
import { useSearchParams } from 'next/navigation'
import { getAvaliableCarsService } from '@/services/cars/getAvaliableCars/GetAvaliableCarsService'

interface Props {
  cars: Car[]
}

export function Home({ cars }: Props) {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars)
  const searchParams = useSearchParams()

  async function getFilteredCars(name: string, categoryId: string) {
    const { data } = await getAvaliableCarsService({ name, categoryId })
    setFilteredCars(data.items)
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
      <ListCars cars={filteredCars} />
    </div>
  )
}
