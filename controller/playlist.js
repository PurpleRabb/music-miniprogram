const Router = require('koa-router')
const token = require('../utils/updateAccessToken')
const axios = require('axios')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')

const ENV = 'testmusic-0g88uqm543c59cbe'


router.get('/list',async (ctx, next) => {
    const query = ctx.request.query
    const res = await callCloudFn(ctx,"music",{
        $url: 'playlist',
        start: parseInt(query.start),
        count: parseInt(query.count)
    })
    //console.log(res.data)
    ctx.body = {
        data: res.data,
        code: 20000
    }
})

module.exports = router