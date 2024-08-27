import { ModalLayout } from '@/components/_ui/ModalLayout'
import { useContext } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { updateSpecificationService } from '@/services/specifications/updateSpecificationService/UpdateSpecificationService'
import style from './ModalEditSpecification.module.scss'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { ISpecification } from '@/models/interfaces/ISpecification'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  formEditSpecificationSchema,
  IFormEditSpecification,
} from '../../interface/IFormEditSpecification'

interface Props {
  specificationToEdit: ISpecification
  open: boolean
  handleClose: () => void
  getSpecifications: () => void
}

export function ModalEditSpecification({
  specificationToEdit,
  open,
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

  function onUpdateSpecification(specification: IFormEditSpecification) {
    updateSpecificationService(specification, httpClientProvider)
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

  return (
    <ModalLayout
      handleClose={handleClose}
      open={open}
      title="Atualizar especificação"
      loading={isSubmitting}
      submitButtonText="Salvar"
      onSubmit={handleSubmit(onUpdateSpecification)}
      buttonStyle={{
        backgroundColor: '#3264ff',
      }}
    >
      <div className={style.fields}>
        <CustomTextField
          label="Nome *"
          size="small"
          {...register('name', { required: true })}
          error={!!errors.name}
          helperText={errors.name && errors.name.message}
        />

        <CustomTextField
          label="Descrição"
          multiline
          rows={3}
          {...register('description')}
        />
      </div>
    </ModalLayout>
  )
}
