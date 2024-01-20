'use client'
import Link from 'next/link'
import style from './About.module.scss'
import { Divider, Popover } from '@mui/material'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'

export function About() {
  const [anchorEl, setAnchorEl] = useState<any>(null)

  return (
    <section className={style.aboutContainer}>
      <header>
        <h2>Sobre o sistema</h2>
      </header>

      <section>
        <div className={style.aboutSystemInfos}>
          <p>
            O{' '}
            <Link target={'_blank'} href="https://github.com/johnatanSO/rentx">
              RentX
            </Link>{' '}
            é uma aplicação completa destinada à um estabelecimento que realiza
            alugueis e controle de veículos.
          </p>

          <p>
            Foi inteiramente construído pelo desenvolvedor{' '}
            <button
              onClick={(event) => {
                setAnchorEl(event?.currentTarget)
              }}
              type="button"
              className={style.perfilLinksButton}
            >
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
            edição e também a possibilidade de importação de novas categorias
            através de um arquivo .CSV
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

            <li>Nodemailer</li>

            <li>JWT</li>

            <li>Firebase Storage</li>
          </ul>
        </div>
      </section>

      <Popover
        id="simple-popover"
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null)
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ borderRadius: 15 }}
      >
        <div className={style.popoverContainer}>
          <Link
            className={style.linkedinLink}
            target={'_blank'}
            href="https://www.linkedin.com/in/johnatan-santos/"
          >
            <FontAwesomeIcon icon={faLinkedin} />
            Linkedin
          </Link>
          <Link
            className={style.githubLink}
            target={'_blank'}
            href="https://github.com/johnatanSO"
          >
            <FontAwesomeIcon icon={faGithub} />
            Github
          </Link>
          <Link
            className={style.portfolioLink}
            target={'_blank'}
            href="https://portfolio-johnatanso.vercel.app/"
          >
            <FontAwesomeIcon icon={faBriefcase} />
            Portfólio
          </Link>
        </div>
      </Popover>
    </section>
  )
}
