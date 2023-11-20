import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase'

export class DeleteCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params

    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase)
    await deleteCategoryUseCase.execute(categoryId)

    return res.status(200).json({
      success: true,
      message: 'Categoria deletada com sucesso',
    })
  }
}
