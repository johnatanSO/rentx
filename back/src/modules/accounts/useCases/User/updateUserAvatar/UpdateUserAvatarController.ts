import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'
import { container } from 'tsyringe'
import { Request, Response } from 'express'

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const avatarFile = req.file.filename
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
    await updateUserAvatarUseCase.execute({ userId: req.user._id, avatarFile })

    return res.status(200).json({
      success: true,
      message: 'Avatar atualizado com sucesso',
    })
  }
}
