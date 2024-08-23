'use client'

import { ListCars } from '@/components/_ui/ListCars'
import style from './FavoritedCars.module.scss'
import { ICar } from '@/models/interfaces/ICar'

interface Props {
  favoritedCars: ICar[]
}

export function FavoritedCars({ favoritedCars }: Props) {
  return (
    <div className={style.carsContainer}>
      <header className={style.headerPage}>
        <h3>Carros favoritos</h3>
      </header>

      <ListCars
        emptyText="Nenhum carro adicionado aos favoritos ainda"
        cars={favoritedCars}
        loading={false}
      />
    </div>
  )
}
