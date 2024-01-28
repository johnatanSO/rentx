'use client'

import { getAvaliableCarsService } from '@/services/cars/getAvaliableCars/GetAvaliableCarsService'
import { Filters } from './Filters'
import style from './Home.module.scss'
import { Car } from './interfaces/Car'
import { ListCars } from '@/components/_ui/ListCars'
import { useEffect, useState } from 'react'

export function Home() {
  const [cars, setCars] = useState<Car[]>([])
  const [loadingGetCars, setLoadingGetCars] = useState<boolean>(true)

  // Esta e outras funções estavam sendo executadas no SRR, porém, como estou
  // utilizando o mongoDB atlas, ele tem um 'delay' de alguns segundos na
  // primeira requisição, e aí por conta desse delay, ocorre um erro na hora
  // do deploy na vercel.
  function getAvaliableCars() {
    setLoadingGetCars(true)
    getAvaliableCarsService({ name: '', categoryId: '' })
      .then(({ data: { items } }) => {
        setCars(items)
      })
      .catch(() => {
        console.log('Erro ao buscar carros disponíveis')
      })
      .finally(() => {
        setLoadingGetCars(false)
      })
  }

  useEffect(() => {
    getAvaliableCars()
  }, [])

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
