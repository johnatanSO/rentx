import { Field } from '@/components/_ui/ListMobile/interfaces/Field'
import dayjs from 'dayjs'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'name',
      valueFormatter: (params: { value: string }) => params.value,
    },
    {
      field: 'createdAt',
      valueFormatter: (params: { value: string | Date }) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
  ]
}
