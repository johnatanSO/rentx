import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase'

interface IFiles {
  filename: string
}

export class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params
    const images = req.files as IFiles[]
    const imagesName = images.map((image) => image.filename)

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)

    await uploadCarImagesUseCase.execute({ carId, imagesName })

    return res.status(201).json({
      success: true,
      message: 'Imagens do carro atualizadas com sucesso',
    })
  }
}
