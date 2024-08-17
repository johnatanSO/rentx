'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CreateNewCategory.module.scss'
import { FormEvent, useContext, useState } from 'react'
import { NewCategory } from './interface/NewCategory'
import { createCategoryService } from '@/services/category/createCategory/CreateCategoryService'
import { AlertContext } from '@/contexts/alertContext'
import { Loading } from '@/components/_ui/Loading'

type Props = {
  getCategories: () => void
}

export function CreateNewCategory({ getCategories }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const defaultValuesNewCategory = {
    name: '',
    description: '',
  }
  const [newCategoryData, setNewCategoryData] = useState<NewCategory>(
    defaultValuesNewCategory,
  )
  const [loadingCreateNewCategory, setLoadingCreateNewCategory] =
    useState<boolean>(false)

  function onCreateNewCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingCreateNewCategory(true)

    createCategoryService(newCategoryData)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Categoria cadastrada com sucesso',
          type: 'success',
        })

        setNewCategoryData(defaultValuesNewCategory)
        getCategories()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar cadastrar nova categoria - ${
            err?.message
          }`,
          type: 'error',
        })
        console.log(
          `Erro ao tentar cadastrar nova categoria - ${
            err?.message
          }`,
        )
      })
      .finally(() => {
        setLoadingCreateNewCategory(false)
      })
  }

  return (
    <form className={style.formContainer} onSubmit={onCreateNewCategory}>
      <h2>Nova categoria</h2>

      <CustomTextField
        placeholder="Digite o nome"
        type="text"
        size="small"
        label="Nome"
        value={newCategoryData.name}
        className={style.input}
        onChange={(event) => {
          setNewCategoryData({
            ...newCategoryData,
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
        value={newCategoryData.description}
        className={style.descriptionInput}
        onChange={(event) => {
          setNewCategoryData({
            ...newCategoryData,
            description: event?.target.value,
          })
        }}
      />
      <button disabled={loadingCreateNewCategory} type="submit">
        {loadingCreateNewCategory ? <Loading size={21} /> : 'Cadastrar'}
      </button>
    </form>
  )
}
