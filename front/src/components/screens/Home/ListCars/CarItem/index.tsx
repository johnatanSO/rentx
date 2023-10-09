import Image from 'next/image'

type Props = {
  images: any[]
  name: string
}

export function CarItem({ images, name }: Props) {
  function getImageUrl(imagePath: string) {
    const imageUrl = process.env.NEXT_PUBLIC_BASE_URL + imagePath
    return imageUrl
  }

  return (
    <li>
      {images.map((image) => {
        return (
          <Image
            key={image._id}
            alt="Imagem do carro"
            src={getImageUrl(image.path)}
          />
        )
      })}
      <h4>{name || '--'}</h4>
    </li>
  )
}
