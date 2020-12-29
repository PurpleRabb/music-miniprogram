const token = require('../utils/updateAccessToken')
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data');
const rp = require('request-promise')


const cloudStorage = {
    async download(ctx, filelist) {
        const ACCESS_TOKEN = await token()
        const url = `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${ACCESS_TOKEN}`
        return await axios.post(url, {
            env: ctx.state.env,
            file_list: filelist
        }).then((res) => {
            return res.data
        })
    },

    async upload(ctx) {
        // 这里用axios有问题，改为request方式
        // 1、请求地址
        const ACCESS_TOKEN = await token()
        const file = ctx.request.files.file
        const path = `swiper/${Date.now()}-${Math.random()}-${file.name}`
        const options = {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/uploadfile?access_token=${ACCESS_TOKEN}`,
            body: {
                path,
                env: ctx.state.env,
            },
            json: true // Automatically stringifies the body to JSON
        };
        //  请求参数的
        const info = await rp(options)
            .then(function (res) {
                return res
            })
            .catch(function (err) {
            })
        //console.log(info)

        const params = {
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data'
            },
            uri: info.url,
            formData: {
                key: path,
                Signature: info.authorization,
                'x-cos-security-token': info.token,
                'x-cos-meta-fileid': info.cos_file_id,
                file: fs.createReadStream(file.path)
            },
            json: true
        }
        await rp(params)
        //console.log(info.file_id)
        return info.file_id

        let param = new FormData(); // 创建form对象
        let config = {
            headers: { "Content-Type": "multipart/form-data" }
        };
        param.append('key', path)
        param.append('Signature', info.authorization)
        param.append('x-cos-security-token', info.token)
        param.append('x-cos-meta-fileid', info.cos_file_id)
        param.append('file', fs.createReadStream(file.path))

        //console.log(info.url)
        await axios.post(info.url, param, config).then((res) => {
            console.log(res)
        })

    }
}

module.exports = cloudStorage