const Router = require('koa-router')
const token = require('../utils/updateAccessToken')
const axios = require('axios')
const router = new Router()
const ENV = 'testmusic-0g88uqm543c59cbe'


router.get('/list',async (ctx, next) => {
    //ctx.body = "nihao"
    const ACCESS_TOKEN = await token()
    const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${ACCESS_TOKEN}&env=${ENV}&name=music`

    await axios.post(url, {
        $url: 'playlist',
        start: 0,
        count: 50
    }).then( (res) => {
        console.log(res.data.resp_data)
        ctx.body = JSON.parse(res.data.resp_data).data
    })
})

module.exports = router