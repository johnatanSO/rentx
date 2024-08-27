'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CreateNewCategory.module.scss'
import { useContext } from 'react'
import { INewCategory } from '../interface/INewCategory'
import { createCategoryService } from '@/services/category/createCategory/CreateCategoryService'
import { AlertContext } from '@/contexts/alertContext'
import { Loading } from '@/components/_ui/Loading'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newCarSchema } from '../../CarsManagement/interfaces/INewCar'

type Props = {
  getCategories: () => void
}

export function CreateNewCategory({ getCategories }: Props) {
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

  function onCreateNewCategory(newCategory: INewCategory) {
    createCategoryService(newCategory, httpClientProvider)
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

  return (
    <form
      className={style.formContainer}
      onSubmit={handleSubmit(onCreateNewCategory)}
    >
      <h2>Nova categoria</h2>

      <CustomTextField
        placeholder="Digite o nome"
        type="text"
        size="small"
        label="Nome *"
        className={style.input}
        {...register('name', { required: true })}
        error={!!errors.name}
        helperText={errors.name && errors.name.message}
      />

      <CustomTextField
        multiline
        rows={3}
        placeholder="Digite a descrição"
        type="text"
        size="small"
        label="Descrição"
        className={style.descriptionInput}
        {...register('description')}
      />
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? <Loading size={21} /> : 'Cadastrar'}
      </button>
    </form>
  )
}
