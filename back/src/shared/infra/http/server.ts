import 'reflect-metadata'
import express, { Express, NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { router } from './routes'
import cors from 'cors'
import dbConnection from '../mongodb'
import '../../container'
import { AppError } from '../../errors/AppError'

interface CustomExpress extends Express {
  mongo?: any
}

const app: CustomExpress = express()
app.mongo = dbConnection

app.use(express.json())
app.use(cors())
app.use(router)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  return res.status(500).json({
    success: false,
    status: 'error',
    message: `Erro interno do servidor - ${err.message}`,
  })
})

app.listen(3333, () => {
  console.log('Server is running!')
})
app.get('/', (req, res) => {
  res.send('Hello world')
})
