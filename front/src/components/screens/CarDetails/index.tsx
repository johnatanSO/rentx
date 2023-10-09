'use client'
import { useRouter } from 'next/navigation'
import { Car } from '../Home/interfaces/Car'
import style from './CarDetails.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

type Props = {
  car: Car
}

export function CarDetails({ car }: Props) {
  const router = useRouter()
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

      <main>
        <div className={style.carImageContainer}>
          <Image
            className={style.carImage}
            width={500}
            height={600}
            src={''}
            alt="Imagem do carro"
          />
        </div>

        <div className={style.infosContainer}>
          - Categoria - Especificações - Descrição - Valor - Placa - Data
          inicial/Data final - Descrição - Alugar
          <button className={style.rentalButton} type="button">
            Alugar
          </button>
        </div>
      </main>
    </section>
  )
}
