import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './SpecificationsSection.module.scss'
import { Car } from '../../interfaces/Car'
import { createCarSpecificationService } from '@/services/cars/createCarSpecification/CreateCarSpecificationService'
import { useContext } from 'react'
import { AlertContext } from '@/contexts/alertContext'

type Props = {
  car: Car
}

export function SpecificationsSection({ car }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  function handleAddSpecification() {
    createCarSpecificationService({
      carId: car._id,
      specificationsIds: [],
    })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Especificações adicionadas com sucesso`,
          type: 'success',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar adicionar especificações - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
  }

  return (
    <section className={style.section}>
      <header>
        <h3>Especificações</h3>
        <button
          className={style.editSpecificationsButton}
          type="button"
          onClick={handleAddSpecification}
        >
          <FontAwesomeIcon icon={faPlus} className={style.icon} />
          Editar especificações
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
        {car.specifications.length === 0 && (
          <li>
            <p>Nenhuma especificação encontrada</p>
          </li>
        )}
      </ul>
    </section>
  )
}
