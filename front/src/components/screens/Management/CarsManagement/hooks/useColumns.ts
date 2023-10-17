import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'

export function useColumns() {
  return [
    {
      headerName: 'Nome',
      field: 'name',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
  ]
}
