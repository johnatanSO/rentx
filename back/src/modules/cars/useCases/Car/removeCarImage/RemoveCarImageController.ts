import { Request, Response } from 'express'

export class RemoveCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId, imageId } = req.params

    console.log('carId', carId)
    console.log('imageId', imageId)

    return res.status(201).json({
      success: true,
      message: 'Imagem removida com sucesso',
    })
  }
}
