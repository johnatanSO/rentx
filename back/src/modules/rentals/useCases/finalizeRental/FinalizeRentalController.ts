import { Request, Response } from 'express'

export class FinalizeRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { rentalId } = req.params

    return res.status(200).json({
      success: true,
      message: 'Aluguel finalizado com sucesso',
    })
  }
}
