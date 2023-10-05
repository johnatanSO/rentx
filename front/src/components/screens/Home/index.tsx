'use client'
import { useState, useEffect } from 'react'
import { Filters } from './Filters'
import style from './Home.module.scss'
import { ListCars } from './ListCars'
import { Car } from './interfaces/Car'
import { getAvaliableCarsService } from '@/services/cars/getAvaliableCars/GetAvaliableCarsService'
import { useRouter } from 'next/router'

export function Home() {
  const router = useRouter()
  const [avaliableCars, setAvaliableCars] = useState<Car[]>([])

  async function getAvaliableCars() {
    const { data } = await getAvaliableCarsService()
    setAvaliableCars(data.items)
  }

  useEffect(() => {
    getAvaliableCars()
  }, [router.query])

  return (
    <div className={style.carsContainer}>
      <h3>Dirija o carro dos seus sonhos</h3>
      <Filters />
      <ListCars avaliableCars={avaliableCars} />
    </div>
  )
}
