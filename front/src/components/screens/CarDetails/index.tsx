'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useContext, useState } from 'react'
import { Car } from './interfaces/Car'
import style from './CarDetails.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { CarImage } from './interfaces/CarImage'
import unknownCarImage from '../../../../public/assets/images/cars/unknownCarImage.png'
import { createRentalService } from '@/services/rentals/createRental/CreateRentalService'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import dayjs from 'dayjs'
import { AlertContext } from '@/contexts/alertContext'
import { Loading } from '@/components/_ui/Loading'
import { getLocalUserService } from '@/services/user/getLocalUser/GetLocalUserService'
import { formatCurrency } from '@/utils/format'

type Props = {
  car: Car
}

export function CarDetails({ car }: Props) {
  const router = useRouter()
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [loadingCreateRental, setLoadingCreateRental] = useState<boolean>(false)
  const minExpectedReturnDate = dayjs().add(1, 'days').format('YYYY-MM-DD')
  const [expectedReturnDate, setExpectedReturnDate] = useState<string>(
    minExpectedReturnDate,
  )
  const [displayImage, setDisplayImage] = useState<CarImage>(
    car.images[0] || car.defaultImage || null,
  )

  async function onCreateNewRental(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const userInfo = await getLocalUserService()
    if (!userInfo) {
      router.push('/authenticate')
      return
    }

    setLoadingCreateRental(true)

    createRentalService({
      carId: car._id,
      expectedReturnDate,
    })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Aluguel cadastrado com sucesso`,
          type: 'success',
        })

        router.refresh()
        router.push('/rentals')
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar cadastrar aluguel do carro - ${
            err?.response?.data?.message || err?.message
          }`,
          type: 'error',
        })
      })
      .finally(() => {
        setLoadingCreateRental(false)
      })
  }

  function getExpectedValue() {
    const expectedReturnDateEndDay = dayjs(expectedReturnDate).endOf('day')
    const duration = dayjs(expectedReturnDateEndDay).diff(new Date(), 'day')
    const expectedValue = car.dailyRate * duration

    return expectedValue || 0
  }

  function getLengthDays() {
    const expectedReturnDateEndDay = dayjs(expectedReturnDate).endOf('day')
    return dayjs(expectedReturnDateEndDay).diff(new Date(), 'day')
  }

  return (
    <section className={style.carDetailsContainer}>
      <header className={style.titleContainer}>
        <button type="button" onClick={router.back} title="Voltar">
          <FontAwesomeIcon className={style.icon} icon={faAngleLeft} />
        </button>
        <h2>
          {car.name} | Placa {car.licensePlate}
        </h2>
      </header>

      <section>
        <div className={style.carImageContainer}>
          <Image
            className={style.carImage}
            width={1280}
            height={720}
            src={displayImage?.path || unknownCarImage}
            alt="Imagem do carro"
          />

          {car.images.length > 0 && (
            <ul className={style.otherImagesList}>
              {car.images.map((image) => {
                return (
                  <li
                    key={image._id}
                    className={style.imageContainer}
                    onClick={() => {
                      setDisplayImage(image)
                    }}
                  >
                    <Image
                      className={style.image}
                      alt="Car image"
                      width={500}
                      height={300}
                      src={image?.path || unknownCarImage}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className={style.infosContainer}>
          <div className={style.categoryContainer}>
            <h4>Categoria</h4>
            <span className={style.categoryTag}>{car.category.name}</span>
          </div>

          <div className={style.specificationsContainer}>
            <h4>Especificações</h4>

            <ul className={style.specificationsList}>
              {car.specifications.length > 0 &&
                car.specifications.map((specification) => {
                  return (
                    <li key={specification._id}>
                      <span className={style.specificationTag}>
                        {specification.name}
                      </span>
                    </li>
                  )
                })}
            </ul>

            {car.specifications.length === 0 && <p>Carro sem especificações</p>}
          </div>

          <div className={style.descriptionContainer}>
            <h4>Descrição</h4>
            <p>{car.description}</p>
          </div>

          <div className={style.summaryContainer}>
            <h4>Resumo</h4>
            <p>
              Diária <span>{formatCurrency(car.dailyRate || 0)}</span>
            </p>

            <p>
              Quantidade de dias <span> {getLengthDays()}</span>
            </p>
            <p>
              Valor previsto <span>{formatCurrency(getExpectedValue())}</span>
            </p>
            <p className={style.alertText}>
              *Caso aconteça atraso na data de retorno, será cobrado uma multa
              no valor de {formatCurrency(car.fineAmount || 0)} para cada dia
              excedido
            </p>
          </div>

          <form onSubmit={onCreateNewRental}>
            <CustomTextField
              size="medium"
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Data de devolução"
              value={expectedReturnDate}
              onChange={(event) => {
                setExpectedReturnDate(event?.target.value)
              }}
            />
            <button
              disabled={loadingCreateRental}
              className={style.rentalButton}
              type="submit"
            >
              {loadingCreateRental ? <Loading /> : 'Alugar'}
            </button>
          </form>
        </div>
      </section>
    </section>
  )
}
