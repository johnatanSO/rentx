import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { ModalZoomImage } from './ModalZoomImage'
import style from './ImagesSection.module.scss'
import { ICar } from '@/models/interfaces/ICar'
import { useCarImage } from '../../../hooks/useCarImage'

type Props = {
  car: ICar
}

export function ImagesSection({ car }: Props) {
  const {
    handleClickImage,
    handleRemoveImage,
    handleSetImage,
    handleUpdateDefaultImage,
    unknownCarImage,
    imagePath,
    modalZoomImageOpened,
    setImagePath,
    setModalZoomImageOpened,
  } = useCarImage({ car })

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
          <ul className={style.listImages}>
            <li
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
                src={car.defaultImage?.path || unknownCarImage}
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
            </li>

            {car?.images.map((carImage, index) => {
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
                    src={carImage?.path || unknownCarImage}
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
                  <span className={style.imageTag}>{index + 1}</span>
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
