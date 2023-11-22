import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCarInfosUseCase } from './UpdateCarInfosUseCase'

export class UpdateCarInfosController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params
    const {
      name,
      description,
      dailyRate,
      avaliable,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    } = req.body

    const updateCarInfosUseCase = container.resolve(UpdateCarInfosUseCase)
    await updateCarInfosUseCase.execute({
      carId,
      name,
      description,
      dailyRate,
      avaliable,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    })

    return res.status(201).json({
      success: true,
      message: 'Informações do carro atualizadas com sucesso',
    })
  }
}
