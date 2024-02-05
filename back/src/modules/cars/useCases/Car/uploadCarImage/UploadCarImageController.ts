import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadCarImageUseCase } from './UploadCarImageUseCase'

export class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params

    const image = req.file.filename

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)

    await uploadCarImageUseCase.execute({ carId, image })

    return res.status(201).json({
      success: true,
      message: 'Imagens do carro atualizadas com sucesso',
    })
  }
}
