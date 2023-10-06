import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

export class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body
    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase,
    )
    const newSpecification = await createSpecificationUseCase.execute({
      name,
      description,
    })

    return res.status(201).json({
      success: true,
      title: 'Especificação cadastrada com sucesso',
      item: newSpecification,
    })
  }
}
