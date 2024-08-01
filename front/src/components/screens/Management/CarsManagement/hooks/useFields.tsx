import { Field } from '@/components/_ui/ListMobile/interfaces/Field'
import { formatCurrency } from '@/utils/format'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'name',
      cellRenderer: (params: {
        value: string
        data: { licensePlate: string }
      }) => {
        return `${params.value} - ${params.data.licensePlate}`
      },
    },
    {
      field: 'dailyRate',
      valueFormatter: (params: { value: number }) =>
        formatCurrency(params.value || 0),
    },
  ]
}
