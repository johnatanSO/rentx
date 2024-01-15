'use client'

import { Car } from './interfaces/Car'
import style from './CarInfos.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { ImagesSection } from './partials/ImagesSection'
import { SpecificationsSection } from './partials/SpecificationsSection'
import { EditInfosSection } from './partials/EditInfosSection'
import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { deleteCarService } from '@/services/cars/deleteCar/DeleteCarService'

type Props = {
  car: Car
}

export function CarInfos({ car }: Props) {
  const {
    setAlertConfirmConfigs,
    alertConfirmConfigs,
    setAlertNotifyConfigs,
    alertNotifyConfigs,
  } = useContext(AlertContext)
  const router = useRouter()

  function handleDeleteCar() {
    const carId = car._id.toString()

    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      text: 'Deseja mesmo deletar este carro? Após a confirmação, essa ação será irreversível',
      title: 'Alerta de confirmação',
      onClickAgree: async () => {
        deleteCarService(carId)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Carro deletado com sucesso',
              type: 'success',
            })

            router.back()
          })
          .catch((error) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: `Erro ao tentar deletar este carro - ${
                error?.response?.data?.message || error?.message
              }`,
              type: 'error',
            })
          })
      },
    })
  }

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
