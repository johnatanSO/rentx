import { Field } from '@/components/_ui/ListMobile/interfaces/Field'
import { formatCurrency } from '@/utils/format'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'car',
      cellRenderer: (params: {
        value: { name: string; licensePlate: string }
      }) => {
        return `${params.value.name} - ${params.value.licensePlate}`
      },
    },
    {
      field: 'totalValue',
      valueFormatter: (params: { value: number }) =>
        formatCurrency(params.value || 0),
    },
  ]
}
