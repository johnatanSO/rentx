import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import dayjs from 'dayjs'

export function useColumns() {
  return [
    {
      headerName: 'Carro',
      field: 'carId',
      valueFormatter: (params: CellFunctionParams) => params?.value || '--',
    },
    {
      headerName: 'Inicio',
      field: 'startDate',
      valueFormatter: (params: CellFunctionParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Previsão de entrega',
      field: 'expectedReturnDate',
      valueFormatter: (params: CellFunctionParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
  ]
}
