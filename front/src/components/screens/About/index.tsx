import style from './About.module.scss'

export function About() {
  return (
    <section className={style.aboutContainer}>
      <header>
        <h2>Sobre o sistema</h2>
      </header>

      <section>* Descreva aqui sobre</section>
    </section>
  )
}
