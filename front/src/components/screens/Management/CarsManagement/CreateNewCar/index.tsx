'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import { MenuItem } from '@mui/material'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { NewCar } from './interfaces/NewCar'
import { Category } from './interfaces/Category'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { AlertContext } from '@/contexts/alertContext'
import style from './CreateNewCar.module.scss'
import { createNewCarService } from '@/services/cars/createNewCar/CreateNewCarService'
import { useRouter } from 'next/navigation'
import { Loading } from '@/components/_ui/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export function CreateNewCar() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const router = useRouter()
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
  const [loadingCreateNewCar, setLoadingCreateNewCar] = useState<boolean>(false)

  function onCreateNewCar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingCreateNewCar(true)

    createNewCarService(newCarData)
      .then((res) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Carro cadastrado com sucesso',
          type: 'success',
        })

        setNewCarData(defaultValuesNewCar)

        router.back()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar cadastrar novo carro - ${
            err?.reponse?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingCreateNewCar(false)
      })
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
      <header className={style.header}>
        <h2>Cadastro de um novo carro</h2>

        <button
          className={style.registerButton}
          disabled={loadingCreateNewCar}
          type="submit"
        >
          {loadingCreateNewCar ? (
            <Loading />
          ) : (
            <>
              Finalizar
              <FontAwesomeIcon icon={faCheck} />
            </>
          )}
        </button>
      </header>

      <section className={style.section}>
        <h3>Informações</h3>

        <div className={style.fields}>
          <CustomTextField
            className={style.input}
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
            className={style.input}
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
            className={style.input}
            placeholder="Digite o valor da diária"
            type="number"
            size="small"
            label="Valor da diária"
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
            className={style.input}
            placeholder="Digite o valor da multa"
            type="number"
            size="small"
            label="Valor da multa"
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
            className={style.input}
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
            className={style.input}
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
            className={style.input}
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

          <CustomTextField
            className={style.input}
            placeholder="Escreva uma descrição para o carro"
            type="text"
            fullWidth
            size="small"
            multiline
            rows={3}
            label="Descrição"
            value={newCarData.description}
            onChange={(event) => {
              setNewCarData({
                ...newCarData,
                description: event?.target.value,
              })
            }}
          />
        </div>
      </section>
    </form>
  )
}
