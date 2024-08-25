import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import dayjs from 'dayjs'
import { IRental } from '@/models/interfaces/IRental'
import style from '../Rentals.module.scss'
import Image from 'next/image'
import unknownCarImage from '../../../../../public/assets/images/cars/unknownCarImage.png'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'
import { ICar } from '@/models/interfaces/ICar'

type Props = {
  onFinalizeRental: (rentalId: string) => void
}

export function useColumns({ onFinalizeRental }: Props) {
  function getStatusTag(finalized: string) {
    if (finalized) return style.statusFinalized
    return style.statusInProgress
  }

  return [
    {
      headerName: 'Carro',
      field: 'car',
      cellRenderer: (params: CellFunctionParams<ICar>) => {
        return (
          <Link href={`/cars/${params.value._id}`}>
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
      valueFormatter: (params: CellFunctionParams<IRental>) =>
        params.data.car.licensePlate,
    },
    {
      headerName: 'Inicio',
      field: 'startDate',
      valueFormatter: (params: CellFunctionParams<IRental>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Previsão de entrega',
      field: 'expectedReturnDate',
      valueFormatter: (params: CellFunctionParams<IRental>) =>
        dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (params: CellFunctionParams<IRental>) => {
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
      valueFormatter: (params: CellFunctionParams<IRental>) =>
        params?.value
          ? dayjs(params?.value).format('DD/MM/YYYY - HH:mm')
          : '--',
    },
    {
      headerName: 'Valor total',
      field: 'total',
      valueFormatter: (params: CellFunctionParams<IRental>) =>
        formatCurrency(params?.value || 0),
    },
    {
      headerName: '',
      field: 'returnCar',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<IRental>) => {
        if (!params.data.endDate) {
          return (
            <div className={style.actionsContainer}>
              <button
                onClick={() => {
                  onFinalizeRental(params.data._id)
                }}
                className={style.finalizeRentalButton}
                type="button"
              >
                Devolver carro
              </button>
            </div>
          )
        }
        // Colocar opção para alugar novamente
      },
    },
  ]
}
