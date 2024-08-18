import { ModalLayout } from '@/components/_ui/ModalLayout'
import { Category } from '../../interfaces/Category'
import { FormEvent, useContext, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { updateCategoryService } from '@/services/category/updateCategoryService/UpdateCategoryService'
import style from './ModalEditCategory.module.scss'
import { httpClientProvider } from '@/providers/httpClientProvider'

interface Props {
  getCategories: () => void
  categoryToEdit: Category
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
  const [categoryData, setCategoryData] = useState<Category>(categoryToEdit)

  function onUpdateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingUpdateCategory(true)

    updateCategoryService(categoryData, httpClientProvider)
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
      onSubmit={onUpdateCategory}
      buttonStyle={{
        backgroundColor: '#3264ff',
      }}
    >
      <div className={style.fields}>
        <CustomTextField
          label="Nome"
          size="small"
          value={categoryData.name}
          onChange={(event) => {
            setCategoryData({
              ...categoryData,
              name: event?.target.value,
            })
          }}
        />
        <CustomTextField
          label="Descrição"
          multiline
          rows={3}
          value={categoryData.description}
          onChange={(event) => {
            setCategoryData({
              ...categoryData,
              description: event?.target.value,
            })
          }}
        />
      </div>
    </ModalLayout>
  )
}
