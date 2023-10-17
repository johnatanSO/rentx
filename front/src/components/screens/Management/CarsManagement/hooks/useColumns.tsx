import Image from 'next/image'
import { CellFunctionParams } from '@/components/_ui/TableComponent/interfaces'
import { CarImage } from '../interfaces/CarImage'
import unknownCarImage from '../../../../../../public/assets/images/cars/unknownCarImage.png'

export function useColumns() {
  function getCarImageUrl(images: CarImage[]) {
    if (images.length === 0) return unknownCarImage

    return process.env.NEXT_PUBLIC_END_POINT + images[0]?.path
  }

  return [
    {
      headerName: 'Imagem',
      field: 'images',
      cellRenderer: (params: CellFunctionParams) => {
        return (
          <Image
            alt="Avatar do carro"
            width={60}
            height={60}
            src={getCarImageUrl(params.value)}
          />
        )
      },
    },
    {
      headerName: 'Nome',
      field: 'name',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
  ]
}
