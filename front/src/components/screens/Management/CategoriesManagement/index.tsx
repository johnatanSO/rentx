'use client'
import style from './CategoriesManagement.module.scss'
import { TableComponent } from '@/components/_ui/TableComponent'
import { Category } from './interfaces/Category'
import { useColumns } from './hooks/useColumns'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { CreateNewCategory } from './CreateNewCategory'
import { useEffect, useState } from 'react'
import { ModalEditCategory } from './partials/ModalEditCategory'
import { ListMobile } from '@/components/_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'

export function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchString, setSearchString] = useState<string>('')
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null)
  const [modalEditCategoryOpened, setModalEditCategoryOpened] =
    useState<boolean>(false)

  const columns = useColumns({ handleEditCategory, getCategories })
  const itemFields = useFieldsMobile()

  function handleEditCategory(category: Category) {
    setCategoryToEdit(category)
    setModalEditCategoryOpened(true)
  }

  function filterByName() {
    const filteredCategories = categories.filter((category) =>
      category.name
        .toLowerCase()
        .trim()
        .includes(searchString.toLowerCase().trim()),
    )
    setCategories(filteredCategories)
  }

  function getCategories() {
    getAllCategoriesService()
      .then(({ data: { items } }) => {
        setCategories(items)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    filterByName()
  }, [searchString])

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <CreateNewCategory getCategories={getCategories} />

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
        <ListMobile
          items={categories}
          itemFields={itemFields}
          collapseItems={columns}
        />
      </section>

      {categoryToEdit && modalEditCategoryOpened && (
        <ModalEditCategory
          getCategories={getCategories}
          categoryToEdit={categoryToEdit}
          open={modalEditCategoryOpened}
          handleClose={() => {
            setModalEditCategoryOpened(false)
          }}
        />
      )}
    </>
  )
}
