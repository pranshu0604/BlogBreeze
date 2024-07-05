import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupinput, signininput } from "@notoriouspran/medium-clone-common";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

router.post('/signup', async (c) => {


  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())


  const body = await c.req.json()
  const { success } = signupinput.safeParse(body)

  if (!success) {
    c.status(411)
    return c.json('Wrong Input Body')
  }

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })
  if (userWithEmail) {
    c.status(403);
    return c.json({error:'email403'});
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      firstname: body.firstname,
      lastname: body.lastname
    }
  })

  if (!user) {
    c.status(500)
    return c.text('Something went wrong')
  }

  const token = await sign({
    id: user.id
  }, c.env.JWT_SECRET)

  return c.json({ token })
})


router.post('/signin', async (c) => {

  const { success } = signininput.safeParse(await c.req.json())

  if (!success) {
    c.status(411)
    return c.json({ message: 'Wrong Input Body' })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    }
  });

  if (!user) {
    c.status(403);
    return c.json({error:'email404'});
  }

  if (user.password !== body.password) {
    c.status(403);
    return c.json({error:'pass404'});
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ token, fname: user.firstname });
});

export default router;