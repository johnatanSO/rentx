'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './EditInfosSection.module.scss'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Checkbox, FormControlLabel, FormGroup, MenuItem } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { AlertContext } from '@/contexts/alertContext'
import { updateCarInfosService } from '@/services/cars/updateCarInfos/UpdateCarInfosService'
import { usePathname, useRouter } from 'next/navigation'
import { Loading } from '@/components/_ui/Loading'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { ICar } from '@/models/interfaces/ICar'
import { ICategory } from '@/models/interfaces/ICategory'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  formEditCarSchema,
  IFormEditCar,
} from '../../../interfaces/IFormEditCar'

type Props = {
  car: ICar
}

export function EditInfosSection({ car }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const { category, ...carData } = car
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IFormEditCar>({
    defaultValues: {
      ...carData,
      categoryId: category._id,
    },
    resolver: zodResolver(formEditCarSchema),
  })

  const avaliable = watch('avaliable')

  const router = useRouter()
  const pathname = usePathname()

  const [categoriesList, setCategoriesList] = useState<ICategory[]>([])

  function onUpdateCarInfos(carData: IFormEditCar) {
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

  useEffect(() => {
    getCategoriesList()
  }, [])

  return (
    <form onSubmit={handleSubmit(onUpdateCarInfos)} className={style.section}>
      <header>
        <h3>Informações</h3>

        <button
          disabled={isSubmitting}
          className={style.saveInfosButton}
          type="submit"
        >
          {isSubmitting ? (
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
          label="Nome do carro *"
          {...register('name', { required: true })}
          error={!!errors.name}
          helperText={errors.name && errors.name.message}
        />

        <CustomTextField
          className={style.input}
          placeholder="Digite a placa"
          type="text"
          size="small"
          label="Placa *"
          {...register('licensePlate', { required: true })}
          error={!!errors.licensePlate}
          helperText={errors.licensePlate && errors.licensePlate.message}
        />

        <CustomTextField
          className={style.input}
          placeholder="Digite o valor da diária"
          type="number"
          size="small"
          label="Valor da diária *"
          {...register('dailyRate', { required: true })}
          error={!!errors.dailyRate}
          helperText={errors.dailyRate && errors.dailyRate.message}
        />

        <CustomTextField
          className={style.input}
          placeholder="Digite o valor da multa"
          type="number"
          size="small"
          label="Valor da multa"
          {...register('fineAmount')}
        />

        <CustomTextField
          className={style.input}
          placeholder="Digite a marca"
          type="text"
          size="small"
          label="Marca"
          {...register('brand')}
        />

        <CustomTextField
          className={style.input}
          placeholder="Selecione a categoria"
          select
          size="small"
          label="Categoria *"
          {...register('categoryId', { required: true })}
          error={!!errors.categoryId}
          helperText={errors.categoryId && errors.categoryId.message}
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
          {...register('transmission')}
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
              {...register('avaliable')}
              onChange={(event) => {
                setValue('avaliable', event.target.checked)
                setValue('reasonUnavaliable', '')
              }}
              checked={avaliable}
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
            {...register('reasonUnavaliable')}
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
            {...register('description')}
          />
        </FormGroup>
      </div>
    </form>
  )
}
