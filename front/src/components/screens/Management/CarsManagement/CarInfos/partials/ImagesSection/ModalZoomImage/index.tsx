import Image from 'next/image'
import style from './ModalZoomImage.module.scss'
import { ModalLayout } from '@/components/_ui/ModalLayout'

type Props = {
  imagePath: string
  open: boolean
  handleClose: () => void
}

export function ModalZoomImage({ imagePath, open, handleClose }: Props) {
  const formatedPath = process.env.NEXT_PUBLIC_END_POINT + imagePath

  return (
    <ModalLayout open={open} handleClose={handleClose} title="Imagem ampliada">
      <div className={style.imageContainer}>
        <Image
          alt="Imagem ampliada"
          width={1280}
          height={720}
          src={formatedPath}
        />
      </div>
    </ModalLayout>
  )
}
