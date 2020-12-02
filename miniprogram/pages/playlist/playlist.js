// pages/playlist/playlist.js
const  MAX_LIMIT = 15;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImageUrl: [
      {
        "url": "https://img.zcool.cn/community/0187d958cbd012a801219c770054d2.jpg@1280w_1l_2o_100sh.jpg"
      },
      {
        "url": "https://img.zcool.cn/community/01fa2b58cbd012a801219c7753e512.jpg@1280w_1l_2o_100sh.jpg"
      },
      {
        "url": "https://img.zcool.cn/community/01e70c58cbd012a801219c77e42f34.jpg@1280w_1l_2o_100sh.jpg"
      }
    ],
    playlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._pullPlayList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      playlist:[]
    });
    this._pullPlayList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._pullPlayList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  _pullPlayList() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name:'music',
      data: {
        start:this.data.playlist.length,
        count:MAX_LIMIT,
        $url: 'playlist'
      }
    }).then((res)=>{
      console.log(res);
      this.setData({
        playlist: this.data.playlist.concat(res.result.data)
      })
      wx.stopPullDownRefresh({});
      wx.hideLoading();
    })
  }
})