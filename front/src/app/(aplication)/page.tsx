import { Home } from '@/components/screens/Home'
import { getAvaliableCarsService } from '@/services/cars/getAvaliableCars/GetAvaliableCarsService'

export default async function HomePage({ searchParams }: any) {
  const { data } = await getAvaliableCarsService({
    name: searchParams.name,
    categoryId: searchParams.categoryId,
  })

  const avaliableCars = data.items

  return <Home cars={avaliableCars} />
}
