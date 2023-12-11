import { ModalLayout } from '@/components/_ui/ModalLayout'
import { Category } from '../../interfaces/Category'
import { FormEvent, useContext, useState } from 'react'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { AlertContext } from '@/contexts/alertContext'
import { updateCategoryService } from '@/services/category/updateCategoryService/UpdateCategoryService'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  categoryToEdit: Category
  open: boolean
  handleClose: () => void
}

export function ModalEditCategory({
  categoryToEdit,
  open,
  handleClose,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [loadingUpdateCategory, setLoadingUpdateCategory] =
    useState<boolean>(false)
  const [categoryData, setCategoryData] = useState<Category>(categoryToEdit)
  const router = useRouter()
  const pathname = usePathname()

  function onUpdateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingUpdateCategory(true)

    updateCategoryService(categoryData)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Informações da categoria atualizadas com sucesso',
          type: 'success',
        })

        handleClose()
        router.refresh()
        router.push(pathname)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações da categoria - ${
            err?.response?.data?.message || err?.message
          }`,
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
      <>
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
      </>
    </ModalLayout>
  )
}
