import style from './Footer.module.scss'
import packageJSON from '../../../../package.json'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={style.footerContainer}>
      <span>
        &copy; Rentx - Johnatan Santos {year} | v{packageJSON.version}
      </span>
    </footer>
  )
}
