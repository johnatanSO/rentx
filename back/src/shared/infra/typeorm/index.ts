import { DataSource } from 'typeorm'
import path from 'path'

export const myDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  entities: [
    path.join(__dirname, '/../../../modules/**/infra/typeorm/entities/*.ts'),
  ],
  logging: false,
  synchronize: false,
})

myDataSource
  .initialize()
  .then(() => {
    console.log('Banco de dados POSTGRES conectado com sucesso')
  })
  .catch((err) => {
    console.log('Erro ao tenrar conectar bando de dados POSTGRES')
    console.log(err)
  })

export default myDataSource
