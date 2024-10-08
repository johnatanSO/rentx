'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './EditInfosSection.module.scss'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Checkbox, FormControlLabel, FormGroup, MenuItem } from '@mui/material'
import { Loading } from '@/components/_ui/Loading'
import { ICar } from '@/models/interfaces/ICar'
import { useCategoryList } from '@/hooks/useCategoryList'
import { useEditCar } from '../../../hooks/useEditCar'

type Props = {
  car: ICar
}

export function EditInfosSection({ car }: Props) {
  const { categories } = useCategoryList()
  const {
    avaliable,
    errors,
    handleSubmit,
    isSubmitting,
    onUpdateCarInfos,
    register,
    setValue,
  } = useEditCar({ car })

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
            disabled={avaliable}
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
              ...(avaliable ? { opacity: '0.4', cursor: 'not-allowed' } : {}),
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
