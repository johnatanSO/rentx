'use client'

import { TableComponent } from '@/components/_ui/TableComponent'
import { Car } from './interfaces/Car'
import style from './Favoriteds.module.scss'
import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { ListCars } from '../Home/ListCars'

interface ServerProps {
  favoriteds: Car[]
}

export function Favoriteds({ favoriteds }: ServerProps) {
  const columns = [
    {
      headerName: 'Nome',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<Car>) => params.value,
    },
  ]
  return (
    <div className={style.favoritedsContainer}>
      {/* <ListCars avaliableCars={favoriteds} /> */}
      <TableComponent rows={favoriteds} columns={columns} loading={false} />
    </div>
  )
}
