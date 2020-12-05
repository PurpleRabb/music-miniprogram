// pages/player/player.js

var musicDetails;
let nowPlayingIndex = 0;
let musiclist = [];
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
    musiclist = wx.getStorageSync('musiclist');
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
    console.log(musiclist);
  },
  _getMusicDetail(playerId) {
    let music = musiclist[nowPlayingIndex];
    console.log(music);
    backgroundAudioManager.stop();
    wx.showLoading({
      title: '歌曲加载中',
    })
    //console.log(playerId);
    wx.cloud.callFunction({
      name:'music',
      data : {
        $url: "getmusicUrl",
        musicId : playerId
      }
    }).then((res) => {
      backgroundAudioManager.src = res.result.data[0].url;
      backgroundAudioManager.title = music.name;
      backgroundAudioManager.coverImgUrl = music.al.picUrl;
      backgroundAudioManager.singer = music.ar[0].name;
      backgroundAudioManager.epname = music.al.name;
      this.setData ({
        isPlaying : true,
        picUrl: music.al.picUrl
      });
      wx.hideLoading();
      console.log(res.result);
    })
  },

  switchState() {
    if (this.data.isPlaying) {
      backgroundAudioManager.pause();
    } else {
      backgroundAudioManager.play();
    }
    this.setData ({
      isPlaying : !this.data.isPlaying
    })
  },

  onPrev() {
    nowPlayingIndex--;
    if (nowPlayingIndex < 0) {
      nowPlayingIndex = musiclist.length - 1;
    }
    this._getMusicDetail(musiclist[nowPlayingIndex].id);
   // console.log("onPrev:" + musiclist[nowPlayingIndex].id);
  },

  onNext() {
    nowPlayingIndex++;
    if (nowPlayingIndex == musiclist.length) {
      nowPlayingIndex = 0;
    }
    this._getMusicDetail(musiclist[nowPlayingIndex].id);
   // console.log("onNext:" + musiclist[nowPlayingIndex].id);
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