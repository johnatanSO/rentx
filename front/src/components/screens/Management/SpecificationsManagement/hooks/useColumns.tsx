import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { Specification } from '../interfaces/Specification'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../SpecificationsManagement.module.scss'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { AlertContext } from '@/contexts/alertContext'
import { useContext } from 'react'
import { deleteSpecificationService } from '@/services/specifications/deleteSpecification/DeleteSpecificationService'

interface Props {
  handleEditSpecification: (specification: Specification) => void
  getSpecifications: () => void
}

export function useColumns({
  handleEditSpecification,
  getSpecifications,
}: Props) {
  const {
    alertNotifyConfigs,
    setAlertNotifyConfigs,
    alertConfirmConfigs,
    setAlertConfirmConfigs,
  } = useContext(AlertContext)

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

            getSpecifications()
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: `Erro ao tentar deletar especificação - ${
                err?.message
              }`,
              type: 'error',
            })
            console.log(
              `Erro ao tentar deletar especificação - ${
                err?.message
              }`,
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
      type: 'actions',
      headerName: '',
      flex: 1,
      cellRenderer: (params: CellFunctionParams<Specification>) => {
        return (
          <div className={style.actionsContainer}>
            <button
              onClick={() => {
                handleEditSpecification(params.data)
              }}
              className={style.editButton}
              type="button"
            >
              <FontAwesomeIcon className={style.icon} icon={faPen} />
            </button>
            <button
              onClick={() => {
                handleDeleteSpecification(params.data._id)
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
