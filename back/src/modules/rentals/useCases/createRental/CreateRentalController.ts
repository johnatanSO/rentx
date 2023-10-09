import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRentalUseCase } from './CreateRentalUseCase'

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId, expectedReturnDate } = req.body
    const { _id: userId } = req.user

    const createRentalUseCase = container.resolve(CreateRentalUseCase)
    const newRental = await createRentalUseCase.execute({
      userId,
      carId,
      expectedReturnDate,
    })

    return res.status(201).json({
      success: true,
      message: 'Aluguel cadastrado com sucesso',
      item: newRental,
    })
  }
}
