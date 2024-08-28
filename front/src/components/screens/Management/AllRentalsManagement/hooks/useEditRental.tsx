import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { IRentalEdit, rentalEditSchema } from '../interfaces/IRentalEdit'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateRentalService } from '@/services/rentals/updateRental/UpdateRentalService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { IRental } from '@/models/interfaces/IRental'

type Props = {
  rentalToEdit: IRental
  handleClose: () => void
}

export function useEditRental({ rentalToEdit, handleClose }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const router = useRouter()
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRentalEdit>({
    defaultValues: {
      ...rentalToEdit,
      car: rentalToEdit.car._id,
      user: rentalToEdit.user._id,
      startDate: dayjs(rentalToEdit.startDate).format('YYYY-MM-DD'),
      expectedReturnDate: dayjs(rentalToEdit.expectedReturnDate).format(
        'YYYY-MM-DD',
      ),
    },
    resolver: zodResolver(rentalEditSchema),
  })

  async function onUpdateRental(rental: IRentalEdit) {
    await updateRentalService(
      { ...rental, _id: rental._id || '' },
      httpClientProvider,
    )
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Informações do aluguel atualizadas com sucesso',
          type: 'success',
        })

        router.refresh()
        router.push(pathname)

        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações do aluguel - ${err?.message}`,
          type: 'error',
        })
      })
  }

  return {
    onUpdateRental,
    register,
    handleSubmit,
    errors,
    isSubmitting,
  }
}
