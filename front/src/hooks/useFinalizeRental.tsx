import { AlertContext } from '@/contexts/alertContext'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { finalizeRentalService } from '@/services/rentals/finalizeRental/FinalizeRentalService'
import { useContext } from 'react'

type Props = {
  setLoadingRentals: (loading: boolean) => void
  getRentals: () => void
}

export function useFinalizeRental({ setLoadingRentals, getRentals }: Props) {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

  function onFinalizeRental(rentalId: string) {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      onClickAgree: async () => {
        setLoadingRentals(true)
        finalizeRentalService(rentalId, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Aluguel finalizado com sucesso',
              type: 'success',
            })

            getRentals()
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: `Erro ao tentar finalizar o aluguel - ${err?.message}`,
              type: 'error',
            })
          })
      },
      text: 'Tem certeza que deseja finalizar este aluguel?',
      title: 'Alerta de confirmação',
    })
  }

  return {
    onFinalizeRental,
  }
}
