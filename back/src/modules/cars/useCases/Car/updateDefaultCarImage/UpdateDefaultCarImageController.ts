import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateDefaultCarImageUseCase } from './UpdateDefaultCarImageUseCase'

interface IFile {
  filename: string
}

export class UpdateDefaultCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params
    const image = req.file as IFile
    const imageName = image.filename

    const updateDefaultCarImageUseCase = container.resolve(
      UpdateDefaultCarImageUseCase,
    )

    await updateDefaultCarImageUseCase.execute({ carId, imageName })

    return res.status(201).json({
      success: true,
      message: 'Imagem do carro atualizada com sucesso',
    })
  }
}
