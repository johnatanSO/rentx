import { Field } from '@/components/_ui/ListMobile/interfaces/Field'
import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { ICar } from '@/models/interfaces/ICar'
import { formatCurrency } from '@/utils/format'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'name',
      cellRenderer: (params: CellFunctionParams<ICar>) => {
        return `${params.value} - ${params.data.licensePlate}`
      },
    },
    {
      field: 'dailyRate',
      valueFormatter: (params: CellFunctionParams<ICar>) =>
        formatCurrency(Number(params.value || 0)),
    },
  ]
}
