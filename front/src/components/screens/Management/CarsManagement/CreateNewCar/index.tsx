'use client'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { MenuItem } from '@mui/material'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { NewCar } from './interfaces/NewCar'
import { Category } from './interfaces/Category'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { AlertContext } from '@/contexts/alertContext'
import style from './CreateNewCar.module.scss'

export function CreateNewCar() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultValuesNewCar = {
    name: '',
    description: '',
    dailyRate: 0,
    licensePlate: '',
    fineAmount: 0,
    brand: '',
    categoryId: '',
    transmission: '',
  }

  const [newCarData, setNewCarData] = useState<NewCar>(defaultValuesNewCar)
  const [categoriesList, setCategoriesList] = useState<Category[]>([])

  function onCreateNewCar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function getCategoriesList() {
    getAllCategoriesService()
      .then((res) => {
        setCategoriesList(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar buscar categorias - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
  }

  useEffect(() => {
    getCategoriesList()
  }, [])

  return (
    <form className={style.formContainer} onSubmit={onCreateNewCar}>
      <h2>Cadastro de carro</h2>
      <CustomTextField
        placeholder="Digite o nome"
        type="text"
        size="small"
        label="Nome do carro"
        value={newCarData.name}
        onChange={(event) => {
          setNewCarData({
            ...newCarData,
            name: event?.target.value,
          })
        }}
      />
      <CustomTextField
        placeholder="Digite a descrição"
        type="text"
        size="small"
        label="Descrição"
        value={newCarData.description}
        onChange={(event) => {
          setNewCarData({
            ...newCarData,
            description: event?.target.value,
          })
        }}
      />
      <CustomTextField
        placeholder="Digite o valor da diária"
        type="number"
        size="small"
        label="Valor"
        value={newCarData.dailyRate}
        onChange={(event) => {
          const value = Number(event.target.value)
          setNewCarData({
            ...newCarData,
            dailyRate: value,
          })
        }}
      />
      <CustomTextField
        placeholder="Digite a placa"
        type="text"
        size="small"
        label="Placa"
        value={newCarData.licensePlate}
        onChange={(event) => {
          setNewCarData({
            ...newCarData,
            licensePlate: event?.target.value,
          })
        }}
      />
      <CustomTextField
        placeholder="Digite o valor da multa"
        type="number"
        size="small"
        label="Valor"
        value={newCarData.fineAmount}
        onChange={(event) => {
          const value = Number(event.target.value)
          setNewCarData({
            ...newCarData,
            fineAmount: value,
          })
        }}
      />
      <CustomTextField
        placeholder="Digite a marca"
        type="text"
        size="small"
        label="Marca"
        value={newCarData.brand}
        onChange={(event) => {
          setNewCarData({
            ...newCarData,
            brand: event?.target.value,
          })
        }}
      />
      <CustomTextField
        placeholder="Selecione a categoria"
        select
        size="small"
        label="Categoria"
        value={newCarData.categoryId}
        onChange={(event) => {
          setNewCarData({
            ...newCarData,
            categoryId: event.target.value,
          })
        }}
      >
        {categoriesList.map((category) => {
          return (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          )
        })}
      </CustomTextField>
      <CustomTextField
        placeholder="Selecione o tipo de transmissão"
        select
        size="small"
        label="Transmissão"
        value={newCarData.transmission}
        onChange={(event) => {
          setNewCarData({
            ...newCarData,
            transmission: event.target.value,
          })
        }}
      >
        <MenuItem value="automatic">Automático</MenuItem>
        <MenuItem value="manual">Manual</MenuItem>
      </CustomTextField>
    </form>
  )
}
