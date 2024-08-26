import { Field } from '@/components/_ui/ListMobile/interfaces/Field'
import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { IRental } from '@/models/interfaces/IRental'
import { formatCurrency } from '@/utils/format'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'car',
      cellRenderer: (params: CellFunctionParams<IRental>) => {
        return `${params.data.car.name} - ${params.data.car.licensePlate}`
      },
    },
    {
      field: 'totalValue',
      valueFormatter: (params: CellFunctionParams<IRental>) =>
        formatCurrency(Number(params.value || 0)),
    },
  ]
}
