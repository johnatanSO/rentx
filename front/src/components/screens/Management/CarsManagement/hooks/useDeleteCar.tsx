import { AlertContext } from '@/contexts/alertContext'
import { ICar } from '@/models/interfaces/ICar'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { deleteCarService } from '@/services/cars/deleteCar/DeleteCarService'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

type Props = {
  car: ICar
}

export function useDeleteCar({ car }: Props) {
  const {
    setAlertConfirmConfigs,
    alertConfirmConfigs,
    setAlertNotifyConfigs,
    alertNotifyConfigs,
  } = useContext(AlertContext)

  const router = useRouter()

  function handleDeleteCar() {
    const carId = car._id.toString()

    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      text: 'Deseja mesmo deletar este carro? Após a confirmação, essa ação será irreversível',
      title: 'Alerta de confirmação',
      onClickAgree: async () => {
        deleteCarService(carId, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Carro deletado com sucesso',
              type: 'success',
            })

            router.back()
          })
          .catch((error) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: `Erro ao tentar deletar este carro - ${error?.message}`,
              type: 'error',
            })
          })
      },
    })
  }

  return {
    handleDeleteCar,
    router,
  }
}
