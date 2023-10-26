import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { Category } from '../interfaces/Category'

export function useColumns() {
  return [
    {
      field: 'name',
      headerName: 'Nome',
      valueFormatter: (params: CellFunctionParams<Category>) => params.value,
    },
  ]
}
