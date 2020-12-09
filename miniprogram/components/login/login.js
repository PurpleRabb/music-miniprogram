// components/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event) {
      console.log(event);
      const userinfo = event.detail.userInfo;
      if (userinfo) {
        //授权成功
        this.setData({
          modalShow : false
        });
        this.triggerEvent("loginSuccess",userinfo);
      } else {
        //拒绝授权
        this.triggerEvent("loginFail");
      }
    }
  }
})
