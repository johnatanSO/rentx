'use client'

import style from './Home.module.scss'
import { ListCars } from '@/components/_ui/ListCars'
import { useCarsList } from './hooks/useCarsList'
import { FilterCar } from '@/components/_ui/FilterCar'

export function Home() {
  const { cars, loadingGetCars } = useCarsList()

  return (
    <div className={style.carsContainer}>
      <FilterCar />

      <ListCars
        loading={loadingGetCars}
        cars={cars}
        emptyText="Nenhum carro disponível"
      />
    </div>
  )
}
