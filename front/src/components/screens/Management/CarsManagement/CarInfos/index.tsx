'use client'

import Image from 'next/image'
import { Car } from './interfaces/Car'
import { CarImage } from './interfaces/CarImage'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'
import style from './CarInfos.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { removeCarImageService } from '@/services/cars/removeCarImage/RemoveCarImageService'
import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'

type Props = {
  car: Car
}

export function CarInfos({ car }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const router = useRouter()

  function getCarImageUrl(carImage: CarImage) {
    if (!carImage) return unknownCarImage

    return process.env.NEXT_PUBLIC_END_POINT + carImage?.path
  }

  function handleRemoveImage(imageId: string) {
    removeCarImageService({ carId: car._id, imageId })
      .then((res) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Imagem removida com sucesso',
          type: 'success',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar remover imagem - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'success',
        })
        console.log(
          `Erro ao tentar remover imagem - ${
            err?.response?.data?.message || err?.message
          }`,
        )
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
          <FontAwesomeIcon icon={faAngleLeft} className={style.angleLeft} />
          Voltar
        </button>
        <h2>
          {car.name || 'Sem nome'} | {car.licensePlate}
        </h2>
      </header>

      <section className={style.section}>
        <h3>Imagens</h3>

        <ul className={style.listImages}>
          <li>
            <Image
              className={style.image}
              alt="Car image"
              width={400}
              height={400}
              src={getCarImageUrl(car.images[0])}
            />
            <button
              onClick={() => {
                handleRemoveImage(car.images[0]._id)
              }}
              className={style.removeImageButton}
              type="button"
            >
              <FontAwesomeIcon className={style.icon} icon={faTrash} />
            </button>
          </li>
          <li>
            <Image
              className={style.image}
              alt="Car image"
              width={400}
              height={400}
              src={getCarImageUrl(car.images[1])}
            />
          </li>
          <li>
            <Image
              className={style.image}
              alt="Car image"
              width={400}
              height={400}
              src={getCarImageUrl(car.images[2])}
            />
          </li>
        </ul>
      </section>

      <section className={style.section}>
        <h3>Informações do carro</h3>
      </section>
    </>
  )
}
