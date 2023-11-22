import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Car } from '../../interfaces/Car'
import style from './EditInfosSection.module.scss'
import { faSave } from '@fortawesome/free-solid-svg-icons'

type Props = {
  car: Car
}
export function EditInfosSection({ car }: Props) {
  return (
    <section className={style.section}>
      <header>
        <h3>Informações</h3>
        <button
          className={style.saveInfosButton}
          type="button"
          onClick={() => undefined}
        >
          <FontAwesomeIcon icon={faSave} className={style.icon} />
          Salvar
        </button>
      </header>

      <ul className={style.listCarSpecifications}>
        {car.specifications.length > 0 &&
          car.specifications.map((specification) => {
            return (
              <li key={specification._id}>
                <span>{specification.name || '--'}</span>
              </li>
            )
          })}
      </ul>
    </section>
  )
}
