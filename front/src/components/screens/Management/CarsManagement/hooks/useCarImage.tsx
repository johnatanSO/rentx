import { useContext, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { removeCarImageService } from '@/services/cars/removeCarImage/RemoveCarImageService'
import { usePathname, useRouter } from 'next/navigation'
import { updateCarImageService } from '@/services/cars/updateCarImage/UpdateCarImageService'
import { updateDefaultCarImageService } from '@/services/cars/updateDefaultCarImage/UpdateDefaultCarImageService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { ICarImage } from '@/models/interfaces/ICarImage'
import { ICar } from '@/models/interfaces/ICar'
import { StaticImageData } from 'next/image'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'

type Props = {
  car: ICar
}

export function useCarImage({ car }: Props) {
  const [modalZoomImageOpened, setModalZoomImageOpened] =
    useState<boolean>(false)
  const [imagePath, setImagePath] = useState<
    string | undefined | StaticImageData
  >(undefined)

  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

  const router = useRouter()
  const pathname = usePathname()

  function handleRemoveImage(imageId: string) {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente remover esta imagem?',
      onClickAgree: async () => {
        removeCarImageService({ carId: car._id, imageId }, httpClientProvider)
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
              text: `Erro ao tentar remover imagem - ${err?.message}`,
              type: 'success',
            })
            console.log(`Erro ao tentar remover imagem - ${err?.message}`)
          })
      },
    })
  }

  function handleSetImage() {
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement

      const file = (target.files || [])[0] as File

      await updateImage(file)
    }

    inputFile.click()
  }

  async function updateImage(carImage: File) {
    updateCarImageService({ carImage, carId: car._id }, httpClientProvider)
      .then(() => {
        router.refresh()
        router.push(pathname)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar adicionar imagem - ${err?.message}`,
          type: 'error',
        })
      })
  }

  function handleClickImage(image: ICarImage) {
    setModalZoomImageOpened(true)
    setImagePath(image?.path || unknownCarImage)
  }

  function handleUpdateDefaultImage() {
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement

      const file = (target.files || [])[0] as File

      await updateDefaultImage(file)
    }

    inputFile.click()
  }

  async function updateDefaultImage(defaultImage: File) {
    updateDefaultCarImageService(
      { defaultImage, carId: car._id },
      httpClientProvider,
    )
      .then(() => {
        router.refresh()
        router.push(pathname)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar imagem padrão - ${err?.message}`,
          type: 'error',
        })
      })
  }

  return {
    unknownCarImage,
    handleUpdateDefaultImage,
    handleClickImage,
    handleSetImage,
    modalZoomImageOpened,
    handleRemoveImage,
    imagePath,
    setModalZoomImageOpened,
    setImagePath,
  }
}
