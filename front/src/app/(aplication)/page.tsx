import { Home } from '@/components/screens/Home'
import { getAvaliableCarsService } from '@/services/cars/getAvaliableCars/GetAvaliableCarsService'

export default async function HomePage() {
  const { data } = await getAvaliableCarsService({ name: '', categoryId: '' })
  const avaliableCars = data.items

  return <Home cars={avaliableCars} />
}
