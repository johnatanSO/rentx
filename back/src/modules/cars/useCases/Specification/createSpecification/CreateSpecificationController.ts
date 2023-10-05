import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

export class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
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
    } catch (err) {
      return res.status(401).json({
        success: false,
        title: 'Erro ao tentar cadastrar nova especificação',
        message: err.message,
      })
    }
  }
}
