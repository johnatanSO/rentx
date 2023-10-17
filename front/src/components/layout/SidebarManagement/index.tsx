import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './Sidebar.module.scss'
import { faCar, faTag, faToolbox } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '@mui/material'

export function SidebarManagement() {
  return (
    <aside className={style.asideContainer}>
      <Avatar className={style.avatar} />
      <ul>
        <li>
          <FontAwesomeIcon className={style.icon} icon={faCar} />
        </li>
        <li>
          <FontAwesomeIcon className={style.icon} icon={faTag} />
        </li>
        <li>
          <FontAwesomeIcon className={style.icon} icon={faToolbox} />
        </li>
      </ul>
    </aside>
  )
}
