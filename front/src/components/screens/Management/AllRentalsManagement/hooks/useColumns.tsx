import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { Rental } from '../interfaces/Rental'
import dayjs from 'dayjs'
import Link from 'next/link'
import { formatCurrency } from '@/utils/format'
import style from '../AllRentalsManagement.module.scss'
import { Car } from '../interfaces/Car'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

type Props = {
  onFinalizeRental: (rentalId: string) => void
  handleEditRental: (rental: Rental) => void
}

export function useColumns({ onFinalizeRental, handleEditRental }: Props) {
  function getStatusTag(finalized: string) {
    if (finalized) return style.statusFinalized
    return style.statusInProgress
  }

  return [
    {
      headerName: 'Carro',
      field: 'car',
      cellRenderer: (params: CellFunctionParams<Car>) => {
        return (
          <Link href={`/management/cars/${params.value._id}`}>
            <div className={style.carModelContainer}>
              <Image
                alt="Avatar do carro"
                className={style.carImage}
                width={500}
                height={500}
                src={params.value.defaultImage?.path || unknownCarImage}
              />
              <b className={style.carName}>{params.value.name}</b>
            </div>
          </Link>
        )
      },
    },
    {
      headerName: 'Placa',
      field: 'licensePlate',
      valueFormatter: (params: CellFunctionParams<Rental>) =>
        params.data.car.licensePlate,
    },
    {
      headerName: 'Cliente',
      field: 'user',
      valueFormatter: (params: CellFunctionParams<Rental>) =>
        params?.value?.name,
    },
    {
      headerName: 'Inicio',
      field: 'startDate',
      valueFormatter: (params: CellFunctionParams<Rental>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Previsão de entrega',
      field: 'expectedReturnDate',
      valueFormatter: (params: CellFunctionParams<Rental>) =>
        dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (params: CellFunctionParams<Rental>) => {
        return (
          <span className={getStatusTag(params?.data?.endDate?.toString())}>
            {!params?.data?.endDate ? 'Em andamento' : 'Finalizado'}
          </span>
        )
      },
    },
    {
      headerName: 'Data de entrega',
      field: 'endDate',
      valueFormatter: (params: CellFunctionParams<Rental>) =>
        params?.value
          ? dayjs(params?.value).format('DD/MM/YYYY - HH:mm')
          : '--',
    },
    {
      headerName: 'Valor total',
      field: 'total',
      valueFormatter: (params: CellFunctionParams<Rental>) =>
        params?.value ? formatCurrency(params?.value || 0) : '--',
    },
    {
      headerName: '',
      field: 'actions',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<Rental>) => {
        return (
          <div className={style.actionsContainer}>
            {!params.data.endDate && (
              <button
                onClick={() => {
                  onFinalizeRental(params.data._id)
                }}
                className={style.finalizeRentalButton}
                type="button"
              >
                Finalizar aluguel
              </button>
            )}
            <button
              onClick={() => {
                handleEditRental(params.data)
              }}
              className={style.editRental}
              type="button"
            >
              <FontAwesomeIcon className={style.icon} icon={faPen} />
            </button>
          </div>
        )
      },
    },
  ]
}
