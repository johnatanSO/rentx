import { z } from 'zod'

export const newSpecificationSchema = z.object({
  name: z.string().min(1, 'Nome não informado'),
  description: z.string(),
})

export type INewSpecification = z.infer<typeof newSpecificationSchema>
