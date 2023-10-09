import { CarDetails } from '@/components/screens/CarDetails'
import { getCarDetailsService } from '@/services/cars/getCarDetails/GetCarDetailsService'

export default async function CarDetailsPage({ params }: any) {
  const { data } = await getCarDetailsService(params.carId)
  const car = data.item

  return <CarDetails car={car} />
}
