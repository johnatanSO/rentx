import { Request, Response } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { container } from 'tsyringe'

export class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body
    try {
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
      const createdCategory = await createCategoryUseCase.execute({
        name,
        description,
      })

      return res.status(201).json({ createdCategory })
    } catch (error) {
      return res.status(400).json({
        success: false,
        title: 'Erro ao tentar criar categoria',
        message: error.message,
      })
    }
  }
}
