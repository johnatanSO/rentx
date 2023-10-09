import { getCarDetailsService } from '@/services/cars/getCarDetails/GetCarDetailsService'

export default function CarDetails({ props }: any) {
  return <CarDetails car={props.car} />
}

export async function getServerSideProps(context: any) {
  console.log('context', context.params)
  const carId = context.params.carId
  const { data } = await getCarDetailsService(carId)
  const carDetails = data.item

  return {
    props: {
      car: carDetails,
    },
  }
}
