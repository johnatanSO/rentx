'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Car } from '../../interfaces/Car'
import style from './EditInfosSection.module.scss'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { MenuItem } from '@mui/material'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { Category } from '../../interfaces/Category'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { AlertContext } from '@/contexts/alertContext'

type Props = {
  car: Car
}
export function EditInfosSection({ car }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [carData, setCarData] = useState<Car>({
    ...car,
    categoryId: car.category._id,
  })
  const [categoriesList, setCategoriesList] = useState<Category[]>([])

  function onUpdateCarInfos(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('UPDATE CAR INFOS')
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
    <form onSubmit={onUpdateCarInfos} className={style.section}>
      <header>
        <h3>Informações</h3>

        <button
          className={style.saveInfosButton}
          type="submit"
          onClick={() => undefined}
        >
          <FontAwesomeIcon icon={faSave} className={style.icon} />
          Salvar
        </button>
      </header>

      <div className={style.fields}>
        <CustomTextField
          className={style.input}
          placeholder="Digite o nome"
          type="text"
          size="small"
          label="Nome do carro"
          value={carData.name}
          onChange={(event) => {
            setCarData({
              ...carData,
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
          value={carData.licensePlate}
          onChange={(event) => {
            setCarData({
              ...carData,
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
          value={carData.dailyRate}
          onChange={(event) => {
            const value = Number(event.target.value)
            setCarData({
              ...carData,
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
          value={carData.fineAmount}
          onChange={(event) => {
            const value = Number(event.target.value)
            setCarData({
              ...carData,
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
          value={carData.brand}
          onChange={(event) => {
            setCarData({
              ...carData,
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
          value={carData.categoryId}
          onChange={(event) => {
            setCarData({
              ...carData,
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
          value={carData.transmission}
          onChange={(event) => {
            setCarData({
              ...carData,
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
          value={carData.description}
          onChange={(event) => {
            setCarData({
              ...carData,
              description: event?.target.value,
            })
          }}
        />
      </div>
    </form>
  )
}
