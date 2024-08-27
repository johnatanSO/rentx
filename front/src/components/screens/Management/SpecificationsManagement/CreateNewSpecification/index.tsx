'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CreateNewSpecification.module.scss'
import { Loading } from '@/components/_ui/Loading'
import { useCreateSpecification } from '../hooks/useCreateSpecification'

type Props = {
  getSpecifications: () => void
}

export function CreateNewSpecification({ getSpecifications }: Props) {
  const {
    errors,
    handleSubmit,
    isSubmitting,
    onCreateNewSpecification,
    register,
  } = useCreateSpecification({ getSpecifications })

  return (
    <form
      className={style.formContainer}
      onSubmit={handleSubmit(onCreateNewSpecification)}
    >
      <h2>Nova especificação</h2>

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
