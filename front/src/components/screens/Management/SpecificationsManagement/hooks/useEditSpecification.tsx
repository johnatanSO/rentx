import { AlertContext } from '@/contexts/alertContext'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import {
  formEditSpecificationSchema,
  IFormEditSpecification,
} from '../interface/IFormEditSpecification'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateSpecificationService } from '@/services/specifications/updateSpecificationService/UpdateSpecificationService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { ISpecification } from '@/models/interfaces/ISpecification'

type Props = {
  specificationToEdit: ISpecification
  handleClose: () => void
  getSpecifications: () => void
}

export function useEditSpecification({
  specificationToEdit,
  handleClose,
  getSpecifications,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormEditSpecification>({
    defaultValues: specificationToEdit,
    resolver: zodResolver(formEditSpecificationSchema),
  })

  async function onUpdateSpecification(specification: IFormEditSpecification) {
    await updateSpecificationService(specification, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Informações da especificação atualizadas com sucesso',
          type: 'success',
        })

        getSpecifications()
        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações da especificação - ${err?.message}`,
          type: 'error',
        })
      })
  }

  return {
    register,
    handleSubmit,
    onUpdateSpecification,
    errors,
    isSubmitting,
  }
}
