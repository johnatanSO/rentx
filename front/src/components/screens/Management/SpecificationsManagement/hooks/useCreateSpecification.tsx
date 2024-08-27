import { useForm } from 'react-hook-form'
import {
  INewSpecification,
  newSpecificationSchema,
} from '../interface/INewSpecification'
import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { createSpecificationService } from '@/services/specifications/createSpecification/CreateSpecificationService'

type Props = {
  getSpecifications: () => void
}

export function useCreateSpecification({ getSpecifications }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<INewSpecification>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(newSpecificationSchema),
  })

  function onCreateNewSpecification(newSpecification: INewSpecification) {
    createSpecificationService(newSpecification, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Especificação cadastrada com sucesso',
          type: 'success',
        })

        reset()

        getSpecifications()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar cadastrar nova especificação - ${err?.message}`,
          type: 'error',
        })
        console.log(
          `Erro ao tentar cadastrar nova especificação - ${err?.message}`,
        )
      })
  }

  return {
    onCreateNewSpecification,
    register,
    handleSubmit,
    errors,
    isSubmitting,
  }
}
