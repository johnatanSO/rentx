import { z } from 'zod'

export const rentalEditSchema = z.object({
  car: z.string().min(1, 'Nenhum carro selecionado'),
  user: z.string().min(1, 'Nenhum usuário selecionado'),
  startDate: z.string(),
  expectedReturnDate: z.string(),
  _id: z.string().optional(),
})

export type IRentalEdit = z.infer<typeof rentalEditSchema>
