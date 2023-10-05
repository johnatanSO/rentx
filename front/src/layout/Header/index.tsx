import style from './Header.module.scss'

export function Header() {
  return (
    <header className={style.headerContainer}>
      <div className={style.topSection}>
        <h1>Título</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Sobre</li>
            <li>Sua conta</li>
            <li>Contatos</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
