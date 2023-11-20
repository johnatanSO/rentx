import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { Specification } from '../interfaces/Specification'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../SpecificationsManagement.module.scss'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { AlertContext } from '@/contexts/alertContext'
import { useContext } from 'react'
import { deleteSpecificationService } from '@/services/specifications/deleteSpecification/DeleteSpecificationService'
import { usePathname, useRouter } from 'next/navigation'

export function useColumns() {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

  const router = useRouter()
  const pathname = usePathname()

  function handleDeleteSpecification(specificationId: string) {
    setAlertConfirmConfigs({
      ...alertConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente deletar esta especificação?',
      onClickAgree: async () => {
        deleteSpecificationService(specificationId)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Especificação deletada com sucesso',
              type: 'success',
            })
            router.push(pathname)
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: `Erro ao tentar deletar especificação - ${err?.response?.data?.message}`,
              type: 'error',
            })
            console.log(
              `Erro ao tentar deletar especificação - ${err?.response?.data?.message}`,
            )
          })
      },
    })
  }

  return [
    {
      field: 'name',
      headerName: 'Nome',
      valueFormatter: (params: CellFunctionParams<Specification>) =>
        params.value,
    },
    {
      field: 'description',
      headerName: 'Descrição',
      valueFormatter: (params: CellFunctionParams<Specification>) =>
        params.value,
    },
    {
      field: 'createdAt',
      headerName: 'Data de cadastro',
      valueFormatter: (params: CellFunctionParams<Specification>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      cellRenderer: (params: CellFunctionParams<Specification>) => {
        return (
          <button
            onClick={() => {
              handleDeleteSpecification(params.data._id)
            }}
            className={style.deleteButton}
            type="button"
          >
            <FontAwesomeIcon className={style.icon} icon={faTrash} />
          </button>
        )
      },
    },
  ]
}
