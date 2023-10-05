import { Request, Response } from 'express'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

export class ImportCategoryController {
  importCategoryUseCase: ImportCategoryUseCase
  constructor(importCategoryUseCase: ImportCategoryUseCase) {
    this.importCategoryUseCase = importCategoryUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { file } = req
      const categories = await this.importCategoryUseCase.execute(file)

      return res.status(201).json({
        success: true,
        title: 'Categorias importadas com sucesso.',
        items: categories,
      })
    } catch (err) {
      return res.status(400).json({
        success: false,
        title: 'Erro ao tentar importar categorias.',
        message: err.message,
        error: err,
      })
    }
  }
}
