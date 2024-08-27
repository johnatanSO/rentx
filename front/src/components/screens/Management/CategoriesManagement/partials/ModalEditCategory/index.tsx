import { ModalLayout } from '@/components/_ui/ModalLayout'
import { useContext } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { updateCategoryService } from '@/services/category/updateCategoryService/UpdateCategoryService'
import style from './ModalEditCategory.module.scss'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useForm } from 'react-hook-form'
import { ICategory } from '@/models/interfaces/ICategory'
import { IFormEditCategory } from '../../interface/IFormEditCategory'

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
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormEditCategory>({
    defaultValues: categoryToEdit,
  })

  function onUpdateCategory(category: IFormEditCategory) {
    const values = {
      ...category,
      _id: categoryToEdit?._id,
    }

    updateCategoryService(values, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Informações da categoria atualizadas com sucesso',
          type: 'success',
        })

        getCategories()
        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações da categoria - ${err?.message}`,
          type: 'error',
        })
      })
  }

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
          label="Nome"
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
