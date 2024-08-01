import { useEffect, useState, FormEvent, useCallback } from 'react'
import style from './Filters.module.scss'
import { MenuItem } from '@mui/material'
import { Category } from '../interfaces/Category'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { IFilters } from '../interfaces/IFilters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CustomTextField } from '@/components/_ui/CustomTextField'

export function Filters() {
  const defaultValuesFilter = {
    name: '',
    categoryId: '',
  }
  const [filters, setFilters] = useState<IFilters>(defaultValuesFilter)
  const [categories, setCategories] = useState<Category[]>([])
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

  // Melhorar essa implementação de filtros.
  function onFilterCars(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    router.push(
      `${pathname}?${createQueryString(
        'name',
        filters.name,
      )}&${createQueryString('categoryId', filters.categoryId)}`,
    )
  }

  function handleClearFilters() {
    setFilters(defaultValuesFilter)
    router.push(pathname)
  }

  async function getAllCategories() {
    const { data } = await getAllCategoriesService()

    setCategories(data.items)
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <form className={style.filtersContainer} onSubmit={onFilterCars}>
      <CustomTextField
        size="medium"
        label="Nome"
        type="text"
        className={style.input}
        value={filters.name}
        onChange={(event) => {
          setFilters({
            ...filters,
            name: event.target.value,
          })
        }}
      />
      <CustomTextField
        size="medium"
        label="Categoria"
        select
        className={style.input}
        value={filters.categoryId}
        onChange={(event) => {
          setFilters({
            ...filters,
            categoryId: event.target.value,
          })
        }}
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
        <button type="submit">Procurar</button>
        <button onClick={handleClearFilters} type="button">
          Limpar
        </button>
      </div>
    </form>
  )
}
