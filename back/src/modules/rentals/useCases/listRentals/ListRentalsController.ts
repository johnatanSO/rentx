import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListRentalsUseCase } from './ListRentalsUseCase'

export class ListRentalsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { _id: userId } = req.user

    const listRentalsUseCase = container.resolve(ListRentalsUseCase)
    const rentals = await listRentalsUseCase.execute(userId)

    return res.status(200).json({
      success: true,
      title: 'Busca de alugueis feita com sucesso',
      items: rentals,
    })
  }
}
