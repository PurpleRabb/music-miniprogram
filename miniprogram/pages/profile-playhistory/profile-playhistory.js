// pages/profile-playhistory/profile-playhistory.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openid = app.globalData.openid
    const historyList = wx.getStorageSync(openid)
    if (historyList.length == 0) {
      wx.showModal({
        title: "无播放历史"
      })
    } else {
      //替换当前播放列表
      wx.setStorage({
        data: historyList,
        key: 'musiclist',
      })
      this.setData({
        historyList
      })
    }

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})