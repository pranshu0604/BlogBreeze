import { Hono } from 'hono'
import { cors } from 'hono/cors';
import userRouter from './Routes/User'
import blogRouter from './Routes/Blogs'


const app = new Hono()
app.use('*', cors());

app.route("/api/v1/user/", userRouter)
app.route("/api/v1/blog/", blogRouter)

export default app