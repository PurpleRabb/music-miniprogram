// components/blog-ctrl/blog-ctrl.js
let userInfo = {}
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  externalClasses: ['iconfont','icon-pinglun','icon-fenxiang'],

  /**
   * 组件的初始数据
   */
  data: {
    loginShow: false,
    modalShow: false,
    content: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment() {
     wx.getSetting({
       success: (res) => {
         if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success : (res) => {
              userInfo = res.userInfo
              this.setData ({
                modalShow : true
              })
            }
          })
         } else {
           this.setData({
             loginShow : true
           })
         }
       }
     })
    },

    onLoginSuccess() {
      this.setData({
        loginShow: false
      }, () => {
        this.setData({
          modalShow : true
        })
      })
    },

    onLoginFail() {
      wx.showModal({
        content: "授权用户才能访问",
      })
    }
  }
})
