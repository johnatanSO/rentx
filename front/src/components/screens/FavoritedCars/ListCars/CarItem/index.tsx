'use client'
import { useContext } from 'react'
import Image from 'next/image'
import style from './CarItem.module.scss'
import { CarImage } from '../../interfaces/CarImage'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons'
import {
  faBookmark as faBookmarkSolid,
  faArrowsRotate,
  faDroplet,
} from '@fortawesome/free-solid-svg-icons'

import { Specification } from '../../interfaces/Specification'
import { favoriteCarService } from '@/services/cars/favoriteCar/FavoriteCarService'
import { AlertContext } from '@/contexts/alertContext'
import { UserContext } from '@/contexts/userContext'
import { useRouter } from 'next/navigation'

type Props = {
  images: CarImage[]
  name: string
  dailyRate: number
  carId: string
  specifications: Specification[]
}

export function CarItem({
  images,
  name,
  dailyRate,
  carId,
  specifications,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const { userInfo, setUserInfo } = useContext(UserContext)
  const router = useRouter()

  const favorited = userInfo
    ? !!userInfo?.favoriteCars?.find((car) => car._id === carId)
    : false

  function getImageUrl(images: CarImage[]) {
    if (images.length === 0) return unknownCarImage

    return process.env.NEXT_PUBLIC_END_POINT + images[0]?.path
  }

  function favoriteCar(carId: string) {
    if (!userInfo) {
      router.push('/authenticate')
      return
    }

    favoriteCarService(carId)
      .then((res) => {
        setUserInfo({
          ...userInfo,
          ...res.data.user,
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar favoritar o carro - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
  }

  return (
    <li className={style.carItem}>
      <header>
        <div className={style.title}>
          <h4>{name}</h4>
          {specifications?.length > 0 ? (
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
            src={getImageUrl(images)}
          />
        </main>
      </Link>

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
