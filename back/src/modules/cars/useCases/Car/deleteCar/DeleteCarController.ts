import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCarUseCase } from './DeleteCarUseCase'

export class DeleteCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params

    const deleteCarUseCase = container.resolve(DeleteCarUseCase)
    await deleteCarUseCase.execute(carId)

    return res.status(200).json({
      success: true,
      message: 'Carro deletado com sucesso',
    })
  }
}
