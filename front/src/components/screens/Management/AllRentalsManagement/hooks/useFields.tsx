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
      field: 'total',
      valueFormatter: (params: { value: number }) =>
        params.value ? formatCurrency(params.value) : '--',
    },
  ]
}
