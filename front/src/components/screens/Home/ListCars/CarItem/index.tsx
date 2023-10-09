'use client'
import Image from 'next/image'
import style from './CarItem.module.scss'
import { CarImage } from '../../interfaces/CarImage'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'
import { formatCurrency } from '@/utils/format'
import { useRouter } from 'next/navigation'

type Props = {
  images: CarImage[]
  name: string
  dailyRate: number
  carId: string
}

export function CarItem({ images, name, dailyRate, carId }: Props) {
  // const router = useRouter()

  function getImageUrl(imagePath: string) {
    const imageUrl = 'http://localhost:3333/' + imagePath
    return imageUrl
  }

  function handleShowDetailsCar() {
    console.log('carDetails')
  }

  return (
    <li className={style.carItem}>
      <Image
        className={style.carImage}
        width={300}
        height={350}
        key={images[0]?._id}
        alt="Imagem do carro"
        src={getImageUrl(images[0]?.path)}
      />

      <h4>{name || '--'}</h4>
      <span>{formatCurrency(dailyRate || 0)}</span>
      <button onClick={handleShowDetailsCar} type="button">
        Ver detalhes
      </button>
    </li>
  )
}
