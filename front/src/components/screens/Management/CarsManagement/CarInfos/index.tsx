'use client'

import Image from 'next/image'
import { Car } from './interfaces/Car'
import { CarImage } from './interfaces/CarImage'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'
import style from './CarInfos.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faCamera,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { removeCarImageService } from '@/services/cars/removeCarImage/RemoveCarImageService'
import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { usePathname, useRouter } from 'next/navigation'
import { updateCarImagesService } from '@/services/cars/updateCarImages/UpdateCarImagesService'
import { createCarSpecificationService } from '@/services/cars/createCarSpecification/CreateCarSpecificationService'

type Props = {
  car: Car
}

export function CarInfos({ car }: Props) {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

  const router = useRouter()
  const pathname = usePathname()

  function getCarImageUrl(carImage: CarImage) {
    if (!carImage) return unknownCarImage

    return process.env.NEXT_PUBLIC_END_POINT + carImage?.path
  }

  function handleRemoveImage(imageId: string) {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente remover esta imagem?',
      onClickAgree: async () => {
        removeCarImageService({ carId: car._id, imageId })
          .then((res) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Imagem removida com sucesso',
              type: 'success',
            })

            router.push(pathname)
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
      },
    })
  }

  function handleSetImage() {
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.onchange = (event: any) => {
      updateImage(event.target.files[0])
    }

    inputFile.click()
  }

  function updateImage(carImage: any) {
    updateCarImagesService({ carImage, carId: car._id })
      .then(() => {
        router.push(pathname)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar adicionar imagem - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
  }

  function hanadleAddSpecification() {
    createCarSpecificationService({
      carId: car._id,
      specificationsIds: [],
    })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Especificações adicionadas com sucesso`,
          type: 'success',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar adicionar especificações - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
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
        <header>
          <h3>Imagens</h3>
          <button
            className={style.addImageButton}
            type="button"
            onClick={handleSetImage}
          >
            <FontAwesomeIcon icon={faCamera} className={style.icon} />
            Adicionar imagem
          </button>
        </header>

        <ul className={style.listImages}>
          <li>
            <Image
              className={style.image}
              alt="Car image"
              width={400}
              height={400}
              src={getCarImageUrl(car.images[0])}
            />
            {car.images[0] && (
              <button
                onClick={() => {
                  handleRemoveImage(car.images[0]._id)
                }}
                className={style.removeImageButton}
                type="button"
              >
                <FontAwesomeIcon className={style.icon} icon={faTrash} />
              </button>
            )}
          </li>
          <li>
            <Image
              className={style.image}
              alt="Car image"
              width={400}
              height={400}
              src={getCarImageUrl(car.images[1])}
            />
            {car.images[1] && (
              <button
                onClick={() => {
                  handleRemoveImage(car.images[0]._id)
                }}
                className={style.removeImageButton}
                type="button"
              >
                <FontAwesomeIcon className={style.icon} icon={faTrash} />
              </button>
            )}
          </li>
          <li>
            <Image
              className={style.image}
              alt="Car image"
              width={400}
              height={400}
              src={getCarImageUrl(car.images[2])}
            />
            {car.images[2] && (
              <button
                onClick={() => {
                  handleRemoveImage(car.images[0]._id)
                }}
                className={style.removeImageButton}
                type="button"
              >
                <FontAwesomeIcon className={style.icon} icon={faTrash} />
              </button>
            )}
          </li>
        </ul>
      </section>

      <section className={style.section}>
        <header>
          <h3>Especificações</h3>
          <button
            className={style.addImageButton}
            type="button"
            onClick={hanadleAddSpecification}
          >
            <FontAwesomeIcon icon={faPlus} className={style.icon} />
            Adicionar especificação
          </button>
        </header>

        <ul>
          {car.specifications.length > 0 &&
            car.specifications.map((specification) => {
              return (
                <li key={specification._id}>{specification.name || '--'}</li>
              )
            })}
          {car.specifications.length === 0 && (
            <li>
              <p>Nenhuma especificação encontrada</p>
            </li>
          )}
        </ul>
      </section>
    </>
  )
}
