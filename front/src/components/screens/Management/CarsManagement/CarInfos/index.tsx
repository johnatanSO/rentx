'use client'

import Image from 'next/image'
import { Car } from './interfaces/Car'
import { CarImage } from './interfaces/CarImage'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'
import style from './CarInfos.module.scss'

type Props = {
  car: Car
}

export function CarInfos({ car }: Props) {
  function getCarImageUrl(carImage: CarImage) {
    if (!carImage) return unknownCarImage

    return process.env.NEXT_PUBLIC_END_POINT + carImage?.path
  }

  return (
    <>
      <h3>Imagens</h3>
      <ul className={style.listImages}>
        <li>
          <Image
            className={style.image}
            alt="Car image"
            width={500}
            height={500}
            src={getCarImageUrl(car.images[0])}
          />
        </li>
        <li>
          <Image
            className={style.image}
            alt="Car image"
            width={500}
            height={500}
            src={getCarImageUrl(car.images[1])}
          />
        </li>
        <li>
          <Image
            className={style.image}
            alt="Car image"
            width={500}
            height={500}
            src={getCarImageUrl(car.images[2])}
          />
        </li>
        <li>
          <Image
            className={style.image}
            alt="Car image"
            width={500}
            height={500}
            src={getCarImageUrl(car.images[3])}
          />
        </li>
      </ul>
    </>
  )
}
