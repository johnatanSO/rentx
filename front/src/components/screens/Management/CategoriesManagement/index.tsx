'use client'
import style from './CategoriesManagement.module.scss'
import { TableComponent } from '@/components/_ui/TableComponent'
import { useColumns } from './hooks/useColumns'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { CreateNewCategory } from './CreateNewCategory'
import { ModalEditCategory } from './partials/ModalEditCategory'
import { ListMobile } from '@/components/_ui/ListMobile'
import { Divider } from '@mui/material'
import { useCategoryList } from '@/hooks/useCategoryList'
import { useFieldsMobile } from './hooks/useFieldsMobile'

export function CategoriesManagement() {
  const {
    categories,
    getCategories,
    loadingCategories,
    searchString,
    setSearchString,
  } = useCategoryList()

  const itemFields = useFieldsMobile()

  const {
    columns,
    categoryToEdit,
    modalEditCategoryOpened,
    setCategoryToEdit,
    setModalEditCategoryOpened,
  } = useColumns({ getCategories })

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
            setCategoryToEdit(null)
          }}
        />
      )}
    </>
  )
}
