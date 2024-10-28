'use client'

import style from './CarDetails.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import unknownCarImage from '../../../../public/assets/images/cars/unknownCarImage.png'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { Loading } from '@/components/_ui/Loading'
import { formatCurrency } from '@/utils/format'
import { Divider } from '@mui/material'
import { ICar } from '@/models/interfaces/ICar'
import { useCreateRental } from './hooks/useCreateRental'

type Props = {
  car: ICar
}

export function CarDetails({ car }: Props) {
  const {
    displayImage,
    errors,
    getExpectedValue,
    getLengthDays,
    handleSubmit,
    isSubmitting,
    onCreateNewRental,
    register,
    setDisplayImage,
    router,
  } = useCreateRental({ car })

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

          <ul className={style.otherImagesList}>
            <li
              className={style.imageContainer}
              onClick={() => {
                setDisplayImage(car.defaultImage)
              }}
            >
              <Image
                className={style.image}
                alt="Car image"
                width={500}
                height={300}
                src={car.defaultImage?.path || unknownCarImage}
              />
            </li>
            {car.images.length > 0 &&
              car.images.map((image) => {
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
        </div>

        <Divider flexItem orientation="vertical" />
        <Divider
          className={style.mobileDivider}
          flexItem
          orientation="horizontal"
        />

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

          <form onSubmit={handleSubmit(onCreateNewRental)}>
            <CustomTextField
              size="medium"
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Data de devolução"
              {...register('expectedReturnDate')}
              error={!!errors.expectedReturnDate}
              helperText={
                errors.expectedReturnDate && errors.expectedReturnDate.message
              }
            />
            <button
              disabled={isSubmitting}
              className={style.rentalButton}
              type="submit"
            >
              {isSubmitting ? <Loading size={21} /> : 'Alugar'}
            </button>
          </form>
        </div>
      </section>
    </section>
  )
}
