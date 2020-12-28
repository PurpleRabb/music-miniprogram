const token = require('../utils/updateAccessToken')
const axios = require('axios')


const cloudStorage = {
    async download(ctx, filelist) {
        const ACCESS_TOKEN = await token()
        const url = `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${ACCESS_TOKEN}`
        return await axios.post(url,{
            env: ctx.state.env,
            file_list: filelist
        }).then((res) => {
            return res.data
        })
    }
}

module.exports = cloudStorage