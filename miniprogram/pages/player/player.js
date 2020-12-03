// pages/player/player.js

var musicDetails;
const backgroundAudioManager = wx.getBackgroundAudioManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl : "",
    isPlaying : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    let musiclist = wx.getStorageSync('musiclist');
    musicDetails = musiclist[options.index];
    wx.setNavigationBarTitle({
      title: musicDetails.name,
    });
    this.setData({
      picUrl: musicDetails.al.picUrl,
      isPlaying : false
    })
    this._getMusicDetail(options.playerId);
    //console.log(this.data.picUrl);
  },
  _getMusicDetail(playerId) {
    wx.showLoading({
      title: '歌曲加载中',
    })
    console.log(playerId);
    wx.cloud.callFunction({
      name:'music',
      data : {
        $url: "getmusicUrl",
        musicId : playerId
      }
    }).then((res) => {
      backgroundAudioManager.src = res.result.data[0].url;
      backgroundAudioManager.title = musicDetails.name;
      backgroundAudioManager.coverImgUrl = musicDetails.al.picUrl;
      backgroundAudioManager.singer = musicDetails.ar[0].name;
      backgroundAudioManager.epname = musicDetails.al.name;
      this.setData ({
        isPlaying : true
      });
      wx.hideLoading();
      console.log(res.result);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})