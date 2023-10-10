'use client'
import Image from 'next/image'
import style from './CarItem.module.scss'
import { CarImage } from '../../interfaces/CarImage'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'
import { faArrowsRotate, faDroplet } from '@fortawesome/free-solid-svg-icons'

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
      <header>
        <h4>{name}</h4>
        <FontAwesomeIcon className={style.bookmarkIcon} icon={faBookmark} />
      </header>

      <main>
        <Link href={`/cars/${carId}`}>
          <Image
            className={style.carImage}
            width={400}
            height={200}
            alt="Imagem do carro"
            src={getImageUrl(images)}
          />
        </Link>
      </main>

      <footer>
        <span>
          <FontAwesomeIcon icon={faArrowsRotate} />
          Manual
        </span>
        <span>
          <FontAwesomeIcon icon={faDroplet} />
          200km/dia
        </span>
        <span className={style.dailyRateText}>
          <b>{formatCurrency(dailyRate || 0)}</b>/dia
        </span>
      </footer>
    </li>
  )
}
