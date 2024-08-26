import { Field } from '@/components/_ui/ListMobile/interfaces/Field'
import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { ICategory } from '@/models/interfaces/ICategory'
import dayjs from 'dayjs'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'name',
      valueFormatter: (params: CellFunctionParams<ICategory>) => params.value,
    },
    {
      field: 'createdAt',
      valueFormatter: (params: CellFunctionParams<ICategory>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
  ]
}
