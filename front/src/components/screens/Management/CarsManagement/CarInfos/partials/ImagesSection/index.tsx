import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { Car } from '../../interfaces/Car'
import unknownCarImage from '../../../../../../../../public/assets/images/cars/unknownCarImage.png'
import { CarImage } from '../../interfaces/CarImage'
import { useContext, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { removeCarImageService } from '@/services/cars/removeCarImage/RemoveCarImageService'
import { usePathname, useRouter } from 'next/navigation'
import { updateCarImagesService } from '@/services/cars/updateCarImages/UpdateCarImagesService'
import { ModalZoomImage } from './ModalZoomImage'
import { updateDefaultCarImageService } from '@/services/cars/updateDefaultCarImage/UpdateDefaultCarImageService'

import 'swiper/css'
import 'swiper/css/navigation'
import style from './ImagesSection.module.scss'

type Props = {
  car: Car
}

export function ImagesSection({ car }: Props) {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

  const router = useRouter()
  const pathname = usePathname()

  const [modalZoomImageOpened, setModalZoomImageOpened] =
    useState<boolean>(false)
  const [imagePath, setImagePath] = useState<string | undefined>(undefined)

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
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Imagem removida com sucesso',
              type: 'success',
            })

            router.refresh()
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
    inputFile.onchange = async (event: any) => {
      await updateImage(event.target.files[0])
    }

    inputFile.click()
  }

  async function updateImage(carImage: string) {
    updateCarImagesService({ carImage, carId: car._id })
      .then(() => {
        router.refresh()
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

  function handleClickImage(image: CarImage) {
    setModalZoomImageOpened(true)
    setImagePath(image.path)
  }

  function handleUpdateDefaultImage() {
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.onchange = async (event: any) => {
      await updateDefaultImage(event.target.files[0])
    }

    inputFile.click()
  }

  async function updateDefaultImage(defaultImage: string) {
    updateDefaultCarImageService({ defaultImage, carId: car._id })
      .then(() => {
        router.refresh()
        router.push(pathname)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar imagem padrão - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
  }

  return (
    <>
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

        <div className={style.imagesContainer}>
          <div
            onClick={() => {
              handleClickImage(car.defaultImage)
            }}
            className={style.defaultImage}
          >
            <Image
              className={style.image}
              alt="Car default image"
              width={300}
              height={150}
              src={getCarImageUrl(car.defaultImage)}
            />
            <button
              onClick={(event) => {
                event.stopPropagation()
                handleUpdateDefaultImage()
              }}
              className={style.updateDefaultImageButton}
              type="button"
            >
              <FontAwesomeIcon className={style.icon} icon={faPen} />
            </button>
            <span className={style.imageTag}>Imagem principal</span>
          </div>

          <ul className={style.listImages}>
            {car.images.map((carImage, index) => {
              return (
                <li
                  key={carImage._id}
                  className={style.imageCard}
                  onClick={() => {
                    handleClickImage(carImage)
                  }}
                >
                  <Image
                    className={style.image}
                    alt="Car image"
                    width={300}
                    height={150}
                    src={getCarImageUrl(carImage)}
                  />
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      handleRemoveImage(carImage._id)
                    }}
                    className={style.removeImageButton}
                    type="button"
                  >
                    <FontAwesomeIcon className={style.icon} icon={faTrash} />
                  </button>
                  <span className={style.imageTag}>{index}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {imagePath && (
        <ModalZoomImage
          imagePath={imagePath}
          open={modalZoomImageOpened}
          handleClose={() => {
            setModalZoomImageOpened(false)
            setImagePath(undefined)
          }}
        />
      )}
    </>
  )
}
