import { ModalLayout } from '@/components/_ui/ModalLayout'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './ModalEditCategory.module.scss'
import { ICategory } from '@/models/interfaces/ICategory'
import { useEditCategory } from '../../hooks/useEditCategory'

interface Props {
  getCategories: () => void
  categoryToEdit: ICategory
  open: boolean
  handleClose: () => void
}

export function ModalEditCategory({
  getCategories,
  categoryToEdit,
  open,
  handleClose,
}: Props) {
  const { errors, handleSubmit, isSubmitting, onUpdateCategory, register } =
    useEditCategory({ getCategories, handleClose, categoryToEdit })

  return (
    <ModalLayout
      handleClose={handleClose}
      open={open}
      title="Atualizar categoria"
      loading={isSubmitting}
      submitButtonText="Salvar"
      onSubmit={handleSubmit(onUpdateCategory)}
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
