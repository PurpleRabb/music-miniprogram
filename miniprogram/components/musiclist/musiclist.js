// components/musiclist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist : Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    musicId : ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelected(event) {
      //console.log(event.currentTarget.dataset.musicid);
      let dataset = event.currentTarget.dataset
      this.setData ({
        musicId : dataset.musicid
      });
      wx.navigateTo({
        url: `../../pages/player/player?playerId=${event.currentTarget.dataset.musicid}&index=${dataset.index}`,
      })
    }
  }
})
