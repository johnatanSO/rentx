'use client'

import style from './SpecificationsManagement.module.scss'
import { TableComponent } from '@/components/_ui/TableComponent'
import { useColumns } from './hooks/useColumns'
import { Specification } from './interfaces/Specification'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { CreateNewSpecification } from './CreateNewSpecification'
import { useEffect, useState } from 'react'
import { ModalEditSpecification } from './partials/ModalEditSpecification'
import { ListMobile } from '@/components/_ui/ListMobile'
import dayjs from 'dayjs'

type Props = {
  allSpecifications: Specification[]
}

export function SpecificationsManagement({ allSpecifications }: Props) {
  const [specifications, setSpecifications] =
    useState<Specification[]>(allSpecifications)
  const [searchString, setSearchString] = useState<string>('')
  const [specificationToEdit, setSpecificationToEdit] =
    useState<Specification | null>(null)
  const [modalEditSpecificationOpened, setModalEditSpecificationOpened] =
    useState<boolean>(false)

  const columns = useColumns({ handleEditSpecification })

  function handleEditSpecification(specification: Specification) {
    setSpecificationToEdit(specification)
    setModalEditSpecificationOpened(true)
  }

  function filterByName() {
    const filteredSpecifications = allSpecifications.filter((specification) =>
      specification.name
        .toLowerCase()
        .trim()
        .includes(searchString.toLowerCase().trim()),
    )
    setSpecifications(filteredSpecifications)
  }

  useEffect(() => {
    filterByName()
  }, [searchString])

  const itemFields = [
    {
      field: 'name',
      valueFormatter: (params: any) => params.value,
    },
    {
      field: 'createdAt',
      valueFormatter: (params: any) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
  ]

  return (
    <>
      <CreateNewSpecification />

      <header className={style.header}>
        <h2>Especificações</h2>
        <CustomTextField
          className={style.searchInput}
          label="Buscar pelo nome"
          value={searchString}
          onChange={(event) => {
            setSearchString(event?.target.value)
          }}
        />
      </header>
      <section className={style.tableSection}>
        <TableComponent
          rows={specifications}
          columns={columns}
          loading={false}
        />
        <ListMobile
          items={specifications}
          itemFields={itemFields}
          collapseItems={columns}
        />
      </section>

      {modalEditSpecificationOpened && specificationToEdit && (
        <ModalEditSpecification
          open={modalEditSpecificationOpened}
          handleClose={() => {
            setModalEditSpecificationOpened(false)
          }}
          specificationToEdit={specificationToEdit}
        />
      )}
    </>
  )
}
