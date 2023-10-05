import style from './ListCars.module.scss'

export function ListCars() {
  return (
    <ul className={style.listCarsContainer}>
      <li>car 1</li>
      <li>car 2</li>
      <li>car 3</li>
    </ul>
  )
}
