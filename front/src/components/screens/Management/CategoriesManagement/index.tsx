'use client'
import style from './CategoriesManagement.module.scss'
import { useState, useEffect, useContext } from 'react'
import { TableComponent } from '@/components/_ui/TableComponent'
import { Category } from './interfaces/Category'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { AlertContext } from '@/contexts/alertContext'
import { useColumns } from './hooks/useColumns'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { CreateNewCategory } from './CreateNewCategory'

export function CategoriesManagement() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true)
  const columns = useColumns()

  function getCategories() {
    setLoadingCategories(true)

    getAllCategoriesService()
      .then((res) => {
        setCategories(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao buscar categorias - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingCategories(false)
      })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <CreateNewCategory />

      <header className={style.header}>
        <h2>Categorias</h2>
        <CustomTextField
          className={style.searchInput}
          label="Buscar pelo nome"
        />
      </header>

      <section className={style.tableSection}>
        <TableComponent
          rows={categories}
          columns={columns}
          loading={loadingCategories}
        />
      </section>
    </>
  )
}
