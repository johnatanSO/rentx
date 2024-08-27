import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'

import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../SpecificationsManagement.module.scss'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { AlertContext } from '@/contexts/alertContext'
import { useContext, useState } from 'react'
import { deleteSpecificationService } from '@/services/specifications/deleteSpecification/DeleteSpecificationService'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { ISpecification } from '@/models/interfaces/ISpecification'

interface Props {
  getSpecifications: () => void
}

export function useColumns({ getSpecifications }: Props) {
  const [specificationToEdit, setSpecificationToEdit] =
    useState<ISpecification | null>(null)
  const [modalEditSpecificationOpened, setModalEditSpecificationOpened] =
    useState<boolean>(false)

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
        deleteSpecificationService(specificationId, httpClientProvider)
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
              text: `Erro ao tentar deletar especificação - ${err?.message}`,
              type: 'error',
            })
            console.log(
              `Erro ao tentar deletar especificação - ${err?.message}`,
            )
          })
      },
    })
  }

  function handleEditSpecification(specification: ISpecification) {
    setSpecificationToEdit(specification)
    setModalEditSpecificationOpened(true)
  }

  return {
    columns: [
      {
        field: 'name',
        headerName: 'Nome',
        valueFormatter: (params: CellFunctionParams<ISpecification>) =>
          params.value,
      },
      {
        field: 'description',
        headerName: 'Descrição',
        valueFormatter: (params: CellFunctionParams<ISpecification>) =>
          params.value,
      },
      {
        field: 'createdAt',
        headerName: 'Data de cadastro',
        valueFormatter: (params: CellFunctionParams<ISpecification>) =>
          dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: '',
        flex: 1,
        cellRenderer: (params: CellFunctionParams<ISpecification>) => {
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
    ],
    specificationToEdit,
    modalEditSpecificationOpened,
    setModalEditSpecificationOpened,
  }
}
