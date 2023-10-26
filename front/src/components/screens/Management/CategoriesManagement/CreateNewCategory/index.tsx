'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './CreateNewCategory.module.scss'
import { FormEvent, useState } from 'react'
import { NewCategory } from './interface/NewCategory'

export function CreateNewCategory() {
  const defaultValuesNewCategory = {
    name: '',
    description: '',
  }
  const [newCategoryData, setNewCategoryData] = useState<NewCategory>(
    defaultValuesNewCategory,
  )
  function onCreateNewCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form className={style.formContainer} onSubmit={onCreateNewCategory}>
      <h2>Cadastro de carro</h2>
      <CustomTextField
        placeholder="Digite o nome"
        type="text"
        size="small"
        label="Nome do carro"
        value={newCategoryData.name}
        onChange={(event) => {
          setNewCategoryData({
            ...newCategoryData,
            name: event?.target.value,
          })
        }}
      />
      <CustomTextField
        placeholder="Digite a descrição"
        type="text"
        size="small"
        label="Descrição"
        value={newCategoryData.description}
        onChange={(event) => {
          setNewCategoryData({
            ...newCategoryData,
            description: event?.target.value,
          })
        }}
      />
    </form>
  )
}
