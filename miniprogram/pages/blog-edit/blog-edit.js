// pages/blog-edit/blog-edit.js
const MAX_WORDS = 140;
const MAX_IMGS = 9;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordNum: 0,
    selectedImages: [],
    showSelect: true
  },

  textInput(event) {
    console.log(event)
    this.setData({
      wordNum: event.detail.value.length,
      footerBottom: 0
    })
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
      sizeType: ["original","compressed"],
      sourceType: ['album','camera'],
      success: (res) => {
        console.log(res);
        this.setData({
          selectedImages: this.data.selectedImages.concat(res.tempFilePaths)
        })
        max = MAX_IMGS - this.data.selectedImages.length;
        this.setData({
          showSelect: max <= 0? false: true
        })
      }
    })
  },

  removeImage(event) {
    console.log(event.target.dataset.index);
    this.data.selectedImages.splice(event.target.dataset.index,1)
    this.setData({
      selectedImages: this.data.selectedImages
    })

    if (this.data.selectedImages.length == MAX_IMGS-1) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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