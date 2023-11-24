'use client'

import style from './SpecificationsManagement.module.scss'
import { TableComponent } from '@/components/_ui/TableComponent'
import { useColumns } from './hooks/useColumns'
import { Specification } from './interfaces/Specification'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { CreateNewSpecification } from './CreateNewSpecification'
import { useEffect, useState } from 'react'

type Props = {
  allSpecifications: Specification[]
}

export function SpecificationsManagement({ allSpecifications }: Props) {
  const columns = useColumns()
  const [specifications, setSpecifications] =
    useState<Specification[]>(allSpecifications)
  const [searchString, setSearchString] = useState<string>('')

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
      </section>
    </>
  )
}
