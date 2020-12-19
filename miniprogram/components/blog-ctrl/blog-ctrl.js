// components/blog-ctrl/blog-ctrl.js
let userInfo = {}
let db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId: String
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

    onLoginSuccess(event) {
      this.setData({
        loginShow: false
      }, () => {
        this.setData({
          modalShow : true
        })
        userInfo = event.detail
        console.log(userInfo)
      })
    },

    onLoginFail() {
      wx.showModal({
        content: "授权用户才能访问",
      })
    },

    onSend(event) {
      if(this.data.content.trim() == '') {
        wx.showModal({
          content: '评论不能为空',
        })
        return
      }
      //console.log(this.data.content)
      //存储数据
      wx.showLoading({
        title: '评价中',
      })

      db.collection("blog-comment").add({
        data : {
          content:this.data.content,
          createTime: db.serverDate(),
          blogId: this.properties.blogId,
          nickName: userInfo.nickName,
          avatar: userInfo.avatarUrl
        }
      }).then( (res) => {
        //console.log("插入成功")
        wx.hideLoading()
        this.setData({
          modalShow: false,
          content:''
        })
        //刷新评论列表
        this.triggerEvent('refreshCommentList')
      })
    },

    onInput(event) {
      this.setData({
        content: event.detail.value
      })
    }
  }
})
