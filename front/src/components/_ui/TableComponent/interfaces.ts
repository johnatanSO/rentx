/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react'

export interface CellFunctionParams<T = any> {
  data: T
  value: string | number
}

export interface Column {
  headerName: string
  field: string
  valueFormatter?: (params: CellFunctionParams) => any
  cellRenderer?: (params: CellFunctionParams) => ReactNode
  cellClass?: (params: CellFunctionParams) => string
  flex?: number | string
}
