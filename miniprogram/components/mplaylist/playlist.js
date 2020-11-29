// components/playlist/playlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist : Object
  },

  /*
  * 数据监听器
  */
  observers: {
    //针对某一个属性的监听
    ['playlist.playCount'](playCount) {
      this.setData({
        //注意这里不能直接修改playCount，避免递归
        _count : this._transNum(playCount,2)
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _count : 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _transNum(playCount,point) {
      let lenth = playCount.toString().split('.')[0].length;
      if (lenth > 6) {
        return playCount/10000 + "万"
      } else {
        return playCount;
      }
    }
  }
})
