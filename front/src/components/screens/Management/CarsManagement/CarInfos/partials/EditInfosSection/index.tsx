'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './EditInfosSection.module.scss'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Checkbox, FormControlLabel, FormGroup, MenuItem } from '@mui/material'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'

import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { AlertContext } from '@/contexts/alertContext'
import { updateCarInfosService } from '@/services/cars/updateCarInfos/UpdateCarInfosService'
import { usePathname, useRouter } from 'next/navigation'
import { Loading } from '@/components/_ui/Loading'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { ICar } from '@/models/interfaces/ICar'
import { ICategory } from '@/models/interfaces/ICategory'

type Props = {
  car: ICar
}

interface CarData extends Omit<ICar, 'category'> {
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

  const [categoriesList, setCategoriesList] = useState<ICategory[]>([])
  const [loadingUpdateInfos, setLoadingUpdateInfos] = useState<boolean>(false)

  function onUpdateCarInfos(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingUpdateInfos(true)

    updateCarInfosService(carData, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Informações do carro atualizadas com sucesso',
          type: 'success',
        })

        router.refresh()
        router.push(pathname)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar atualizar informações do carro - ${err?.message}`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingUpdateInfos(false)
      })
  }

  function getCategoriesList() {
    getAllCategoriesService(httpClientProvider)
      .then((res) => {
        setCategoriesList(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar buscar categorias - ${err?.message}`,
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
            <Loading color="#00b37e" size={21} />
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

        <FormControlLabel
          label="Disponível"
          control={
            <Checkbox
              sx={{
                marginLeft: '0.4rem',
                '&.Mui-checked': { color: '#536d88' },
              }}
              onChange={(event) => {
                setCarData({
                  ...carData,
                  avaliable: event.target.checked,
                  reasonUnavaliable: '',
                })
              }}
              checked={carData.avaliable}
            />
          }
        />

        <FormGroup className={style.textAreaContainer}>
          <CustomTextField
            disabled={carData.avaliable}
            className={style.input}
            placeholder="Motivo do carro estar indisponível"
            type="text"
            size="small"
            multiline
            rows={3}
            required
            sx={{
              display: 'flex',
              flex: 1,
              ...(carData.avaliable
                ? { opacity: '0.4', cursor: 'not-allowed' }
                : {}),
            }}
            label="Motivo da indisponibilidade"
            value={carData.reasonUnavaliable}
            name="reasonUnavaliable"
            onChange={inputValueHandler}
          />

          <CustomTextField
            className={style.input}
            placeholder="Escreva uma descrição para o carro"
            type="text"
            size="small"
            multiline
            rows={3}
            sx={{ display: 'flex', flex: 1 }}
            label="Descrição"
            value={carData.description}
            name="description"
            onChange={inputValueHandler}
          />
        </FormGroup>
      </div>
    </form>
  )
}
