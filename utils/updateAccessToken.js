const axios = require('axios')
const { create } = require('domain')
const fs = require('fs')
const path = require('path')

const filename = path.resolve(__dirname,'./access_token.json')

const APPID = 'wxf7bfeca6485814f1'
const APPSECRET = 'da251f782f867fccfda6188326e92429'

const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

const updateAccessToken = async () => {
    await axios.get(url).then((res) => {
        if (res.data.access_token) {
            fs.writeFileSync(filename,JSON.stringify({
                access_token: res.data.access_token,
                createTime: new Date()
            }))
        } else {
            updateAccessToken()
        }
    })
}

const getAccessToken = async () => {
    try {
        const res = fs.readFileSync(filename,'utf-8')
        const resObj = JSON.parse(res)
        console.log(resObj)
        const createTime = new Date(resObj.createTime).getTime()
        const now = new Date().getTime()
        if ((now - createTime) / 1000 / 60 / 60 >= 2) {
            //服务器如果发生宕机，第一次启动后，先读取时间看看token是不是过时了
            await updateAccessToken()
            await getAccessToken()
        }
        return resObj.access_token
    } catch(err) {
        await updateAccessToken()
        await getAccessToken()
    }
}

setInterval(async ()=> {
    await updateAccessToken()
}, (7200 - 300) * 1000)  //提前五分钟获取一次

module.exports = getAccessToken