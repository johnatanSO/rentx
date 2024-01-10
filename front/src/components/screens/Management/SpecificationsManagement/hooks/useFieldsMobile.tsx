import { Field } from '@/components/_ui/ListMobile/interfaces/Field'
import dayjs from 'dayjs'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'name',
      valueFormatter: (params: any) => params.value,
    },
    {
      field: 'createdAt',
      valueFormatter: (params: any) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
  ]
}
