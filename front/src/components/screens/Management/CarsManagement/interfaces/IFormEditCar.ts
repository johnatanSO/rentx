import { z } from 'zod'

export const formEditCarSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, 'Nome do carro não informado'),
  description: z.string(),
  dailyRate: z.number().min(1, 'Valor da diária não informado'),
  avaliable: z.boolean(),
  licensePlate: z.string().min(1, 'Placa não informada'),
  fineAmount: z.number(),
  brand: z.string(),
  categoryId: z.string().min(1, 'Categoria não informada'),
  reasonUnavaliable: z.string().optional(),
  transmission: z.string(),
})

export type IFormEditCar = z.infer<typeof formEditCarSchema>
