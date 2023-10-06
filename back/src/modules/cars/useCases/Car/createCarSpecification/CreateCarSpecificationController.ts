import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params
    const { specificationsIds } = req.body

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    )

    await createCarSpecificationUseCase.execute({
      carId,
      specificationsIds,
    })

    return res.status(201).json({
      success: true,
      title: 'Especificação registrada com sucesso',
    })
  }
}
