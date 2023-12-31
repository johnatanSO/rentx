import style from './TableComponent.module.scss'
import { Column } from './interfaces'

interface Props {
  columns: Column[]
  rows: any[]
  loading: boolean
}

export function TableComponent({ columns, rows, loading }: Props) {
  return (
    <table style={loading ? { opacity: 0.5 } : {}} className={style.table}>
      <thead>
        <tr>
          {columns?.map((column) => {
            return (
              <th key={column.field}>
                <p>{column?.headerName || ''}</p>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 &&
          rows?.map((row) => {
            return (
              <tr key={row._id}>
                {columns.map((column) => {
                  return (
                    <td
                      className={column?.cellClass?.({
                        value: row[column.field],
                        data: row,
                      })}
                      key={column.field}
                      style={{ flex: 1 }}
                    >
                      {column?.valueFormatter?.({
                        value: row[column.field],
                        data: row,
                      })}

                      {column?.cellRenderer?.({
                        value: row[column.field],
                        data: row,
                      })}
                    </td>
                  )
                })}
              </tr>
            )
          })}

        {rows.length === 0 && !loading && (
          <tr>
            <td className={style.emptyCell} colSpan={columns.length}>
              <p>Nenhum item encontrado</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
