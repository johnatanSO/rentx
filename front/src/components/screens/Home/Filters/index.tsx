import { useEffect, useState, FormEvent, useCallback } from 'react'
import style from './Filters.module.scss'
import { TextField, MenuItem } from '@mui/material'
import { Category } from '../interfaces/Category'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { Filters } from '../interfaces/Filters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function Filters() {
  const defaultValuesFilter = {
    name: '',
    categoryId: '',
  }
  const [filters, setFilters] = useState<Filters>(defaultValuesFilter)
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
      <TextField
        size="small"
        label="Nome"
        type="text"
        value={filters.name}
        onChange={(event) => {
          setFilters({
            ...filters,
            name: event.target.value,
          })
        }}
      />
      <TextField
        size="small"
        label="Categoria"
        select
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
      </TextField>
      <button type="submit">Filtrar</button>
      <button onClick={handleClearFilters} type="button">
        Limpar
      </button>
    </form>
  )
}
