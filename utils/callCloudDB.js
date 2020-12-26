const token = require('../utils/updateAccessToken')
const axios = require('axios')

//POST https://api.weixin.qq.com/tcb/databaseupdate?access_token=ACCESS_TOKEN

const callCloudDB = async (ctx,fnName,query) => {
    const ACCESS_TOKEN = await token()
    const url = `https://api.weixin.qq.com/tcb/${fnName}?access_token=${ACCESS_TOKEN}`
    return axios.post(url, {
        env: ctx.state.env,
        query
    }).then((res) => {
        return res
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = callCloudDB