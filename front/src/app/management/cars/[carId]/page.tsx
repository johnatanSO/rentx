import { CarInfos } from '@/components/screens/Management/CarsManagement/CarInfos'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { getCarDetailsService } from '@/services/cars/getCarDetails/GetCarDetailsService'

type PageProps = {
  params: {
    carId: string
  }
}

export default async function CarDetailsPage({ params: { carId } }: PageProps) {
  const { data } = await getCarDetailsService(carId, httpClientProvider)

  const car = data.item

  return <CarInfos car={car} />
}
