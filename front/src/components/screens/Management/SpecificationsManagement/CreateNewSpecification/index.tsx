'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CreateNewSpecification.module.scss'
import { FormEvent, useState, useContext } from 'react'
import { NewSpecification } from './interface/NewSpecification'
import { createSpecificationService } from '@/services/specifications/createSpecification/CreateSpecificationService'
import { AlertContext } from '@/contexts/alertContext'
import { useRouter } from 'next/navigation'
import { Loading } from '@/components/_ui/Loading'

export function CreateNewSpecification() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const router = useRouter()
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

        router.back()
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
      <h2>Cadastro de carro</h2>

      <CustomTextField
        placeholder="Digite o nome da especificação"
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
        placeholder="Digite a descrição"
        type="text"
        size="small"
        label="Descrição"
        value={newSpecificationData.description}
        onChange={(event) => {
          setNewSpecificationData({
            ...newSpecificationData,
            description: event?.target.value,
          })
        }}
      />

      <button disabled={loadingCreateNewSpecification} type="submit">
        {loadingCreateNewSpecification ? <Loading /> : 'Cadastrar'}
      </button>
    </form>
  )
}
