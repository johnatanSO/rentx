/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react'
import { CollapseFunctionParams } from './Functions'

export interface Field {
  field: string
  valueFormatter?: (params: CollapseFunctionParams<any>) => any
  cellRenderer?: (params: CollapseFunctionParams<any>) => ReactNode
  cellClass?: (params: CollapseFunctionParams<any>) => string
}
