import Image from 'next/image'
import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { CarImage } from '../interfaces/CarImage'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'
import { Car } from '../interfaces/Car'
import style from '../CarsManagement.module.scss'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'

export function useColumns() {
  function getCarImageUrl(images: CarImage[]) {
    if (images.length === 0) return unknownCarImage

    return process.env.NEXT_PUBLIC_END_POINT + images[0]?.path
  }

  return [
    {
      headerName: 'Carro',
      field: 'images',
      cellRenderer: (params: CellFunctionParams<Car>) => {
        return (
          <div className={style.carModelContainer}>
            <Image
              alt="Avatar do carro"
              className={style.carImage}
              width={500}
              height={500}
              src={getCarImageUrl(params.value)}
            />
            <b className={style.carName}>{params.data.name}</b>
          </div>
        )
      },
    },
    {
      headerName: 'Placa',
      field: 'licensePlate',
      valueFormatter: (params: CellFunctionParams<Car>) => params.value,
    },
    {
      headerName: 'Valor diário',
      field: 'dailyRate',
      valueFormatter: (params: CellFunctionParams<Car>) =>
        formatCurrency(params.value || 0),
    },
    {
      headerName: 'Disponível',
      field: 'avaliable',
      valueFormatter: (params: CellFunctionParams<Car>) =>
        params.value ? 'Sim' : 'Não',
    },
    {
      headerName: '',
      field: 'actions',
      cellRenderer: (params: CellFunctionParams<Car>) => (
        <Link
          href={`/management/cars/${params.data._id}`}
          className={style.showDetailsButton}
        >
          Ver detalhes
        </Link>
      ),
    },
  ]
}
