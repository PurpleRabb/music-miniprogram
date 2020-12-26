const token = require('../utils/updateAccessToken')
const axios = require('axios')


const callCloudFn = async (ctx, fnName, params) => {
    //ctx.body = "nihao"
    const ACCESS_TOKEN = await token()
    const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${ACCESS_TOKEN}&env=${ctx.state.env}&name=${fnName}`
    return await axios.post(url, {
        ...params
    }).then( (res) => {
        //console.log(res.data.resp_data)
        return ctx.body = {
            data: JSON.parse(res.data.resp_data).data,
            code: 20000
        }
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = callCloudFn