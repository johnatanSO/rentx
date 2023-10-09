import { getCarDetailsService } from '@/services/cars/getCarDetails/GetCarDetailsService'

export default function CarDetails({ props }) {
  return <CarDetails car={props.car} />
}

export async function getServerSideProps() {
  const carId = ''
  const { data } = await getCarDetailsService(carId)
  const carDetails = data.item

  return {
    props: {
      car: carDetails,
    },
  }
}
