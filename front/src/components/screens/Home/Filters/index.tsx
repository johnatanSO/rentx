import { useEffect, useState, FormEvent, useCallback } from 'react'
import style from './Filters.module.scss'
import { MenuItem } from '@mui/material'
import { Category } from '../interfaces/Category'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { Filters } from '../interfaces/Filters'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export function Filters() {
  const defaultValuesFilter = {
    name: null,
    categoryId: null,
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

  function onFilterCars(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const params = new URLSearchParams(searchParams)
    console.log('PARAMS', params)

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
        <button type="submit">
          Buscar
          <FontAwesomeIcon className={style.icon} icon={faSearch} />
        </button>
        <button onClick={handleClearFilters} type="button">
          Limpar
        </button>
      </div>
    </form>
  )
}
