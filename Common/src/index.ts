import z, { number } from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(6)
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const blogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})


export type SignupType = z.infer<typeof signupInput>;
export type SigninType = z.infer<typeof signinInput>;
export type BlogType = z.infer<typeof blogInput>;
export type UpdateBlogType = z.infer<typeof updateBlogInput>;
