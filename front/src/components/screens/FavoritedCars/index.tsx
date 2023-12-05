'use client'

import style from './FavoritedCars.module.scss'
import { ListCars } from './ListCars'
import { Car } from './interfaces/Car'

interface Props {
  favoritedCars: Car[]
}

export function FavoritedCars({ favoritedCars }: Props) {
  return (
    <div className={style.carsContainer}>
      <header className={style.headerPage}>
        <h3>Carros favoritos</h3>
      </header>
      <ListCars cars={favoritedCars} />
    </div>
  )
}
