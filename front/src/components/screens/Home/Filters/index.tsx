import { useEffect, useState, FormEvent } from 'react'
import style from './Filters.module.scss'
import { TextField, MenuItem } from '@mui/material'
import { Category } from '../interfaces/Category'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { useRouter } from 'next/router'
import { Filters } from '../interfaces/Filters'

export function Filters() {
  const defaultValuesFilter = {
    name: '',
    categoryId: '',
  }
  const [filters, setFilters] = useState<Filters>(defaultValuesFilter)
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()

  function onFilterCars(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    router.push({
      pathname: router.route,
      query: {
        ...(filters.name ? { name: filters.name } : {}),
        ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
      },
    })
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
      <TextField size="small" label="Nome" type="text" />
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
        <MenuItem value={''}>Selecione uma categoria</MenuItem>
        {categories.map((category) => {
          return (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          )
        })}
      </TextField>
      <button type="submit">Filtrar</button>
    </form>
  )
}
