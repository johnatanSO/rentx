'use client'

import { Filters } from './Filters'
import style from './Home.module.scss'
import { Car } from './interfaces/Car'
import { ListCars } from '@/components/_ui/ListCars'

interface Props {
  cars: Car[]
}

export function Home({ cars }: Props) {
  return (
    <div className={style.carsContainer}>
      <Filters />

      <ListCars loading={false} cars={cars} />
    </div>
  )
}
