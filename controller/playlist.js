const Router = require('koa-router')
const token = require('../utils/updateAccessToken')
const axios = require('axios')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB')

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

router.get('/getById',async (ctx,next) => {
    console.log(ctx.request.query.id)
    if (ctx.request.query.id) {
        const query = `db.collection('playlist').doc('${ctx.request.query.id}').get()`
        const res = await callCloudDB(ctx,"databasequery",query)
        //console.log(res.data.data)
        ctx.body = {
            code: 20000,
            data: JSON.parse((res.data.data)[0])
        }
    }
})

router.post('/updatePlaylist', async (ctx,next) => {
    //console.log(ctx.request.body)
    const params = ctx.request.body
    const query = `db.collection('playlist').doc('${params._id}').update({
        data: {
            name: '${params.name}',
            copywriter: '${params.copywriter}'
        }
    })`
    const res = await callCloudDB(ctx,"databaseupdate",query)
    //console.log(res.data.data)
    console.log(res.data)
    ctx.body = {
        code: 20000,
        data: res.data
    }
})

module.exports = router