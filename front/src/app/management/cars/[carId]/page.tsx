import { CarInfos } from '@/components/screens/Management/CarsManagement/CarInfos'
import { httpClientProvider } from '@/providers/httpClientProvider'
import { getCarDetailsService } from '@/services/cars/getCarDetails/GetCarDetailsService'

type PageProps = {
  params: {
    carId: string
  }
}

export default async function CarDetailsPage({ params }: PageProps) {
  const { data } = await getCarDetailsService(params.carId, httpClientProvider)

  const car = data.item

  return <CarInfos car={car} />
}
