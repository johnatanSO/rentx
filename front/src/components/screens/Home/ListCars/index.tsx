import { Car } from '../interfaces/Car'
import style from './ListCars.module.scss'

type Props = {
  avaliableCars: Car[]
}

export function ListCars({ avaliableCars }: Props) {
  return (
    <ul className={style.listCarsContainer}>
      {avaliableCars.map((car) => {
        return <li key={car._id}>{car.name}</li>
      })}
    </ul>
  )
}
