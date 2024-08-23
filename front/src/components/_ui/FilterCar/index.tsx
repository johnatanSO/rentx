import { useEffect, useState, useCallback } from 'react'
import style from './FilterCar.module.scss'
import { MenuItem } from '@mui/material'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { IFilters } from './interfaces/IFilters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { ICategory } from '@/models/interfaces/ICategory'
import { useForm } from 'react-hook-form'
import { Loading } from '../Loading'

export function FilterCar() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isLoading },
  } = useForm<IFilters>({
    defaultValues: {
      name: '',
      categoryId: '',
    },
  })

  const [categories, setCategories] = useState<ICategory[]>([])

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  function onFilterCars(filters: IFilters) {
    const currentName = searchParams.get('name')

    if (currentName !== filters.name) {
      router.push(
        `${pathname}?${createQueryString('name', filters.name || '')}`,
      )
    }

    const currentCategoryId = searchParams.get('categoryId')

    if (currentCategoryId !== filters.categoryId) {
      router.push(
        `${pathname}?${createQueryString(
          'categoryId',
          filters.categoryId || '',
        )}`,
      )
    }
  }

  function handleClearFilters() {
    reset()
    router.push(pathname)
  }

  async function getAllCategories() {
    const { data } = await getAllCategoriesService(httpClientProvider)

    setCategories(data.items)
  }

  useEffect(() => {
    getAllCategories()
  }, [])

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
        <button disabled={isLoading} type="submit">
          {isLoading ? <Loading /> : 'Procurar'}
        </button>
        <button onClick={handleClearFilters} type="button">
          Limpar
        </button>
      </div>
    </form>
  )
}
