'use client'
import { useRouter } from 'next/navigation'
import { Car } from '../Home/interfaces/Car'
import style from './CarDetails.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { CarImage } from '../Home/interfaces/CarImage'
import unknownCarImage from '../../../../public/assets/images/cars/unknownCarImage.png'

type Props = {
  car: Car
}

export function CarDetails({ car }: Props) {
  const router = useRouter()

  function getImageUrl(images: CarImage[]) {
    if (images.length === 0) return unknownCarImage

    return process.env.NEXT_PUBLIC_END_POINT + images[0]?.path
  }

  return (
    <section className={style.carDetailsContainer}>
      <header className={style.titleContainer}>
        <button
          type="button"
          onClick={() => {
            router.back()
          }}
          title="Voltar"
        >
          <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
        </button>
        <h2>{car.name}</h2>
      </header>

      <section>
        <div className={style.carImageContainer}>
          <Image
            className={style.carImage}
            width={500}
            height={600}
            src={getImageUrl(car.images)}
            alt="Imagem do carro"
          />
        </div>

        <div className={style.infosContainer}>
          <span className={style.categoryTag}>_Esporivo_</span>
          <ul className={style.specificationsList}>
            {car.specifications.map((specification) => {
              return (
                <li key={specification._id}>
                  <span>{specification.name}</span>
                </li>
              )
            })}
          </ul>
          - Especificações - Descrição - Valor - Placa - Data inicial/Data final
          - Descrição - Alugar
          <button className={style.rentalButton} type="button">
            Alugar
          </button>
        </div>
      </section>
    </section>
  )
}
