import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllCarsUseCase } from './ListAllCarsUseCase'

export class ListAllCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAllCarsUseCase = container.resolve(ListAllCarsUseCase)
    const allCars = await listAllCarsUseCase.execute()

    return res.status(200).json({
      success: true,
      title: 'Busca de carros feita com sucesso',
      items: allCars,
    })
  }
}
