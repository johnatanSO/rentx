import { UsersRepository } from '../../../../modules/accounts/repositories/Users/UsersRepository'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../../errors/AppError'

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError('Token não enviado', 401)
  const [, token] = authHeader.split(' ')

  const { sub: userId } = verify(token, 'b266fd9110e2a1a83398105a8d6cec43')

  const usersRepository = new UsersRepository()
  const user = await usersRepository.findById(userId.toString())

  if (!user) throw new AppError('Usuário inválido', 401)

  req.user = {
    _id: userId.toString(),
  }

  next()
}
