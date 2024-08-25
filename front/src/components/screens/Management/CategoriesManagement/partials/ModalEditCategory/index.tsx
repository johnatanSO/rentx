import { ModalLayout } from '@/components/_ui/ModalLayout'
import { useContext, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { updateCategoryService } from '@/services/category/updateCategoryService/UpdateCategoryService'
import style from './ModalEditCategory.module.scss'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { useForm } from 'react-hook-form'
import { ICategory } from '@/models/interfaces/ICategory'

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
  const [loadingUpdateCategory, setLoadingUpdateCategory] =
    useState<boolean>(false)

  const { handleSubmit, register } = useForm<ICategory>({
    defaultValues: {
      ...categoryToEdit,
    },
  })

  function onUpdateCategory(category: ICategory) {
    setLoadingUpdateCategory(true)

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
      .finally(() => {
        setLoadingUpdateCategory(false)
      })
  }

  return (
    <ModalLayout
      handleClose={handleClose}
      open={open}
      title="Atualizar categoria"
      loading={loadingUpdateCategory}
      submitButtonText="Salvar"
      onSubmit={handleSubmit(onUpdateCategory)}
      buttonStyle={{
        backgroundColor: '#3264ff',
      }}
    >
      <div className={style.fields}>
        <CustomTextField label="Nome" size="small" {...register('name')} />
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
