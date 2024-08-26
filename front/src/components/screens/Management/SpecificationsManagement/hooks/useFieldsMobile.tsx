import { Field } from '@/components/_ui/ListMobile/interfaces/Field'
import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { ISpecification } from '@/models/interfaces/ISpecification'
import dayjs from 'dayjs'

export function useFieldsMobile(): Field[] {
  return [
    {
      field: 'name',
      valueFormatter: (params: CellFunctionParams<ISpecification>) =>
        params.value,
    },
    {
      field: 'createdAt',
      valueFormatter: (params: CellFunctionParams<ISpecification>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
  ]
}
