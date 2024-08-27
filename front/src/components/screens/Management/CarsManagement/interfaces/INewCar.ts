import { z } from 'zod'

export const newCarSchema = z.object({
  name: z.string().min(1, 'Nome do carro não informado'),
  description: z.string(),
  dailyRate: z.number().min(1, 'Valor da diária não informado'),
  licensePlate: z.string().min(1, 'Placa do carro não informada'),
  fineAmount: z.number(),
  brand: z.string(),
  categoryId: z.string().min(1, 'Categoria do carro não informada'),
  transmission: z.string(),
})

export type INewCar = z.infer<typeof newCarSchema>
