import z from 'zod'

export const userSchema = z.object({
    email: z.string().email().trim().toLowerCase().optional(),
    password: z.string().min(4).optional(),
    googleSubject: z.string().optional(),
    googleJwt: z.string().optional()
})