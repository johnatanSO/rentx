import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import dayjs from 'dayjs'
import { Rental } from '../interfaces/Rental'
import { Car } from '../interfaces/Car'
import style from '../Rentals.module.scss'
import Image from 'next/image'
import { CarImage } from '../interfaces/CarImage'
import unknownCarImage from '../../../../../public/assets/images/cars/unknownCarImage.png'

export function useColumns() {
  function getCarImageUrl(images: CarImage[]) {
    if (images.length === 0) return unknownCarImage

    return process.env.NEXT_PUBLIC_END_POINT + images[0]?.path
  }

  return [
    {
      headerName: 'Carro',
      field: 'car',
      cellRenderer: (params: CellFunctionParams<Car>) => {
        return (
          <div className={style.carModelContainer}>
            <Image
              alt="Avatar do carro"
              className={style.carImage}
              width={500}
              height={500}
              src={getCarImageUrl(params.value.images)}
            />
            <b className={style.carName}>{params.value.name}</b>
          </div>
        )
      },
    },
    {
      headerName: 'Inicio',
      field: 'startDate',
      valueFormatter: (params: CellFunctionParams<Rental>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Previsão de entrega',
      field: 'expectedReturnDate',
      valueFormatter: (params: CellFunctionParams<Rental>) =>
        dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      headerName: 'Status',
      field: 'endDate',
      valueFormatter: (params: CellFunctionParams<Rental>) => {
        if (!params.value) return 'Em andamento'

        return 'Finalizado'
      },
    },
    {
      headerName: 'Data de entrega',
      field: 'endDate',
      valueFormatter: (params: CellFunctionParams<Rental>) =>
        params?.value
          ? dayjs(params?.value).format('DD/MM/YYYY - HH:mm')
          : '--',
    },
  ]
}
