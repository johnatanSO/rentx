'use client'
import style from './CategoriesManagement.module.scss'
import { TableComponent } from '@/components/_ui/TableComponent'
import { useColumns } from './hooks/useColumns'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { CreateNewCategory } from './CreateNewCategory'
import { useEffect, useState } from 'react'
import { ModalEditCategory } from './partials/ModalEditCategory'
import { ListMobile } from '@/components/_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { Divider } from '@mui/material'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { ICategory } from '@/models/interfaces/ICategory'

export function CategoriesManagement() {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [searchString, setSearchString] = useState<string>('')
  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null)
  const [modalEditCategoryOpened, setModalEditCategoryOpened] =
    useState<boolean>(false)
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true)

  const columns = useColumns({ handleEditCategory, getCategories })
  const itemFields = useFieldsMobile()

  function handleEditCategory(category: ICategory) {
    setCategoryToEdit(category)
    setModalEditCategoryOpened(true)
  }

  function filterByName() {
    setLoadingCategories(true)
    const filteredCategories = categories.filter((category) =>
      category.name
        .toLowerCase()
        .trim()
        .includes(searchString.toLowerCase().trim()),
    )
    setLoadingCategories(false)
    setCategories(filteredCategories)
  }

  function getCategories() {
    setLoadingCategories(true)
    getAllCategoriesService(httpClientProvider)
      .then(({ data: { items } }) => {
        setCategories(items)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoadingCategories(false)
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

      <Divider />

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
        <div className={style.viewDesktop}>
          <TableComponent
            rows={categories}
            columns={columns}
            loading={loadingCategories}
          />
        </div>
        <div className={style.viewMobile}>
          <ListMobile
            loading={loadingCategories}
            items={categories}
            itemFields={itemFields}
            collapseItems={columns}
          />
        </div>
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
