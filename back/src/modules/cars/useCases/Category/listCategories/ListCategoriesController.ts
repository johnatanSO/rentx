import { ListCategoriesUseCase } from './ListCategoriesUseCase'
import { Request, Response } from 'express'

export class ListCategoriesController {
  listCategoriesUseCase: ListCategoriesUseCase
  constructor(listCategoriesUseCase: ListCategoriesUseCase) {
    this.listCategoriesUseCase = listCategoriesUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await this.listCategoriesUseCase.execute()
      return res.status(201).json({
        success: true,
        title: 'Listagem concluída com sucesso',
        items: categories,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        title: 'Erro ao buscar categorias',
        message: error.message,
      })
    }
  }
}
