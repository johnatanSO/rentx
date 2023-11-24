'use client'
import style from './CategoriesManagement.module.scss'
import { TableComponent } from '@/components/_ui/TableComponent'
import { Category } from './interfaces/Category'
import { useColumns } from './hooks/useColumns'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { CreateNewCategory } from './CreateNewCategory'
import { useEffect, useState } from 'react'

type Props = {
  allCategories: Category[]
}

export function CategoriesManagement({ allCategories }: Props) {
  const columns = useColumns()
  const [categories, setCategories] = useState<Category[]>(allCategories)
  const [searchString, setSearchString] = useState<string>('')

  function filterByName() {
    const filteredCategories = allCategories.filter((category) =>
      category.name
        .toLowerCase()
        .trim()
        .includes(searchString.toLowerCase().trim()),
    )
    setCategories(filteredCategories)
  }

  useEffect(() => {
    filterByName()
  }, [searchString])

  return (
    <>
      <CreateNewCategory />

      <header className={style.header}>
        <h2>Categorias</h2>
        <CustomTextField
          className={style.searchInput}
          label="Buscar pelo nome"
          value={searchString}
          onChange={(event) => {
            setSearchString(event?.target.value)
          }}
        />
      </header>

      <section className={style.tableSection}>
        <TableComponent rows={categories} columns={columns} loading={false} />
      </section>
    </>
  )
}
