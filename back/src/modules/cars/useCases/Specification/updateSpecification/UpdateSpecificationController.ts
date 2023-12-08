import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateSpecificationUseCase } from './UpdateSpecificationUseCase'

export class UpdateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { specificationId } = req.params
    const { name, description } = req.body

    const updateSpecificationUseCase = container.resolve(
      UpdateSpecificationUseCase,
    )

    await updateSpecificationUseCase.execute({
      specificationId,
      name,
      description,
    })

    return res.status(201).json({
      success: true,
      message: 'Informações da especificação atualizadas com sucesso',
    })
  }
}
