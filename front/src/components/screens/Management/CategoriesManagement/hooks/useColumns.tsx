import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import style from '../CategoriesManagement.module.scss'
import { deleteCategoryService } from '@/services/category/deleteCategory/DeleteCategoryService'
import { useContext, useState } from 'react'
import { AlertContext } from '@/contexts/alertContext'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { ICategory } from '@/models/interfaces/ICategory'

interface Props {
  getCategories: () => void
}

export function useColumns({ getCategories }: Props) {
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

  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null)
  const [modalEditCategoryOpened, setModalEditCategoryOpened] =
    useState<boolean>(false)

  function handleEditCategory(category: ICategory) {
    setCategoryToEdit(category)
    setModalEditCategoryOpened(true)
  }

  return {
    columns: [
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
    ],
    categoryToEdit,
    setCategoryToEdit,
    modalEditCategoryOpened,
    setModalEditCategoryOpened,
  }
}
