'use client'
import Image from 'next/image'
import style from './CarItem.module.scss'
import { CarImage } from '../../interfaces/CarImage'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'

type Props = {
  images: CarImage[]
  name: string
  dailyRate: number
  carId: string
}

export function CarItem({ images, name, dailyRate, carId }: Props) {
  function getImageUrl(images: CarImage[]) {
    if (images.length === 0) return unknownCarImage

    return process.env.NEXT_PUBLIC_END_POINT + images[0]?.path
  }

  return (
    <li className={style.carItem}>
      <Image
        className={style.carImage}
        width={400}
        height={200}
        alt="Imagem do carro"
        src={getImageUrl(images)}
      />

      <h4>{name || '--'}</h4>
      <span>{formatCurrency(dailyRate || 0)}</span>
      <Link
        className={style.linkToCarDetails}
        href={`/cars/${carId}`}
        type="button"
      >
        Ver detalhes
      </Link>
    </li>
  )
}
