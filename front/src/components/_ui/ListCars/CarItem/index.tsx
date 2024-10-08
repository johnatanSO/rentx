'use client'

import Image from 'next/image'
import style from './CarItem.module.scss'
import unknownCarImage from '../../../../../public/assets/images/cars/unknownCarImage.png'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import {
  faBookmark as faBookmarkSolid,
  faArrowsRotate,
  faDroplet,
} from '@fortawesome/free-solid-svg-icons'
import { ICarImage } from '@/models/interfaces/ICarImage'
import { ISpecification } from '@/models/interfaces/ISpecification'
import { useFavorite } from '../hooks/useFavorite'
import { useCarItem } from '../hooks/useCarItem'

type Props = {
  defaultImage: ICarImage
  name: string
  dailyRate: number
  carId: string
  specifications: ISpecification[]
  transmission: string
}

export function CarItem({
  defaultImage,
  name,
  dailyRate,
  carId,
  specifications,
  transmission,
}: Props) {
  const { favoriteCar, favorited } = useFavorite({ carId })
  const { formatTransmissionType } = useCarItem()

  return (
    <li className={style.carItem}>
      <header>
        <div className={style.title}>
          <h4>{name}</h4>
          {specifications.length > 0 ? (
            specifications.map((specification) => {
              return (
                <span
                  className={style.specificationText}
                  key={specification._id}
                >
                  {specification.name}
                </span>
              )
            })
          ) : (
            <span className={style.specificationText}>Sem expecificações</span>
          )}
        </div>
        <FontAwesomeIcon
          onClick={() => {
            favoriteCar(carId)
          }}
          className={style.bookmarkIcon}
          icon={favorited ? faBookmarkSolid : faBookmarkRegular}
        />
      </header>

      <Link href={`/cars/${carId}`}>
        <main>
          <Image
            className={style.carImage}
            width={400}
            height={200}
            alt="Imagem do carro"
            src={defaultImage?.path || unknownCarImage}
          />
        </main>
      </Link>

      <footer>
        <span>
          <FontAwesomeIcon icon={faArrowsRotate} />
          {formatTransmissionType(transmission)}
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
