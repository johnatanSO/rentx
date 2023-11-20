'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CreateNewSpecification.module.scss'
import { FormEvent, useState, useContext } from 'react'
import { NewSpecification } from './interface/NewSpecification'
import { createSpecificationService } from '@/services/specifications/createSpecification/CreateSpecificationService'
import { AlertContext } from '@/contexts/alertContext'
import { usePathname, useRouter } from 'next/navigation'
import { Loading } from '@/components/_ui/Loading'

export function CreateNewSpecification() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const router = useRouter()
  const pathname = usePathname()
  const defaultValuesNewSpecification = {
    name: '',
    description: '',
  }
  const [newSpecificationData, setNewSpecificationData] =
    useState<NewSpecification>(defaultValuesNewSpecification)
  const [loadingCreateNewSpecification, setLoadingCreateNewSpecification] =
    useState<boolean>(false)

  function onCreateNewSpecification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingCreateNewSpecification(true)

    createSpecificationService(newSpecificationData)
      .then((res) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Especificação cadastrada com sucesso',
          type: 'success',
        })

        router.push(pathname)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar cadastrar nova especificação - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
        console.log(
          `Erro ao tentar cadastrar nova especificação - ${
            err?.response?.data?.message || err?.message
          }`,
        )
      })
      .finally(() => {
        setLoadingCreateNewSpecification(false)
      })
  }

  return (
    <form className={style.formContainer} onSubmit={onCreateNewSpecification}>
      <h2>Nova especificação</h2>

      <CustomTextField
        placeholder="Digite o nome"
        type="text"
        size="small"
        label="Nome"
        value={newSpecificationData.name}
        onChange={(event) => {
          setNewSpecificationData({
            ...newSpecificationData,
            name: event?.target.value,
          })
        }}
      />
      <CustomTextField
        multiline
        rows={3}
        placeholder="Digite a descrição"
        type="text"
        size="small"
        label="Descrição"
        value={newSpecificationData.description}
        className={style.descriptionInput}
        onChange={(event) => {
          setNewSpecificationData({
            ...newSpecificationData,
            description: event?.target.value,
          })
        }}
      />
      <button disabled={loadingCreateNewSpecification} type="submit">
        {loadingCreateNewSpecification ? <Loading size={21} /> : 'Cadastrar'}
      </button>
    </form>
  )
}
