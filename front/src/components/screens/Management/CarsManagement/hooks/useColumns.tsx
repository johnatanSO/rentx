import Image from 'next/image'
import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'
import style from '../CarsManagement.module.scss'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'
import { ICar } from '@/models/interfaces/ICar'

export function useColumns() {
  function formatTransmissionType(type: string) {
    if (type === 'automatic') return 'Automático'
    return 'Manual'
  }

  return [
    {
      headerName: 'Carro',
      field: 'defaultImage',
      cellRenderer: (params: CellFunctionParams<ICar>) => {
        return (
          <Link href={`/management/cars/${params.data._id}`}>
            <div className={style.carModelContainer}>
              <Image
                alt="Avatar do carro"
                className={style.carImage}
                width={500}
                height={500}
                src={params.value?.path || unknownCarImage}
              />
              <b className={style.carName}>{params.data.name}</b>
            </div>
          </Link>
        )
      },
    },
    {
      headerName: 'Placa',
      field: 'licensePlate',
      valueFormatter: (params: CellFunctionParams<ICar>) => params.value,
    },
    {
      headerName: 'Transmissão',
      field: 'transmission',
      valueFormatter: (params: CellFunctionParams<ICar>) =>
        formatTransmissionType(params.value),
    },
    {
      headerName: 'Valor diário',
      field: 'dailyRate',
      valueFormatter: (params: CellFunctionParams<ICar>) =>
        formatCurrency(params.value || 0),
    },
    {
      headerName: 'Disponível',
      field: 'avaliable',
      valueFormatter: (params: CellFunctionParams<ICar>) =>
        params.value ? 'Sim' : 'Não',
    },
    {
      headerName: '',
      field: 'actions',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<ICar>) => {
        return (
          <div className={style.actionsContainer}>
            <Link
              href={`/management/cars/${params.data._id}`}
              className={style.showDetailsButton}
            >
              Ver detalhes
            </Link>
          </div>
        )
      },
    },
  ]
}
