import { Filters } from './Filters'
import style from './Home.module.scss'
import { ListCars } from './ListCars'

export function Home() {
  return (
    <div className={style.carsContainer}>
      <h3>Dirija o carro dos seus sonhos</h3>
      <Filters />
      <ListCars />
    </div>
  )
}
