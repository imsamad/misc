import z from 'zod'

export const authSchema = z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(4, { message: 'Password is too short' })
})