import { CustomAvatar } from './Avatar'
import style from './Header.module.scss'

export function Header() {
  return (
    <header className={style.headerContainer}>
      <nav>
        <ul>
          <li>Home</li>
          <li>Sobre</li>
          <li>Contato</li>
        </ul>
      </nav>

      <div className={style.user}>
        <CustomAvatar />
      </div>
    </header>
  )
}
