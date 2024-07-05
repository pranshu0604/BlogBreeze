import z from 'zod'


export const signupinput = z.object({
    email: z.string()
    .refine((val) => val !== '', { message: 'Please enter an email address.' })
    .refine((val) => val === '' || (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)), { message: 'Please enter a valid email address.' }),
    password: z.string()
    .refine(value => value !== '', { message: 'Please enter a password.' })
    .refine(value => (value === '' || value.length>= 6), { message: 'Password must be at least 6 characters long.' }),
    firstname: z.string().refine(value => value !== '', { message: 'First name is required.' }),
    lastname: z.string().optional(),
})


export const signininput = z.object({
    email: z.string()
    .refine((val) => val !== '', { message: 'Please enter an email address.' })
    .refine((val) => val === '' || (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)), { message: 'Please enter a valid email address.' }),
    password: z.string()
    .refine(value => value !== '', { message: 'Please enter a password.' })
    .refine(value => (value === '' || value.length>= 6), { message: 'Password must be at least 6 characters long.' })
})


export const postinput = z.object({
    title: z.string()
    .refine(value => value !== '', { message: 'Title is required.' }),
    description: z.string()
    .refine(value => value !== '', { message: 'Description is required.' })
})

export type Signupinput = z.infer<typeof signupinput>
export type Signininput = z.infer<typeof signininput>
export type Postinput = z.infer<typeof postinput>