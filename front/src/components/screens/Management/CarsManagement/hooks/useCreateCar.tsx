import { useForm } from 'react-hook-form'
import { INewCar, newCarSchema } from '../interfaces/INewCar'
import { zodResolver } from '@hookform/resolvers/zod'
import { createNewCarService } from '@/services/cars/createNewCar/CreateNewCarService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useContext, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'

export function useCreateCar() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [image, setImage] = useState<File | null>(null)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<INewCar>({
    defaultValues: {
      name: '',
      description: '',
      dailyRate: 0,
      licensePlate: '',
      fineAmount: 0,
      brand: '',
      categoryId: '',
      transmission: '',
    },
    resolver: zodResolver(newCarSchema),
  })

  async function onCreateNewCar(newCar: INewCar) {
    await createNewCarService({ ...newCar, image }, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Carro cadastrado com sucesso',
          type: 'success',
        })

        reset()

        router.back()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar cadastrar novo carro - ${err?.message}`,
          type: 'error',
        })
      })
  }

  function handleSetImage() {
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement

      const file = (target.files || [])[0] as File

      setImage(file)
    }

    inputFile.click()
  }

  return {
    router,
    onCreateNewCar,
    handleSubmit,
    register,
    errors,
    isSubmitting,
    image,
    handleSetImage,
  }
}
