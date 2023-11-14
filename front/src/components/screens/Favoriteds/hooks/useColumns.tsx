import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { Car } from '../interfaces/Car'

export function useColumns() {
  return [
    {
      headerName: 'Nome',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<Car>) => params.value,
    },
  ]
}
