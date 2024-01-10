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

type Props = {
  allCategories: Category[]
}

export function CategoriesManagement({ allCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(allCategories)
  const [searchString, setSearchString] = useState<string>('')
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null)
  const [modalEditCategoryOpened, setModalEditCategoryOpened] =
    useState<boolean>(false)

  const columns = useColumns({ handleEditCategory })
  const itemFields = useFieldsMobile()

  function handleEditCategory(category: Category) {
    setCategoryToEdit(category)
    setModalEditCategoryOpened(true)
  }

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
        <ListMobile
          items={categories}
          itemFields={itemFields}
          collapseItems={columns}
        />
      </section>

      {categoryToEdit && modalEditCategoryOpened && (
        <ModalEditCategory
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
