import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserInfosUseCase } from './UpdateUserInfosUseCase'

export class UpdateUserInfosController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, isAdmin } = req.body
    const { _id: userId } = req.user

    const updateUserInfosUseCase = container.resolve(UpdateUserInfosUseCase)
    const updatedUser = await updateUserInfosUseCase.execute({
      name,
      email,
      isAdmin,
      userId,
    })

    return res.status(201).json({
      success: true,
      message: 'Informações do usuário atualizadas com sucesso',
      user: updatedUser,
    })
  }
}
