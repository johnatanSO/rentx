import { Field } from '@/components/_ui/ListMobile/interfaces/Field'
import { formatCurrency } from '@/utils/format'
import dayjs from 'dayjs'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'car',
      cellRenderer: (params: any) => {
        return `${params.value.name} - ${params.value.licensePlate}`
      },
    },
    {
      field: 'totalValue',
      valueFormatter: (params: any) =>
        params.value ? formatCurrency(params.value) : '--',
    },
  ]
}
