const Koa = require('koa')
const app = new Koa()
const Rounter = require('koa-router')
const koabody = require('koa-body')
const router = new Rounter()
const cors = require('koa2-cors')
const ENV = 'testmusic-0g88uqm543c59cbe'

const playlist = require('./controller/playlist')
const swiper = require('./controller/swiper')


router.use('/playlist', playlist.routes())
router.use('/swiper',swiper.routes())

app.use(koabody({
    multipart: true
}))

app.use(cors({
    origin: ['http://localhost:9528'],
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
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

