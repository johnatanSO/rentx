import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import dayjs from 'dayjs'
import { Rental } from '../interfaces/Rental'

export function useColumns() {
  return [
    {
      headerName: 'Carro',
      field: 'carId',
      valueFormatter: (params: CellFunctionParams<Rental>) =>
        params?.value || '--',
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
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Status',
      field: 'endDate',
      valueFormatter: (params: CellFunctionParams<Rental>) => {
        if (!params.value) return 'Em andamento'

        return 'Finalizado'
      },
    },
    {
      headerName: 'Data de entrega',
      field: 'endDate',
      valueFormatter: (params: CellFunctionParams<Rental>) =>
        dayjs(params?.value).format('DD/MM/YYYY - HH:mm') || '--',
    },
  ]
}
