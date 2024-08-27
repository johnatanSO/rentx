'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CreateNewCategory.module.scss'
import { Loading } from '@/components/_ui/Loading'
import { useCreateCategory } from '../hooks/useCreateCategory'

type Props = {
  getCategories: () => void
}

export function CreateNewCategory({ getCategories }: Props) {
  const { errors, handleSubmit, isSubmitting, onCreateNewCategory, register } =
    useCreateCategory({ getCategories })

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
