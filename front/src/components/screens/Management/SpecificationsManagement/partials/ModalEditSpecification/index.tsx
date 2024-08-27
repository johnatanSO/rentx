import { ModalLayout } from '@/components/_ui/ModalLayout'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './ModalEditSpecification.module.scss'
import { ISpecification } from '@/models/interfaces/ISpecification'
import { useEditSpecification } from '../../hooks/useEditSpecification'

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
  const {
    errors,
    handleSubmit,
    isSubmitting,
    onUpdateSpecification,
    register,
  } = useEditSpecification({
    handleClose,
    getSpecifications,
    specificationToEdit,
  })

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
