import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RemoveCarImageUseCase } from './RemoveCarImageUseCase'

export class RemoveCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId, imageId } = req.params

    const removeCarImageUseCase = container.resolve(RemoveCarImageUseCase)
    await removeCarImageUseCase.execute({
      carId,
      imageId,
    })

    return res.status(201).json({
      success: true,
      message: 'Imagem removida com sucesso',
    })
  }
}
