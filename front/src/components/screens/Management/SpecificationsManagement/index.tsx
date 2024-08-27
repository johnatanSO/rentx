'use client'

import style from './SpecificationsManagement.module.scss'
import { TableComponent } from '@/components/_ui/TableComponent'
import { useColumns } from './hooks/useColumns'
import { ISpecification } from '@/models/interfaces/ISpecification'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { CreateNewSpecification } from './CreateNewSpecification'
import { useState } from 'react'
import { ModalEditSpecification } from './partials/ModalEditSpecification'
import { ListMobile } from '@/components/_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { Divider } from '@mui/material'
import { useSpecificationList } from '@/hooks/useSpecificationList'

export function SpecificationsManagement() {
  const {
    loadingSpecifications,
    searchString,
    setSearchString,
    specifications,
    getSpecifications,
  } = useSpecificationList()

  const {
    columns,
    modalEditSpecificationOpened,
    specificationToEdit,
    setModalEditSpecificationOpened,
  } = useColumns({ getSpecifications })

  const itemFields = useFieldsMobile()

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
            loading={loadingSpecifications}
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
