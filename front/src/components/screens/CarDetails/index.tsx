'use client'
import { useRouter } from 'next/navigation'
import { Car } from '../Home/interfaces/Car'

type Props = {
  car: Car
}

export function CarDetails({ car }: Props) {
  const router = useRouter()
  return (
    <>
      <button
        type="button"
        onClick={() => {
          router.back()
        }}
      >
        Voltar
      </button>
      <h1>{car.name}</h1>
      <span>{car.dailyRate}</span>
    </>
  )
}
