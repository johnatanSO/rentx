import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FinalizeRentalUseCase } from './FinalizeRentalUseCase'

export class FinalizeRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { rentalId } = req.params
    console.log('rentalId', rentalId)

    const finalizeRentalUseCase = container.resolve(FinalizeRentalUseCase)
    await finalizeRentalUseCase.execute(rentalId)

    return res.status(200).json({
      success: true,
      message: 'Aluguel finalizado com sucesso',
    })
  }
}
