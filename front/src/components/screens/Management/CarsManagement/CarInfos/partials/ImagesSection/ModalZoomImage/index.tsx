import Image from 'next/image'
import style from './ModalZoomImage.module.scss'
import { ModalLayout } from '@/components/_ui/ModalLayout'

type Props = {
  imagePath: string
  open: boolean
  handleClose: () => void
}

export function ModalZoomImage({ imagePath, open, handleClose }: Props) {
  return (
    <ModalLayout open={open} handleClose={handleClose} title="Imagem ampliada">
      <div className={style.imageContainer}>
        <Image
          alt="Imagem ampliada"
          width={1280}
          height={720}
          src={imagePath}
          className={style.image}
        />
      </div>
    </ModalLayout>
  )
}
