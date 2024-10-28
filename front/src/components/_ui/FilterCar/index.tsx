import style from './FilterCar.module.scss'
import { MenuItem } from '@mui/material'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Loading } from '../Loading'
import { useCategoryList } from '@/hooks/useCategoryList'
import { useFilterCars } from './hooks/useFilterCars'

export function FilterCar() {
  const { categories } = useCategoryList()

  const {
    handleClearFilters,
    handleSubmit,
    isSubmitting,
    onFilterCars,
    register,
  } = useFilterCars()

  return (
    <form
      className={style.filtersContainer}
      onSubmit={handleSubmit(onFilterCars)}
    >
      <CustomTextField
        size="medium"
        label="Nome"
        type="text"
        className={style.input}
        {...register('name')}
      />

      <CustomTextField
        size="medium"
        label="Categoria"
        select
        className={style.input}
        {...register('categoryId')}
      >
        {categories.map((category) => {
          return (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          )
        })}
      </CustomTextField>
      <div className={style.buttonsContainer}>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? <Loading /> : 'Procurar'}
        </button>
        <button onClick={handleClearFilters} type="button">
          Limpar
        </button>
      </div>
    </form>
  )
}
