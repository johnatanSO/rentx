import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../../errors/AppError'
import { TypeormUsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/TypeormUsersRepository'

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { _id: idUser } = req.user

  const usersRepository = new TypeormUsersRepository()

  const user = await usersRepository.findById(idUser)

  if (!user.isAdmin)
    throw new AppError('Usuário não tem permissão de administrador')

  return next()
}
