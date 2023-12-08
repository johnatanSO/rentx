import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './SpecificationsSection.module.scss'
import { Car } from '../../interfaces/Car'
import { useState } from 'react'
import { ModalSpecifications } from './ModalSpecifications'
import { Divider } from '@mui/material'

type Props = {
  car: Car
}

export function SpecificationsSection({ car }: Props) {
  const [modalAddSpecificationsOpened, setModalAddSpecificationsOpened] =
    useState<boolean>(false)

  function handleAddSpecification() {
    setModalAddSpecificationsOpened(true)
  }

  return (
    <>
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

                  <Divider orientation="vertical" />

                  <span>{specification.description || '--'}</span>
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

      <ModalSpecifications
        car={car}
        open={modalAddSpecificationsOpened}
        handleClose={() => {
          setModalAddSpecificationsOpened(false)
        }}
      />
    </>
  )
}
