import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateDefaultCarImageUseCase } from './UpdateDefaultCarImageUseCase'

export class UpdateDefaultCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params

    const defaultImage = req.file

    const updateDefaultCarImageUseCase = container.resolve(
      UpdateDefaultCarImageUseCase,
    )

    await updateDefaultCarImageUseCase.execute({ carId, defaultImage })

    return res.status(201).json({
      success: true,
      message: 'Imagem do carro atualizada com sucesso',
    })
  }
}
