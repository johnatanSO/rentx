import Image from 'next/image'
import style from './CarItem.module.scss'
import { CarImage } from '../../interfaces/CarImage'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'

type Props = {
  images: CarImage[]
  name: string
}

export function CarItem({ images, name }: Props) {
  function getImageUrl(imagePath: string) {
    const imageUrl = process.env.NEXT_PUBLIC_BASE_URL + imagePath
    return imageUrl
  }

  return (
    <li>
      {images.length === 0 ? (
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
    </li>
  )
}
