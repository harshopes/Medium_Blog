import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { blogInput, updateBlogInput } from "@harshopes/medium-blog-zod";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.SECRET);

        if (user) {
            c.set("userId", String(user.id));
            await next();
        } else {
            c.status(403);
            return c.text("You are Not logged in")
        }
    } catch (error) {
        c.status(403);
        return c.text("You are Not logged in")
    }
});

//put it before /:id since in /bulk itll take "bulk" as id
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({
            blogs
        })
    } catch (err) {
        c.status(411)
        c.text(`error:- ${err}`)
    }
})

// Get blog based on id
blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: parseInt(id)
            }, select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    } catch (err) {
        c.status(411)
        c.text(`error:- ${err}`)
    }
})


// post a blog
blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = blogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text("Invalid Blog inputs")
    }
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: parseInt(authorId)
            }
        })
        return c.json({
            id: blog.id,
        });
    } catch (err) {
        console.error("Error creating blog post:", err); // Log error for debugging
        // @ts-ignore
        return c.text(`Error: ${err.message}`);
    }
})
// update a blog
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text("Invalid Inputs")
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.json(blog);
    } catch (err) {
        return c.text(`error ${err}`)
    }
})
