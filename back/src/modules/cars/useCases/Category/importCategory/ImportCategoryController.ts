import { Request, Response } from 'express'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'
import { container } from 'tsyringe'

export class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
    const categories = await importCategoryUseCase.execute(file)

    return res.status(201).json({
      success: true,
      title: 'Categorias importadas com sucesso.',
      items: categories,
    })
  }
}
