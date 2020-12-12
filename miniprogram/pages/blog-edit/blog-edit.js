// pages/blog-edit/blog-edit.js
const MAX_WORDS = 140;
const MAX_IMGS = 9;
const promises = [];
const db = wx.cloud.database();
let userInfo = {};
let content= "";
let fileIds = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordNum: 0,
    selectedImages: [],
    showSelect: true,
  },

  textInput(event) {
    //console.log(event)
    this.setData({
      wordNum: event.detail.value.length,
      footerBottom: 0,
    });
    content = event.detail.value;
  },

  onFocus(event) {
    this.setData({
      footerBottom: event.detail.height
    })
  },

  onBlur() {
    this.setData({
      footerBottom: 0
    })
  },

  onSelectImage() {
    let max = MAX_IMGS - this.data.selectedImages.length;
    wx.chooseImage({
      count: max,
      sizeType: ["original", "compressed"],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res);
        this.setData({
          selectedImages: this.data.selectedImages.concat(res.tempFilePaths)
        })
        max = MAX_IMGS - this.data.selectedImages.length;
        this.setData({
          showSelect: max <= 0 ? false : true
        })
      }
    })
  },

  removeImage(event) {
    console.log(event.target.dataset.index);
    this.data.selectedImages.splice(event.target.dataset.index, 1)
    this.setData({
      selectedImages: this.data.selectedImages
    })

    if (this.data.selectedImages.length == MAX_IMGS - 1) {
      this.setData({
        showSelect: true
      })
    }
  },

  onPreview(event) {
    wx.previewImage({
      urls: this.data.selectedImages,
      current: event.target.dataset.imagesrc
    })
  },

  send() {
    if (content.trim().length == "") {
      wx.showModal({
        title: '发布内容不能为空',
      })
      return;
    }
    wx.showLoading({
      title: '发布中...',
      mask: true
    })
    for (let i = 0; i < this.data.selectedImages.length; i++) {
      let _promise = new Promise((resole, reject) => {
        let item = this.data.selectedImages[i];
        let suffix = /\.\w+$/.exec(item); //获取扩展名
        console.log(suffix);
        wx.cloud.uploadFile({ //上传到云存储
          cloudPath: "blog/" + Date.now() + '-' + Math.random() * 1000000 + suffix,
          filePath: item,
          success: (res) => {
            fileIds = fileIds.concat(res.fileID);
            resole(res);
          },
          fail: (res) => {
            console.log(res);
            reject(res);
          }
        })
      })
      promises.push(_promise)
    };
    Promise.all(promises).then((res) => {
      //调用云函数插入数据库
      db.collection('blog').add({
        data: {
          ...userInfo,
          createTime: db.serverDate(),
          content,
          images: fileIds
        }
      }).then((res)=> {
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '发布成功',
            })
          },
        });
        wx.navigateBack();
        let pages = getCurrentPages()
        let prePage = pages[pages.length-2] //获取父页面
        prePage.refresh() //通知父页面更新
      });
    }).catch((exception) => {
      console.log(exception);
      wx.hideLoading();
      wx.showToast({
        title: '发布失败',
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    userInfo.nickName = options.nickName;
    userInfo.avatar = options.avatarUrl;
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