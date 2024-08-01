import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  Skeleton,
} from '@mui/material'
import style from './ListMobile.module.scss'
import { useState } from 'react'
import { EmptyItems } from '../EmptyItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { CollapseItem } from './interfaces/CollapseItem'
import { Field } from './interfaces/Field'

interface ItemStatus {
  [itemId: string]: boolean
}

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
  itemFields: Field[]
  collapseItems: CollapseItem[]
  loading: boolean
}

export function ListMobile({
  items,
  itemFields,
  collapseItems,
  loading,
}: Props) {
  const [itemOpened, setItemOpened] = useState<ItemStatus>({})

  function handleOpenItem(itemId: string) {
    setItemOpened({
      [itemId]: !itemOpened[itemId],
    })
  }

  return (
    <List className={style.list}>
      {items.length > 0 &&
        !loading &&
        items?.map((item) => {
          const collapseOpened = itemOpened[item._id] || false

          return (
            <div key={item._id} className={style.groupItem}>
              <ListItem
                onClick={() => {
                  handleOpenItem(item._id)
                }}
                className={style.listItem}
              >
                {itemFields?.map((field, index) => {
                  return (
                    <span
                      className={field?.cellClass?.({
                        value: item[field.field],
                        data: item,
                      })}
                      key={field.field}
                      style={{
                        marginRight: index === 0 ? 'auto' : 0,
                      }}
                    >
                      {field?.valueFormatter?.({
                        value: item[field.field],
                        data: item,
                      })}

                      {field?.cellRenderer?.({
                        value: item[field.field],
                        data: item,
                      })}
                    </span>
                  )
                })}
                <FontAwesomeIcon
                  className={style.angleIcon}
                  icon={faAngleDown}
                />
              </ListItem>

              <Collapse in={collapseOpened} className={style.collapse}>
                <List className={style.collapseList}>
                  {collapseItems.map((collapseItem) => {
                    return (
                      <ListItemButton
                        key={collapseItem.field}
                        className={style.collapseListItem}
                      >
                        {collapseItem.type === 'actions' ? (
                          <>
                            {collapseItem?.cellRenderer?.({
                              value: item[collapseItem.field],
                              data: item,
                            })}
                          </>
                        ) : (
                          <>
                            <span style={{ fontWeight: '600' }}>
                              {collapseItem.headerName}
                            </span>
                            <span
                              className={collapseItem?.cellClass?.({
                                value: item[collapseItem.field],
                                data: item,
                              })}
                            >
                              {collapseItem?.valueFormatter?.({
                                value: item[collapseItem.field],
                                data: item,
                              })}

                              {collapseItem?.cellRenderer?.({
                                value: item[collapseItem.field],
                                data: item,
                              })}
                            </span>
                          </>
                        )}
                      </ListItemButton>
                    )
                  })}
                </List>
              </Collapse>
            </div>
          )
        })}

      {(items.length === 0 || !items) && !loading && (
        <EmptyItems text="Nenhum aluguel encontrado" />
      )}

      {loading &&
        [1, 2, 3, 4].map((fakeItem) => {
          return (
            <div key={fakeItem} className={style.groupItem}>
              <ListItem className={style.listItem}>
                <Skeleton
                  variant="rounded"
                  height={25}
                  width={150}
                  sx={{
                    fontSize: '1rem',
                    borderRadius: 15,
                    marginRight: 'auto',
                  }}
                />
                <Skeleton
                  variant="rounded"
                  height={25}
                  width={100}
                  sx={{ fontSize: '1rem', borderRadius: 15 }}
                />
              </ListItem>
            </div>
          )
        })}
    </List>
  )
}
