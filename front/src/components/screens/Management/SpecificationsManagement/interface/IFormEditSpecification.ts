import { z } from 'zod'

export const formEditSpecificationSchema = z.object({
  name: z.string().min(1, 'Nome não informado'),
  description: z.string(),
  _id: z.string(),
})

export type IFormEditSpecification = z.infer<typeof formEditSpecificationSchema>
