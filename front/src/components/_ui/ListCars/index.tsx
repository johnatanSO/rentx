import { EmptyItems } from '@/components/_ui/EmptyItems'
import { Car } from './interfaces/Car'
import { CarItem } from './CarItem'
import style from './ListCars.module.scss'

type Props = {
  cars: Car[]
  loading: boolean
  emptyText?: string
}

export function ListCars({ cars, loading, emptyText }: Props) {
  return (
    <ul className={style.listCarsContainer}>
      {(!cars || cars.length === 0) && !loading && (
        <EmptyItems text={emptyText || 'Nenhum carro disponível'} />
      )}

      {cars.length > 0 &&
        cars.map((car) => {
          return (
            <CarItem
              key={car._id}
              carId={car._id}
              defaultImage={car.defaultImage}
              name={car.name}
              dailyRate={car.dailyRate}
              specifications={car.specifications}
              transmission={car.transmission}
            />
          )
        })}
    </ul>
  )
}
