import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { newCarSchema } from '../../CarsManagement/interfaces/INewCar'
import { INewCategory } from '../interface/INewCategory'
import { AlertContext } from '@/contexts/alertContext'
import { useContext } from 'react'
import { createCategoryService } from '@/services/category/createCategory/CreateCategoryService'
import { httpClientProvider } from '@/providers/HttpClientProvider'

type Props = {
  getCategories: () => void
}

export function useCreateCategory({ getCategories }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<INewCategory>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(newCarSchema),
  })

  async function onCreateNewCategory(newCategory: INewCategory) {
    await createCategoryService(newCategory, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Categoria cadastrada com sucesso',
          type: 'success',
        })

        reset()

        getCategories()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar cadastrar nova categoria - ${err?.message}`,
          type: 'error',
        })
        console.log(`Erro ao tentar cadastrar nova categoria - ${err?.message}`)
      })
  }

  return {
    onCreateNewCategory,
    register,
    handleSubmit,
    errors,
    isSubmitting,
  }
}
