import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateRentalUseCase } from './UpdateRentalUseCase'

export class UpdateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { rentalId } = req.params
    const { car, user, startDate, expectedReturnDate } = req.body

    const updateRentalUseCase = container.resolve(UpdateRentalUseCase)
    await updateRentalUseCase.execute({
      rentalId,
      car,
      user,
      startDate,
      expectedReturnDate,
    })

    return res.status(201).json({
      success: true,
      message: 'Aluguel atualzado com sucesso',
    })
  }
}
