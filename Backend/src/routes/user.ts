import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@harshopes/medium-blog-zod";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET: string
    }
}>();

//SIGNIN SIGNUP
userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text("Invalid Inputs")
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })
        const jwt = await sign({
            id: user.id
        }, c.env.SECRET)
        return c.text(jwt);

    } catch (err) {
        return c.text(`error occured ${err}`);
    }

})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text("Invalid Inputs")
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password,
            }
        })
        if (!user) {
            c.status(403)
            return c.text("Invalid Credentials")
        }
        const jwt = await sign({
            id: user.id,
        }, c.env.SECRET)
        return c.text(jwt);
    } catch (err) {
        return c.text(`error ${err}`)
    }
})