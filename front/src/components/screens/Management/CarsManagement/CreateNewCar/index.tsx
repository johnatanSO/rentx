'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import { MenuItem } from '@mui/material'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { INewCar, newCarSchema } from '../interfaces/INewCar'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { AlertContext } from '@/contexts/alertContext'
import style from './CreateNewCar.module.scss'
import { createNewCarService } from '@/services/cars/createNewCar/CreateNewCarService'
import { useRouter } from 'next/navigation'
import { Loading } from '@/components/_ui/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faCamera,
  faCheck,
  faImage,
} from '@fortawesome/free-solid-svg-icons'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { ICategory } from '@/models/interfaces/ICategory'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function CreateNewCar() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<INewCar>({
    defaultValues: {
      name: '',
      description: '',
      dailyRate: 0,
      licensePlate: '',
      fineAmount: 0,
      brand: '',
      categoryId: '',
      transmission: '',
    },
    resolver: zodResolver(newCarSchema),
  })
  const router = useRouter()

  const [categoriesList, setCategoriesList] = useState<ICategory[]>([])
  const [image, setImage] = useState<File | null>(null)

  function onCreateNewCar(newCar: INewCar) {
    createNewCarService({ ...newCar, image }, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: 'Carro cadastrado com sucesso',
          type: 'success',
        })

        reset()

        router.back()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar cadastrar novo carro - ${err?.message}`,
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

  function handleSetImage() {
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement

      const file = (target.files || [])[0] as File

      setImage(file)
    }

    inputFile.click()
  }

  useEffect(() => {
    getCategoriesList()
  }, [])

  return (
    <form
      className={style.formContainer}
      onSubmit={handleSubmit(onCreateNewCar)}
    >
      <header className={style.header}>
        <button
          className={style.backButton}
          type="button"
          onClick={router.back}
          title="Voltar"
        >
          <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
        </button>
        <h2>Novo carro</h2>

        <button
          className={style.registerButton}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <Loading size={21} />
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

          <CustomTextField
            className={style.input}
            placeholder="Escreva uma descrição para o carro"
            type="text"
            fullWidth
            size="small"
            multiline
            rows={3}
            label="Descrição"
            {...register('description')}
          />
        </div>
      </section>

      <section className={style.section}>
        <h3>Imagem</h3>

        <div className={style.fields}>
          <button
            className={style.addImageButton}
            onClick={handleSetImage}
            type="button"
          >
            <FontAwesomeIcon icon={faCamera} />
            Adicionar imagem
          </button>
          {image && (
            <p className={style.imageText}>
              <FontAwesomeIcon icon={faImage} />
              <span>{image?.name}</span>
            </p>
          )}
        </div>
      </section>
    </form>
  )
}
