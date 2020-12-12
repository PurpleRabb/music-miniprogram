// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event})
  app.router('getBlog',async(ctx, next) => {
    const keyword = event.keyword
    let w = {}
    if (keyword.trim() != "") {  //模糊搜索
      w = {
        content: new db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      }
    }
    ctx.body = await db.collection('blog').where(w).skip(event.start)
                  .limit(event.count).orderBy('createTime','desc').get()
                  .then((res)=> {
                    return res.data
                  })
  })
  return app.serve()
}