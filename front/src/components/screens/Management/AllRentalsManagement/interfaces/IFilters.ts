import { z } from 'zod'

export const filterRentalsSchema = z.object({
  filterStartDate: z.string().nullable(),
  filterEndDate: z.string().nullable(),
  userId: z.string().nullable(),
  carId: z.string().nullable(),
})

export type IFilters = z.infer<typeof filterRentalsSchema>
