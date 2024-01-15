import Link from 'next/link'
import style from './About.module.scss'
import { Divider } from '@mui/material'

export function About() {
  return (
    <section className={style.aboutContainer}>
      <header>
        <h2>Sobre o sistema</h2>
      </header>

      <section>
        <div className={style.aboutSystemInfos}>
          <p>
            O <b>RentX</b> é uma aplicação completa destinada à um
            estabelecimento que realiza alugueis e controle de veículos.
          </p>

          <p>
            Foi inteiramente construído pelo desenvolvedor{' '}
            <button type="button" className={style.perfilLinksButton}>
              Johnatan Santos
            </button>{' '}
            e não possui nenhum fim lucrativo, somente para portfólio e
            apresentação
          </p>

          <p>
            O sistema possui uma área para o cliente, com a{' '}
            <Link href="/">visualização dos carros que estão disponíveis</Link>{' '}
            para serem alugados e uma página específica de cada carro com
            informações mais detalhadas e a opção de realização do aluguel.{' '}
          </p>

          <p>
            Possui também uma página com o relatório de{' '}
            <Link href="/rentals">
              todos os alugueis já realizados pelo usuário
            </Link>{' '}
            com informações de datas, valores, carro escolhido e a opção de
            finalizar os que ainda estão em andamento.
          </p>

          <p>
            Além disso, o sistema também possui uma área para gestão que é
            acessada somente por usuários com permissão de administrador. Nela
            estão disponíveis o gerenciamento de carros cadastrados e edição de
            informações, controle de categorias e especificações, controle de
            todos os alugueis realizados por todos os usuários com opção de
            edição e também a possibilidade de importação de categorias através
            de um arquivo .CSV
          </p>
        </div>

        <div className={style.technicalInfos}>
          <h2>Espeficiações tecnicas</h2>
          <h3>Front-end</h3>
          <p>
            Seguindo as boas práticas, o sistema foi feito utilizando as
            seguintes tecnologias/bibliotecas
          </p>

          <ul className={style.listTechs}>
            <li>NextJS/ReactJS</li>

            <li>CSS/SASS modules</li>

            <li>Typescript/Javascript</li>

            <li>MaterialUI Components</li>

            <li>Axios</li>

            <li>SwiperJS</li>

            <li>Dayjs</li>

            <li>Fortawesome</li>
          </ul>

          <Divider />

          <h3>Back-end</h3>
          <p>
            Já na construção da API, foram utilizadas as seguintes tecnologias
          </p>
          <ul className={style.listTechs}>
            <li>NodeJS</li>

            <li>Express</li>

            <li>Typescript/Javascript</li>

            <li>MongoDB</li>

            <li>Jest para testes unitários</li>

            <li>Nodemailer para envio de e-mails</li>

            <li>JWT para gerenciamento de tokens</li>
          </ul>
        </div>
      </section>
    </section>
  )
}
