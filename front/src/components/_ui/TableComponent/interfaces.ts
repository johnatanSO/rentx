import { ReactNode } from 'react'

export interface CellFunctionParams<DataModel> {
  data: DataModel
  value: string | number
}

export interface Column {
  headerName: string
  field: string
  valueFormatter?: (params: CellFunctionParams<any>) => string | number
  cellRenderer?: (params: CellFunctionParams<any>) => ReactNode
  cellClass?: (params: CellFunctionParams<any>) => string | number
}
