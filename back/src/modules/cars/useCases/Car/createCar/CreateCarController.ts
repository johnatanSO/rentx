import { CreateCarUseCase } from './CreateCarUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      transmission,
    } = req.body

    const defaultImage = req.file

    const createCarUserCase = container.resolve(CreateCarUseCase)
    const newCar = await createCarUserCase.execute({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      transmission,
      defaultImage,
    })

    return res.status(201).json({
      success: true,
      item: newCar,
      message: 'Novo carro cadastrado com sucesso',
    })
  }
}
