'use client'
import style from './CarInfos.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ImagesSection } from './partials/ImagesSection'
import { SpecificationsSection } from './partials/SpecificationsSection'
import { EditInfosSection } from './partials/EditInfosSection'
import { ICar } from '@/models/interfaces/ICar'
import { useDeleteCar } from '../hooks/useDeleteCar'

type Props = {
  car: ICar
}

export function CarInfos({ car }: Props) {
  const { handleDeleteCar, router } = useDeleteCar({ car })

  return (
    <>
      <header className={style.header}>
        <button
          className={style.backButton}
          onClick={router.back}
          type="button"
        >
          <FontAwesomeIcon icon={faAngleLeft} className={style.icon} />
        </button>
        <h2>
          {car.name || 'Sem nome'} | {car.licensePlate}
        </h2>
        <button
          type="button"
          className={style.removeButton}
          onClick={handleDeleteCar}
        >
          <FontAwesomeIcon icon={faTrash} className={style.icon} />
          Deletar carro
        </button>
      </header>

      <ImagesSection car={car} />
      <EditInfosSection car={car} />
      <SpecificationsSection car={car} />
    </>
  )
}
