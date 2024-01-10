import { Field } from '@/components/_ui/ListMobile/interfaces/Field'
import { formatCurrency } from '@/utils/format'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'name',
      cellRenderer: (params: any) => {
        return `${params.value} - ${params.data.licensePlate}`
      },
    },
    {
      field: 'dailyRate',
      valueFormatter: (params: any) => formatCurrency(params.value || 0),
    },
  ]
}
