import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../../errors/AppError'
import auth from '../../../../config/auth'
import { TypeormUsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/TypeormUsersRepository'

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
    const { sub: userId } = verify(token, secretToken)

    const usersRepository = new TypeormUsersRepository()
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
