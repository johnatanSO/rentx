import { CreateCarUseCase } from './CreateCarUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

interface IFiles {
  filename: string
}

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

    const images = req.files as IFiles[]
    const imageName = images[0].filename

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
      imageName,
    })

    return res.status(201).json({
      success: true,
      item: newCar,
      message: 'Novo carro cadastrado com sucesso',
    })
  }
}
