import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { Specification } from '../interfaces/Specification'

export function useColumns() {
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
        params.value,
    },
  ]
}
