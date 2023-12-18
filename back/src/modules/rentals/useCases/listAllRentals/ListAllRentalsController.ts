import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllRentalsUseCase } from './ListAllRentalsUseCase'

export class ListAllRentalsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { filterStartDate, filterEndDate, userId, carId } = req.query as any

    const listAllRentalsUseCase = container.resolve(ListAllRentalsUseCase)
    const rentals = await listAllRentalsUseCase.execute({
      filterStartDate,
      filterEndDate,
      userId,
      carId,
    })

    return res.status(200).json({
      success: true,
      title: 'Busca de alugueis feita com sucesso',
      items: rentals,
    })
  }
}
