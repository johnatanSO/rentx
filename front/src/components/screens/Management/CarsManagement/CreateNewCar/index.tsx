'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import { MenuItem } from '@mui/material'
import style from './CreateNewCar.module.scss'
import { Loading } from '@/components/_ui/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faCamera,
  faCheck,
  faImage,
} from '@fortawesome/free-solid-svg-icons'
import { useCreateCar } from '../hooks/useCreateCar'
import { useCategoryList } from '@/hooks/useCategoryList'

export function CreateNewCar() {
  const {
    errors,
    handleSubmit,
    isSubmitting,
    onCreateNewCar,
    register,
    router,
    image,
    handleSetImage,
  } = useCreateCar()

  const { categories } = useCategoryList()

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
            {...register('dailyRate', { required: true, valueAsNumber: true })}
            error={!!errors.dailyRate}
            helperText={errors.dailyRate && errors.dailyRate.message}
          />

          <CustomTextField
            className={style.input}
            placeholder="Digite o valor da multa"
            type="number"
            size="small"
            label="Valor da multa"
            {...register('fineAmount', { valueAsNumber: true })}
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
            {categories.map((category) => {
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
