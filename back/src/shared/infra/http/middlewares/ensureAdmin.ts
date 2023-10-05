import { UsersRepository } from './../../../../modules/accounts/repositories/Users/UsersRepository'
import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../../errors/AppError'

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { _id: idUser } = req.user

  const usersRepository = new UsersRepository()

  const user = await usersRepository.findById(idUser)

  if (!user.isAdmin)
    throw new AppError('Usuário não tem permissão de administrador')

  return next()
}
