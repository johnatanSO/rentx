import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteSpecificationUseCase } from './DeleteSpecificationUseCase'

export class DeleteSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { specificationId } = req.params

    const deleteSpecificationUseCase = container.resolve(
      DeleteSpecificationUseCase,
    )

    await deleteSpecificationUseCase.execute(specificationId)

    return res.status(200).json({
      success: true,
      message: 'Especificação deletada com sucesso',
    })
  }
}
