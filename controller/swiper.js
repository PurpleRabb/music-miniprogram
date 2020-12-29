const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB')
const callCloudStorage = require('../utils/callCloudStorage')
const { redirect } = require('./playlist')

router.get('/list', async (ctx, next) => {
    const query = `db.collection('swiper').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    //console.log(res.data.data)
    filelist = []

    for (let i = 0; i < res.data.data.length; i++) {
        const _list = {
            fileid: JSON.parse(res.data.data[i]).fileID,
            max_age: 7200
        }
        filelist.push(_list)
    }
    const dlRes = await callCloudStorage.download(ctx, filelist)
    console.log(dlRes)
    let result = []
    for (let i = 0; i < dlRes.file_list.length; i++) {
        result.push({
            download_url: dlRes.file_list[i].download_url,
            fileid: dlRes.file_list[i].fileid,
            _id: JSON.parse(res.data.data[i])._id
        })
    }

    ctx.body = {
        code: 20000,
        data: result
    }
})

router.post('/upload',async (ctx, next) => {
    const fileid = await callCloudStorage.upload(ctx)
    console.log(fileid)
    const query = `
        db.collection('swiper').add({
            data: {
                fileID: '${fileid}'
            }
        })
    `
   const res = await callCloudDB(ctx, 'databaseadd', query)
   ctx.body = {
       code: 20000,
       id_list: res.data.id_list
   }
})

module.exports = router