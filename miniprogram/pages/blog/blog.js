// pages/blog/blog.js
let keyword = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow : false,
    bloglist: []
  },

  onPublish() {
    wx.getSetting({
      success: (res)=> {
        //console.log(res.authSetting)
        if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res)=> {
              //console.log(res);
              this.onLoginSuccess({
                detail: res.userInfo
              })
            }
          })
        }
        else {
          this.setData({
            modalShow: true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this._onLoadBlogList();
  },

  refresh() {
    this.setData({
      bloglist:[]
    })
    this._onLoadBlogList();
  },

  _onLoadBlogList(start = 0) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name:"blog",
      data: {
        start,
        keyword,
        count: 10,
        $url: "getBlog"
      }
    }).then((res)=>{
      //console.log(res.result)
      this.setData({
        bloglist: this.data.bloglist.concat(res.result)
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
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
    //console.log("show")
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
    this.refresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom")
    this._onLoadBlogList(this.data.bloglist.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (event) {
    console.log(event)
    let blog = event.target.dataset.blog
    return {
      title: blog.content,
      path:`/pages/blog-comment/blog-comment?blogId=${blog._id}`
    }
  },

  onLoginSuccess(event) {
    console.log(event);
    const detail = event.detail
    wx.navigateTo({
      url: `../blog-edit/blog-edit?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`,
    })
  },

  onLoginFail() {
    wx.showModal({
      title: "授权用户才能发表"
    })
  },

  goComment(event) {
    wx.navigateTo({
      url: '../../pages/blog-comment/blog-comment?blogId='+event.target.dataset.blogid,
    })
  },

  onSearch(event) {
    //console.log(event.detail.keyword)
    this.setData({
      bloglist: []
    })
    keyword = event.detail.keyword
    this._onLoadBlogList(0)
  }
})