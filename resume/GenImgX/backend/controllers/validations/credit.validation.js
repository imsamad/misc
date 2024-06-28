import z from 'zod'

export const creditSchema = z.object({
    credit: z.number().int().positive()
})