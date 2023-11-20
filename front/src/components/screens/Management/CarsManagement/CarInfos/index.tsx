'use client'

import { Car } from './interfaces/Car'
import style from './CarInfos.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { ImagesSection } from './partials/ImagesSection'
import { SpecificationsSection } from './partials/SpecificationsSection'

type Props = {
  car: Car
}

export function CarInfos({ car }: Props) {
  const router = useRouter()

  return (
    <>
      <header className={style.header}>
        <button
          className={style.backButton}
          onClick={router.back}
          type="button"
        >
          <FontAwesomeIcon icon={faAngleLeft} className={style.angleLeft} />
          Voltar
        </button>
        <h2>
          {car.name || 'Sem nome'} | {car.licensePlate}
        </h2>
      </header>

      <ImagesSection car={car} />

      <SpecificationsSection car={car} />
    </>
  )
}
