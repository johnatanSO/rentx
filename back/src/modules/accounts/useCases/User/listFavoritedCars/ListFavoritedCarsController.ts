import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListFavoritedCarsUseCase } from './ListFavoritedCarsUseCase'

export class ListFavoritedCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { _id: userId } = req.user

    const listFavoritedCarsUseCase = container.resolve(ListFavoritedCarsUseCase)
    const favoritedCars = await listFavoritedCarsUseCase.execute(userId)

    return res.status(200).json({
      success: true,
      message: 'Busca de carros favoritos realizada com sucesso',
      items: favoritedCars,
    })
  }
}
