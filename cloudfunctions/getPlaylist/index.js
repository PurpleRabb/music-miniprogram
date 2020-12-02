// 云函数入口文件
const cloud = require('wx-server-sdk')
//const rq = require("request-promise");
const axios = require("axios");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();

const MYID = "301E40C13D675B8C";
const URL = `https://apis.imooc.com/personalized?icode=${MYID}`
const playListColletion = db.collection('playlist');
const MAX_LIMIT = 30
// 云函数入口函数
exports.main = async (event, context) => {
  //const _res = await axios.get(URL);
  //const playlist = _res.data.result;
  //const curList = await playListColletion.get(); //最多获取100条数据
  //分批读取
  const resLength = await playListColletion.count();
  const total = resLength.total;
  const batchTime = Math.ceil(total/MAX_LIMIT) //向上取整
  const task = []
  for (let i = 0; i<batchTime; i++) {
    var _promise = playListColletion.skip(i*MAX_LIMIT).limit(MAX_LIMIT).get();
    console.log(`准备第${i}次取`)
    task.push(_promise);
  }

  let curList = {
    data:[]
  }
  if (task.length > 0) {
    curList = (await Promise.all(task)).reduce((acc,cur) => {
      return  { 
        data: acc.data.concat(cur.data)
      }
    })
  }

  const { data } = await axios.get(URL); // 相当于_res.data

  if (data.code >= 1000) {
    //console.log(data.msg);
    return 0;
  }
  const playlist = data.result;
  var newList = [];
  //去重操作
  for (let i = 0; i < playlist.length; i++) {
    //console.log("playlist[i].id=" + playlist[i].id);
    let flag = true;
    for (let j = 0; j < curList.data.length; j++) {
      //console.log("curList[j].id" + curList.data[j].id);
      if (playlist[i].id === curList.data[j].id) {
        flag = false;
        console.log("去重");
        break;
      }
    }
    if (flag) {
      newList.push(playlist[i]);
    }
  }

  if (newList.length > 0) {
    for (let i = 0; i < newList.length; i++) {
      newList[i].createTime = db.serverDate();
    }
    await playListColletion.add({
      data: [...newList] //利用扩展运算符一次性插入
    }).then((res) => {
      console.log("插入成功")
    }).catch((err) => {
      console.log("插入失败");
    })
  }
  //console.log(playlist);
  return newList.length;
}