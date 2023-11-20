'use client'
import style from './SpecificationsManagement.module.scss'
import { useState, useEffect, useContext } from 'react'
import { TableComponent } from '@/components/_ui/TableComponent'
import { AlertContext } from '@/contexts/alertContext'
import { useColumns } from './hooks/useColumns'
import { listAllSpecificationsService } from '@/services/specifications/listAllSpecifications/ListAllSpecificationsService'
import { Specification } from './interfaces/Specification'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { CreateNewSpecification } from './CreateNewSpecification'

type Props = {
  specifications: Specification[]
}

export function SpecificationsManagement({ specifications }: Props) {
  const columns = useColumns()

  return (
    <>
      <CreateNewSpecification />

      <header className={style.header}>
        <h2>Especificações</h2>
        <CustomTextField
          className={style.searchInput}
          label="Buscar pelo nome"
        />
      </header>
      <section className={style.tableSection}>
        <TableComponent
          rows={specifications}
          columns={columns}
          loading={false}
        />
      </section>
    </>
  )
}
