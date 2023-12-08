import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCategoryUseCase } from './UpdateCategoryUseCase'

export class UpdateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params
    const { name, description } = req.body

    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase)
    await updateCategoryUseCase.execute({
      categoryId,
      name,
      description,
    })

    return res.status(201).json({
      success: true,
      message: 'Informações da categoria atualizadas com sucesso',
    })
  }
}
