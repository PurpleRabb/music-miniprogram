const Koa = require('koa')
const app = new Koa()
const Rounter = require('koa-router')
const router = new Rounter()
const cors = require('koa2-cors')
const ENV = 'testmusic-0g88uqm543c59cbe'

const playlist = require('./controller/playlist')


router.use('/playlist', playlist.routes())

app.use(cors({
    origin: ['http://localhost:9528'],
    credentials: true
}))

app.use(async (ctx,next) => {
    //ctx.body = "Hello World!"
    ctx.state.env = ENV
    await next()
})

app.use(router.routes())
app.use(router.allowedMethods)

app.listen(3200, () => {
    console.log("listen on 3200")
})

