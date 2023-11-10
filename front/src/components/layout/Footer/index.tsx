import style from './Footer.module.scss'
import packageJSON from '../../../../package.json'

export function Footer() {
  return (
    <footer className={style.footerContainer}>
      <span>&copy; Rentx - Johnatan v {packageJSON.version}</span>
    </footer>
  )
}
