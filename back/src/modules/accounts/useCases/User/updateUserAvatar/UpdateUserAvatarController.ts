import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'
import { container } from 'tsyringe'
import { Request, Response } from 'express'

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const avatarImage = req.file

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
    const updatedUser = await updateUserAvatarUseCase.execute({
      userId: req.user._id,
      avatarImage,
    })

    return res.status(200).json({
      success: true,
      message: 'Avatar atualizado com sucesso',
      user: updatedUser,
    })
  }
}
