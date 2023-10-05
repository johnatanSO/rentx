import { useEffect, useState, FormEvent } from 'react'
import style from './Filters.module.scss'
import { TextField, MenuItem } from '@mui/material'
import { Category } from '../interfaces/Category'
import { getAllCategoriesService } from '@/services/category/GetAllCategoriesService'

export function Filters() {
  const [categories, setCategories] = useState<Category[]>([])

  function onFilterCars(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
      <TextField size="small" label="Categoria" select>
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
