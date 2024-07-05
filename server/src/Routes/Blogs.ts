import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { postinput } from "@notoriouspran/medium-clone-common";

const router = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userID: string
    }
}>()

router.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.split(' ')?.[1]
    try{const user = token && await verify(token, c.env.JWT_SECRET)
    
    if (user && typeof user.id === 'string') {
        c.set('userID', user.id)
        await next()
    } else {
        c.status(403);
        return c.json({ message: 'You are not logged in' })
    }}catch(e){
        c.status(411);
        return c.json({ message: 'Error Authenticating, Length Required' })
    }
})

// routes:

router.post('/', async (c) => {
    const body = await c.req.json()
    const {success} = postinput.safeParse(body)

    if (!success) {
        c.status(411)
        return c.json({message:'Wrong Input Body'})
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const blog = await prisma.post.create({
        data: {
            title: body.title,
            description: body.description,
            authorId: c.get('userID')
        }
    })

    return c.json({
        id: blog.id
    })
})

router.get('/single/:id', async (c) => {

    const id = c.req.param('id')
    if (!id) {
        c.status(411)
        return c.text('id is required')
    }

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const blog = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                author: {
                    select: {
                        firstname: true,
                        lastname: true,
                    },
                },
            },
        })
        return c.json(blog)
    } catch (err) {
        c.status(500)
        return c.text('Something went wrong')
    }
})

router.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    firstname: true,
                    lastname: true,
                },
            },
        },
    })

    return c.json(blogs);

})


export default router