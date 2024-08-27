'use client'

import style from './Home.module.scss'
import { ListCars } from '@/components/_ui/ListCars'
import { useAvaliableCarsList } from '../../../hooks/useAvaliableCarsList'
import { FilterCar } from '@/components/_ui/FilterCar'

export function Home() {
  const { cars, loadingGetCars } = useAvaliableCarsList()

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
