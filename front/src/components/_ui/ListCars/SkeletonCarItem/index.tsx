'use client'

import Image from 'next/image'
import style from './SkeletonCarItem.module.scss'
import unknownCarImage from '../../../../../public/assets/images/cars/unknownCarImage.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faDroplet } from '@fortawesome/free-solid-svg-icons'

import { Skeleton } from '@mui/material'

export function SkeletonCarItem() {
  return (
    <li className={style.carItem}>
      <header>
        <div className={style.title}>
          <Skeleton
            variant="rounded"
            height={22}
            sx={{ borderRadius: 15 }}
            width={150}
          />

          <Skeleton
            variant="rounded"
            height={22}
            sx={{ borderRadius: 15, marginTop: '0.6rem' }}
            width={150}
          />
        </div>

        <Skeleton
          className={style.bookmarkIcon}
          variant="circular"
          sx={{ borderRadius: 15 }}
          width={30}
          height={30}
        />
      </header>

      <main>
        <Image
          className={style.carImage}
          width={400}
          height={200}
          alt="Carregando carros"
          src={unknownCarImage}
        />
      </main>

      <footer>
        <span>
          <FontAwesomeIcon icon={faArrowsRotate} />
          <Skeleton
            variant="rounded"
            height={22}
            sx={{ borderRadius: 15 }}
            width={80}
          />
        </span>
        <span>
          <FontAwesomeIcon icon={faDroplet} />
          <Skeleton
            variant="rounded"
            height={22}
            sx={{ borderRadius: 15 }}
            width={80}
          />
        </span>
        <span className={style.dailyRateText}>
          <Skeleton
            variant="rounded"
            height={22}
            sx={{ borderRadius: 15 }}
            width={80}
          />
        </span>
      </footer>
    </li>
  )
}
