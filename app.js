const Koa = require('koa')
const app = new Koa()
const Rounter = require('koa-router')
const router = new Rounter()

const playlist = require('./controller/playlist')

router.use('/playlist', playlist.routes())

app.use(router.routes())
app.use(router.allowedMethods)

app.use(async (ctx) => {
    ctx.body = "Hello World!"
})

app.listen(3200)

