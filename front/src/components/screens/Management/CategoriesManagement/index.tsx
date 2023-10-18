import { useState, useEffect, useContext } from 'react'
import { TableComponent } from '@/components/_ui/TableComponent'
import { Category } from './interfaces/Category'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { AlertContext } from '@/contexts/alertContext'

export function CategoriesManagement() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true)

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
    <TableComponent
      rows={categories}
      columns={[]}
      loading={loadingCategories}
    />
  )
}
