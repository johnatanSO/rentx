'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CreateNewSpecification.module.scss'
import { useContext } from 'react'
import {
  INewSpecification,
  newSpecificationSchema,
} from '../interface/INewSpecification'
import { createSpecificationService } from '@/services/specifications/createSpecification/CreateSpecificationService'
import { AlertContext } from '@/contexts/alertContext'
import { Loading } from '@/components/_ui/Loading'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  getSpecifications: () => void
}

export function CreateNewSpecification({ getSpecifications }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<INewSpecification>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(newSpecificationSchema),
  })

  function onCreateNewSpecification(newSpecification: INewSpecification) {
    createSpecificationService(newSpecification, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Especificação cadastrada com sucesso',
          type: 'success',
        })

        reset()

        getSpecifications()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar cadastrar nova especificação - ${err?.message}`,
          type: 'error',
        })
        console.log(
          `Erro ao tentar cadastrar nova especificação - ${err?.message}`,
        )
      })
  }

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
