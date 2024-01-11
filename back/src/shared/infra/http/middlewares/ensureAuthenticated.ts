import { UsersTokensRepository } from './../../../../modules/accounts/repositories/UsersTokens/UsersTokensRepository'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../../errors/AppError'
import auth from '../../../../config/auth'

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError('Token não enviado', 401)
  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, auth.secretRefreshToken)

    const usersTokensRepository = new UsersTokensRepository()
    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      userId.toString(),
      token,
    )

    if (!user) throw new AppError('Usuário inválido', 401)

    req.user = {
      _id: userId.toString(),
    }

    next()
  } catch {
    throw new AppError('Token inválido', 401)
  }
}
