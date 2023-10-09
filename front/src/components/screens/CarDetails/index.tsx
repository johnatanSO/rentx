import { Car } from '../Home/interfaces/Car'

type Props = {
  car: Car
}

export function CarDetails({ car }: Props) {
  console.log('car', car)
  return (
    <>
      <h1>Car details component</h1>
      <span>{car.name}</span>
    </>
  )
}
