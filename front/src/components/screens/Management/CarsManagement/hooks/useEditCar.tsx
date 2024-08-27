import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { formEditCarSchema, IFormEditCar } from '../interfaces/IFormEditCar'
import { useForm } from 'react-hook-form'
import { updateCarInfosService } from '@/services/cars/updateCarInfos/UpdateCarInfosService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { ICar } from '@/models/interfaces/ICar'

type Props = {
  car: ICar
}

export function useEditCar({ car }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const { category, ...carData } = car
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IFormEditCar>({
    defaultValues: {
      ...carData,
      categoryId: category._id,
    },
    resolver: zodResolver(formEditCarSchema),
  })

  const avaliable = watch('avaliable')

  const router = useRouter()
  const pathname = usePathname()

  function onUpdateCarInfos(carData: IFormEditCar) {
    updateCarInfosService(carData, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Informações do carro atualizadas com sucesso',
          type: 'success',
        })

        router.refresh()
        router.push(pathname)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações do carro - ${err?.message}`,
          type: 'error',
        })
      })
  }

  return {
    register,
    handleSubmit,
    setValue,
    onUpdateCarInfos,
    avaliable,
    errors,
    isSubmitting,
  }
}
