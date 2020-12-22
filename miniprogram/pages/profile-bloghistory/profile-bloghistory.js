// pages/profile-bloghistory/profile-bloghistory.js
const MAX_LIMIT = 10
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blog: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadMyBlog()
  },

  _loadMyBlog() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "blog",
      data: {
        start: this.data.blog.length,
        count: MAX_LIMIT,
        $url: "getMyBlog"
      }
    }).then((res)=>{
      console.log(res.result)
      this.setData({
        blog: this.data.blog.concat(res.result)
      })
      wx.hideLoading()
    })
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
    this._loadMyBlog()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})