import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FavoriteCarUseCase } from './FavoriteCarUseCase'

export class FavoriteCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params
    const { _id: userId } = req.user

    const favoriteCarUseCase = container.resolve(FavoriteCarUseCase)

    const updatedUser = await favoriteCarUseCase.execute({ carId, userId })

    return res.status(201).json({
      success: true,
      message: 'Sucesso',
      user: updatedUser,
    })
  }
}
