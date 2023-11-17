'use client'

import { Car } from './interfaces/Car'
import style from './Favoriteds.module.scss'
import { ListCars } from '../Home/ListCars'
interface ServerProps {
  favoriteds: Car[]
}

export function Favoriteds({ favoriteds }: ServerProps) {
  console.log('favoriteds', favoriteds)
  return (
    <div className={style.favoritedsContainer}>
      <header>
        <h3>Carros favoritos</h3>
      </header>
      <ListCars cars={favoriteds} />
    </div>
  )
}
