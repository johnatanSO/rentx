import { CarDetails } from '@/components/screens/CarDetails'
import { getCarDetailsService } from '@/services/cars/getCarDetails/GetCarDetailsService'

type PageProps = {
  params: {
    carId: string
  }
}

export default async function CarDetailsPage({ params }: PageProps) {
  const { data } = await getCarDetailsService(params.carId)
  const car = data.item

  return <CarDetails car={car} />
}
