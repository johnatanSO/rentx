import { Car } from './interfaces/Car'

type Props = {
  car: Car
}

export function CarInfos({ car }: Props) {
  return <>{JSON.stringify(car)}</>
}
