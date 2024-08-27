import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { updateCategoryService } from '@/services/category/updateCategoryService/UpdateCategoryService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IFormEditCategory } from '../interface/IFormEditCategory'
import { formEditCarSchema } from '../../CarsManagement/interfaces/IFormEditCar'
import { ICategory } from '@/models/interfaces/ICategory'

type Props = {
  categoryToEdit: ICategory
  handleClose: () => void
  getCategories: () => void
}

export function useEditCategory({
  categoryToEdit,
  handleClose,
  getCategories,
}: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormEditCategory>({
    defaultValues: categoryToEdit,
    resolver: zodResolver(formEditCarSchema),
  })

  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

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

  return {
    onUpdateCategory,
    handleSubmit,
    register,
    errors,
    isSubmitting,
  }
}
