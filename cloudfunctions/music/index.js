// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router');
const TcbRouter = require('tcb-router');
const axios = require("axios");

cloud.init()
const db = cloud.database();

 const BASE_URL = 'https://apis.imooc.com';
 const MYID = "icode=301E40C13D675B8C";
// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event});
  app.router('playlist',async(ctx, next) => {
    ctx.body =  await db.collection('playlist').skip(event.start)
                .limit(event.count).orderBy('createTime','desc').get().then((res)=>{
                    return res;
                })
  });

  app.router('getmusiclist',async(ctx,next) => {
    const res = await axios.get(`${BASE_URL}/playlist/detail?id=${parseInt(event.playlistId)}&${MYID}`);
    ctx.body = res.data;
  });

  app.router('getmusicUrl',async(ctx,next) => {
    const res = await axios.get(`${BASE_URL}/song/url?id=${event.musicId}&${MYID}`);
    ctx.body = res.data;
  });

  app.router('getLyric',async(ctx,next) => {
    const res = await axios.get(`${BASE_URL}/lyric?id=${event.musicId}&${MYID}`);
    ctx.body = res.data;
  });

  return app.serve();
}