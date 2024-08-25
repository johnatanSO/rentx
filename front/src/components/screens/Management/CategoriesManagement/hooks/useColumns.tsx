import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import style from '../CategoriesManagement.module.scss'
import { deleteCategoryService } from '@/services/category/deleteCategory/DeleteCategoryService'
import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { ICategory } from '@/models/interfaces/ICategory'

interface Props {
  handleEditCategory: (categoryData: ICategory) => void
  getCategories: () => void
}

export function useColumns({ handleEditCategory, getCategories }: Props) {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

  function handleDeleteCategory(categoryId: string) {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente deletar esta categoria?',
      onClickAgree: async () => {
        deleteCategoryService(categoryId, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Categoria deletada com sucesso',
              type: 'success',
            })
            getCategories()
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: `Erro ao tentar deletar categoria - ${err?.message}`,
              type: 'error',
            })
            console.log(`Erro ao tentar deletar categoria - ${err?.message}`)
          })
      },
    })
  }

  return [
    {
      field: 'name',
      headerName: 'Nome',
      valueFormatter: (params: CellFunctionParams<ICategory>) => params.value,
    },
    {
      field: 'description',
      headerName: 'Descrição',
      valueFormatter: (params: CellFunctionParams<ICategory>) => params.value,
    },
    {
      field: 'createdAt',
      headerName: 'Data de cadastro',
      valueFormatter: (params: CellFunctionParams<ICategory>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      field: 'actions',
      headerName: '',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<ICategory>) => {
        return (
          <div className={style.actionsContainer}>
            <button
              onClick={() => {
                handleEditCategory(params.data)
              }}
              className={style.editButton}
              type="button"
            >
              <FontAwesomeIcon className={style.icon} icon={faPen} />
            </button>
            <button
              onClick={() => {
                handleDeleteCategory(params.data._id)
              }}
              className={style.deleteButton}
              type="button"
            >
              <FontAwesomeIcon className={style.icon} icon={faTrash} />
            </button>
          </div>
        )
      },
    },
  ]
}
