// 云函数入口文件
const cloud = require('wx-server-sdk')
//const rq = require("request-promise");
const axios = require("axios");
cloud.init()

const db = cloud.database();

const MYID = "301E40C13D675B8C";
const URL = `https://apis.imooc.com/personalized?icode=${MYID}`
// 云函数入口函数
exports.main = async (event, context) => {
  //const _res = await axios.get(URL);
  //const playlist = _res.data.result;
  const { data } = await axios.get(URL); // 相当于_res.data
  if (data.code >= 1000) {
    console.log(data.msg);
    return 0;
  }
  const playlist = data.result;

  if (playlist.length > 0) {
    for (let i = 0; i < playlist.length; i++) {
      playlist[i].createTime = db.serverDate();
    }
    await db.collection("playlist").add({
      data: [...playlist] //利用扩展运算符一次性插入
    }).then((res) => {
      console.log("插入成功")
    }).catch((err) => {
      console.log("插入失败");
    })
  }
  console.log(playlist);

}