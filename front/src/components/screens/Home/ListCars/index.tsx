import { Car } from '../interfaces/Car'
import { CarItem } from './CarItem'
import style from './ListCars.module.scss'

type Props = {
  avaliableCars: Car[]
}

export function ListCars({ avaliableCars }: Props) {
  return (
    <ul className={style.listCarsContainer}>
      {(!avaliableCars || avaliableCars.length === 0) && (
        <p>Nenhum carro disponível</p>
      )}

      {avaliableCars.length > 0 &&
        avaliableCars.map((car) => {
          return (
            <CarItem
              key={car._id}
              carId={car._id}
              images={car.images}
              name={car.name}
              dailyRate={car.dailyRate}
              specifications={car.specifications}
            />
          )
        })}
    </ul>
  )
}
