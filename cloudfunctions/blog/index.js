// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init()
const db = cloud.database()

const blogCollection = db.collection('blog')
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })
  app.router('getBlog', async (ctx, next) => {
    const keyword = event.keyword
    let w = {}
    if (keyword.trim() != "") { //模糊搜索
      w = {
        content: new db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      }
    }
    ctx.body = await db.collection('blog').where(w).skip(event.start)
      .limit(event.count).orderBy('createTime', 'desc').get()
      .then((res) => {
        return res.data
      })
  })

  app.router('detail', async (ctx, next) => {
    let blogId = event.blogId
    let detail = await blogCollection.where({
      _id: blogId
    }).get().then((res)=> {
      return res.data
    })

    //获取评论数量
    const countResult = await blogCollection.count()
    const total = countResult.total
    let commentList = {
      data: []
    }
    if (total > 0) {
      const batchTimes = Math.ceil(total/MAX_LIMIT)
      const task = []
      for (let i = 0; i< batchTimes; i++) {
        let promise = db.collection('blog-comment').skip(i * MAX_LIMIT).limit(MAX_LIMIT)
          .where({
            blogId
          }).orderBy('createTime','desc').get()
          task.push(promise)
      }
      if (task.length > 0) {
        commentList = (await Promise.all(task)).reduce((acc, cur) => {
          return {
            data: acc.data.concat(cur.data)
          }
        })
      }
    }
    ctx.body = {
      commentList,
      detail
    }
  })
  return app.serve()
}