'use client'
import style from './CategoriesManagement.module.scss'
import { useState, useEffect, useContext } from 'react'
import { TableComponent } from '@/components/_ui/TableComponent'
import { Category } from './interfaces/Category'
import { getAllCategoriesService } from '@/services/category/getAllCategories/GetAllCategoriesService'
import { AlertContext } from '@/contexts/alertContext'
import { useColumns } from './hooks/useColumns'
import { CustomTextField } from '@/components/_ui/CustomTextField'
import { CreateNewCategory } from './CreateNewCategory'

type Props = {
  categories: Category[]
}

export function CategoriesManagement({ categories }: Props) {
  const columns = useColumns()

  return (
    <>
      <CreateNewCategory />

      <header className={style.header}>
        <h2>Categorias</h2>
        <CustomTextField
          className={style.searchInput}
          label="Buscar pelo nome"
        />
      </header>

      <section className={style.tableSection}>
        <TableComponent rows={categories} columns={columns} loading={false} />
      </section>
    </>
  )
}
