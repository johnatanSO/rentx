'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Car } from '../../interfaces/Car'
import style from './EditInfosSection.module.scss'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { MenuItem } from '@mui/material'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { Category } from '../../interfaces/Category'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { AlertContext } from '@/contexts/alertContext'
import { updateCarInfosService } from '@/services/cars/updateCarInfos/UpdateCarInfosService'
import { usePathname, useRouter } from 'next/navigation'
import { Loading } from '@/components/_ui/Loading'

type Props = {
  car: Car
}

interface CarData extends Omit<Car, 'category'> {
  categoryId: string
}

export function EditInfosSection({ car }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const router = useRouter()
  const pathname = usePathname()

  const { category, ...restCar } = car
  const [carData, setCarData] = useState<CarData>({
    ...restCar,
    categoryId: category._id,
  })
  const [categoriesList, setCategoriesList] = useState<Category[]>([])
  const [loadingUpdateInfos, setLoadingUpdateInfos] = useState<boolean>(false)

  function onUpdateCarInfos(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingUpdateInfos(true)

    updateCarInfosService(carData)
      .then((res) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Informações do carro atualizadas com sucesso',
          type: 'success',
        })

        router.push(pathname)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações do carro - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingUpdateInfos(true)
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

  function inputValueHandler(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const name = event.target.name

    setCarData({
      ...carData,
      [name]: value,
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
          disabled={loadingUpdateInfos}
          className={style.saveInfosButton}
          type="submit"
        >
          {loadingUpdateInfos ? (
            <Loading size={21} />
          ) : (
            <>
              <FontAwesomeIcon icon={faSave} className={style.icon} />
              Salvar
            </>
          )}
        </button>
      </header>

      <div className={style.fields}>
        <CustomTextField
          className={style.input}
          placeholder="Digite o nome"
          type="text"
          size="small"
          name="name"
          label="Nome do carro"
          value={carData.name}
          onChange={inputValueHandler}
        />

        <CustomTextField
          className={style.input}
          placeholder="Digite a placa"
          type="text"
          size="small"
          label="Placa"
          name="licensePlate"
          value={carData.licensePlate}
          onChange={inputValueHandler}
        />

        <CustomTextField
          className={style.input}
          placeholder="Digite o valor da diária"
          type="number"
          size="small"
          label="Valor da diária"
          value={carData.dailyRate}
          name="dailyRate"
          onChange={inputValueHandler}
        />

        <CustomTextField
          className={style.input}
          placeholder="Digite o valor da multa"
          type="number"
          size="small"
          label="Valor da multa"
          value={carData.fineAmount}
          name="fineAmount"
          onChange={inputValueHandler}
        />
        <CustomTextField
          className={style.input}
          placeholder="Digite a marca"
          type="text"
          size="small"
          label="Marca"
          value={carData.brand}
          name="brand"
          onChange={inputValueHandler}
        />

        <CustomTextField
          className={style.input}
          placeholder="Selecione a categoria"
          select
          size="small"
          label="Categoria"
          value={carData.categoryId}
          name="categoryId"
          onChange={inputValueHandler}
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
          name="transmission"
          onChange={inputValueHandler}
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
          name="description"
          onChange={inputValueHandler}
        />
      </div>
    </form>
  )
}
