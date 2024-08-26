import { Field } from '@/components/_ui/ListMobile/interfaces/Field'
import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { IRental } from '@/models/interfaces/IRental'
import { formatCurrency } from '@/utils/format'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'car',
      cellRenderer: ({ data: { car } }: CellFunctionParams<IRental>) => {
        return `${car?.name} - ${car?.licensePlate}`
      },
    },
    {
      field: 'total',
      valueFormatter: (params: CellFunctionParams<IRental>) =>
        params.value ? formatCurrency(Number(params.value || 0)) : '--',
    },
  ]
}
