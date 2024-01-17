import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../../errors/AppError'
import auth from '../../../../config/auth'
import { UsersRepository } from '../../../../modules/accounts/repositories/Users/UsersRepository'

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError('Token não enviado', 401)
  const [, token] = authHeader.split(' ')

  try {
    const { secretToken } = auth
    const verifyResponse = verify(token, secretToken)

    const userId = verifyResponse.sub

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(userId.toString())

    if (!user) throw new AppError('Usuário inválido', 401)

    req.user = {
      _id: userId.toString(),
    }

    next()
  } catch (err) {
    console.log('ERROR', err.message)
    throw new AppError('Token inválido', 401)
  }
}
