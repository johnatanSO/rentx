import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import dayjs from 'dayjs'
import Image from 'next/image'
import unknownCarImage from '../../../../../public/assets/images/cars/unknownCarImage.png'
import { CarImage } from '../interfaces/CarImage'

export function useColumns() {
  function getCarIcon(images: CarImage[]) {
    if (images.length === 0) return unknownCarImage

    return process.env.NEXT_PUBLIC_END_POINT + images[0].path
  }

  return [
    {
      headerName: '',
      field: 'car',
      cellRenderer: (params: CellFunctionParams) => (
        <Image
          width={60}
          height={60}
          alt="Car default image"
          src={getCarIcon(params.value.images)}
        />
      ),
    },
    {
      headerName: 'Carro',
      field: 'car',
      valueFormatter: (params: CellFunctionParams) => params.value.name,
    },
    {
      headerName: 'Inicio',
      field: 'startDate',
      valueFormatter: (params: CellFunctionParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Previsão de entrega',
      field: 'expectedReturnDate',
      valueFormatter: (params: CellFunctionParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
  ]
}
