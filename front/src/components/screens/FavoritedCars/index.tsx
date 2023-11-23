'use client'

import { useContext } from 'react'
import style from './FavoritedCars.module.scss'
import { ListCars } from './ListCars'
import { UserContext } from '@/contexts/userContext'

export function FavoritedCars() {
  const { userInfo } = useContext(UserContext)
  const favoritedCars: any[] = userInfo?.favoriteCars || []
  console.log('FAV CARS', favoritedCars)

  return (
    <div className={style.carsContainer}>
      <header className={style.headerPage}>
        <h3>Carros favoritos</h3>
      </header>
      <ListCars cars={favoritedCars} />
    </div>
  )
}
