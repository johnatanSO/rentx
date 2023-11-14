'use client'

import { TableComponent } from '@/components/_ui/TableComponent'
import { Car } from './interfaces/Car'
import style from './Favoriteds.module.scss'
import { ListCars } from '../Home/ListCars'
import { useColumns } from './hooks/useColumns'

interface ServerProps {
  favoriteds: Car[]
}

export function Favoriteds({ favoriteds }: ServerProps) {
  const columns = useColumns()
  return (
    <div className={style.favoritedsContainer}>
      {/* <ListCars avaliableCars={favoriteds} /> */}
      <TableComponent rows={favoriteds} columns={columns} loading={false} />
    </div>
  )
}
