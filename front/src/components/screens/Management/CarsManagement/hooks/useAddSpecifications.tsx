import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { IFormAddSpecifications } from '../interfaces/IFormAddSpecifications'
import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { ICar } from '@/models/interfaces/ICar'
import { createCarSpecificationService } from '@/services/cars/createCarSpecification/CreateCarSpecificationService'
import { httpClientProvider } from '@/providers/HttpClientProvider'

type Props = {
  car: ICar
  handleClose: () => void
}

export function useAddSpecifications({ car, handleClose }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<IFormAddSpecifications>({
    defaultValues: {
      selectedSpecificationsIds: car.specifications.map(
        (specification) => specification._id,
      ),
    },
  })

  const selectedSpecificationsIds = watch('selectedSpecificationsIds')

  const router = useRouter()
  const pathname = usePathname()

  async function onAddSpecifications({
    selectedSpecificationsIds,
  }: IFormAddSpecifications) {
    await createCarSpecificationService(
      {
        carId: car._id,
        specificationsIds: selectedSpecificationsIds,
      },
      httpClientProvider,
    )
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Especificações adicionadas com sucesso`,
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
          text: `Erro ao tentar adicionar especificações - ${err?.message}`,
          type: 'error',
        })
      })
  }

  function handleSelectSpecification(specificationId: string) {
    if (selectedSpecificationsIds?.includes(specificationId)) {
      const filteredSpecifications = selectedSpecificationsIds.filter(
        (selectedSpecificationId) =>
          selectedSpecificationId !== specificationId,
      )

      setValue('selectedSpecificationsIds', filteredSpecifications)
      return
    }

    setValue('selectedSpecificationsIds', [
      ...(selectedSpecificationsIds as string[]),
      specificationId,
    ])
  }

  return {
    handleSubmit,
    isSubmitting,
    handleSelectSpecification,
    onAddSpecifications,
    selectedSpecificationsIds,
  }
}
