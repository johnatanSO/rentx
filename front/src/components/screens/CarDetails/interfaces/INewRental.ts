import { z } from 'zod'

export const newRentalSchema = z.object({
  expectedReturnDate: z.string().min(1, 'Data de retorno não informada'),
})

export type INewRental = z.infer<typeof newRentalSchema>
