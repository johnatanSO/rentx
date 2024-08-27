import { AlertContext } from '@/contexts/alertContext'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { INewRental, newRentalSchema } from '../interfaces/INewRental'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { ICar } from '@/models/interfaces/ICar'
import { ICarImage } from '@/models/interfaces/ICarImage'
import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'
import { createRentalService } from '@/services/rentals/createRental/CreateRentalService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useRouter } from 'next/navigation'

type Props = {
  car: ICar
}

export function useCreateRental({ car }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [displayImage, setDisplayImage] = useState<ICarImage>(
    car.images[0] || car.defaultImage || null,
  )

  const router = useRouter()

  const minExpectedReturnDate = dayjs().add(1, 'days').format('YYYY-MM-DD')

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<INewRental>({
    defaultValues: {
      expectedReturnDate: minExpectedReturnDate,
    },
    resolver: zodResolver(newRentalSchema),
  })

  const expectedReturnDate = watch('expectedReturnDate')

  async function onCreateNewRental(newRental: INewRental) {
    const userInfo = await getLocalUserService()

    if (!userInfo) {
      router.push('/authenticate')
      return
    }

    createRentalService(
      {
        carId: car._id,
        expectedReturnDate: newRental.expectedReturnDate,
      },
      httpClientProvider,
    )
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Aluguel cadastrado com sucesso`,
          type: 'success',
        })

        router.refresh()
        router.push('/rentals')
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar cadastrar aluguel do carro - ${err?.message}`,
          type: 'error',
        })
      })
  }

  function getExpectedValue() {
    const expectedReturnDateEndDay = dayjs(expectedReturnDate).endOf('day')
    const duration = dayjs(expectedReturnDateEndDay).diff(new Date(), 'day')
    const expectedValue = car.dailyRate * duration

    return expectedValue || 0
  }

  function getLengthDays() {
    const expectedReturnDateEndDay = dayjs(expectedReturnDate).endOf('day')
    return dayjs(expectedReturnDateEndDay).diff(new Date(), 'day')
  }

  return {
    getLengthDays,
    getExpectedValue,
    onCreateNewRental,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    displayImage,
    setDisplayImage,
    router,
  }
}
