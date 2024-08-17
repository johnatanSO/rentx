'use client'

import { Filters } from './Filters'
import style from './Home.module.scss'
import { ListCars } from '@/components/_ui/ListCars'
import { useCarsList } from './hooks/useCarsList'

export function Home() {
  const { cars, loadingGetCars } = useCarsList()

  return (
    <div className={style.carsContainer}>
      <Filters />

      <ListCars
        loading={loadingGetCars}
        cars={cars}
        emptyText="Nenhum carro disponível"
      />
    </div>
  )
}
