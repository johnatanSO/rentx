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
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { listAllSpecificationsService } from '@/services/specifications/listAllSpecifications/ListAllSpecificationsService'
import { Divider } from '@mui/material'

export function SpecificationsManagement() {
  const [specifications, setSpecifications] = useState<Specification[]>([])
  const [searchString, setSearchString] = useState<string>('')
  const [specificationToEdit, setSpecificationToEdit] =
    useState<Specification | null>(null)
  const [modalEditSpecificationOpened, setModalEditSpecificationOpened] =
    useState<boolean>(false)
  const [loadingSpecifications, setLoadingSpecifications] =
    useState<boolean>(true)

  const columns = useColumns({ handleEditSpecification, getSpecifications })
  const itemFields = useFieldsMobile()

  function handleEditSpecification(specification: Specification) {
    setSpecificationToEdit(specification)
    setModalEditSpecificationOpened(true)
  }

  function filterByName() {
    setLoadingSpecifications(true)
    const filteredSpecifications = specifications.filter((specification) =>
      specification.name
        .toLowerCase()
        .trim()
        .includes(searchString.toLowerCase().trim()),
    )
    setLoadingSpecifications(false)
    setSpecifications(filteredSpecifications)
  }

  function getSpecifications() {
    setLoadingSpecifications(true)
    listAllSpecificationsService()
      .then(({ data: { items } }) => {
        setSpecifications(items)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoadingSpecifications(false)
      })
  }

  useEffect(() => {
    filterByName()
  }, [searchString])

  useEffect(() => {
    getSpecifications()
  }, [])

  return (
    <>
      <CreateNewSpecification getSpecifications={getSpecifications} />

      <Divider />

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
        <div className={style.viewDesktop}>
          <TableComponent
            rows={specifications}
            columns={columns}
            loading={loadingSpecifications}
          />
        </div>
        <div className={style.viewMobile}>
          <ListMobile
            items={specifications}
            itemFields={itemFields}
            collapseItems={columns}
          />
        </div>
      </section>

      {modalEditSpecificationOpened && specificationToEdit && (
        <ModalEditSpecification
          getSpecifications={getSpecifications}
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
