import { container } from 'tsyringe'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'
import { Request, Response } from 'express'

export class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
    const categories = await listCategoriesUseCase.execute()

    return res.status(201).json({
      success: true,
      title: 'Busca de categorias concluída com sucesso',
      items: categories,
    })
  }
}
