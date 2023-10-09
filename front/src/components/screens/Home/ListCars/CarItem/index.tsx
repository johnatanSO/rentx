import Image from 'next/image'
import style from './CarItem.module.scss'
import { CarImage } from '../../interfaces/CarImage'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'
import { formatCurrency } from '@/utils/format'
import { useRouter } from 'next/router'

type Props = {
  images: CarImage[]
  name: string
  dailyRate: number
  carId: string
}

export function CarItem({ images, name, dailyRate, carId }: Props) {
  const router = useRouter()

  function getImageUrl(imagePath: string) {
    const imageUrl = process.env.NEXT_PUBLIC_BASE_URL + imagePath
    return imageUrl
  }

  function handleShowDetailsCar() {
    router.push({
      pathname: '/cars',
      query: carId,
    })
  }

  return (
    <li className={style.carItem}>
      {!images || images.length === 0 ? (
        <Image
          className={style.carImage}
          width={512}
          height={512}
          src={unknownCarImage}
          alt="Carro sem imagem"
        />
      ) : (
        images.map((image) => {
          return (
            <Image
              className={style.carImage}
              width={512}
              height={512}
              key={image._id}
              alt="Imagem do carro"
              src={getImageUrl(image.path)}
            />
          )
        })
      )}

      <h4>{name || '--'}</h4>
      <span>{formatCurrency(dailyRate || 0)}</span>
      <button onClick={handleShowDetailsCar} type="button">
        Ver detalhes
      </button>
    </li>
  )
}
