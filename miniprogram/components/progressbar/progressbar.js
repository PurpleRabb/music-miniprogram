// components/progressbar/progressbar.js
let movableAreaWidth = 0;
let movableViewWidth = 0;
const backgroundAudioManager = wx.getBackgroundAudioManager();
let duration = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: "00:00",
      totalTime: "00:00"
    },
    movableDis: 0,
    progress: 0
  },

  lifetimes: {
    ready() {
      this._getMovableLength();
      this._bindBGMEvent();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取进度条的实际宽度
    _getMovableLength() {
      const query = this.createSelectorQuery();
      query.select(".movable-area").boundingClientRect();
      query.select(".movable-view").boundingClientRect();
      query.exec((rect) => {
        //console.log(rect);
        movableAreaWidth = rect[0].width;
        movableViewWidth = rect[1].width;
        console.log(movableAreaWidth, movableViewWidth);
      });
    },
    _bindBGMEvent() {
      backgroundAudioManager.onPlay(() => {
        console.log("onPlay");
      })
      backgroundAudioManager.onPlay(() => {
        duration = backgroundAudioManager.duration;
        this._setDuraion(duration);
        console.log("onPlay");
      })
      backgroundAudioManager.onStop(() => {
        console.log("onStop");
      })
      backgroundAudioManager.onPause(() => {
        console.log("onPause");
      })
      backgroundAudioManager.onWaiting(() => {
        console.log("onWaiting");
      })
      backgroundAudioManager.onCanplay(() => {
        console.log("onCanplay");
        duration = backgroundAudioManager.duration;
        // if (duration === undefined) { //有时会返回undefined，开个定时器再取一次
        //   setTimeout(() => {
        //     this._setDuraion(duration);
        //     console.log("timeout:"+duration);
        //   },1000);
        // } else {
        //   console.log(duration);
        //   console.log("first time:"+duration);
        //   this._setDuraion(duration);
        // }
      })
      backgroundAudioManager.onTimeUpdate(() => {
        console.log("onTimeUpdate");
      })
      backgroundAudioManager.onEnded(() => {
        console.log("onEnded");
      })
      backgroundAudioManager.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
        wx.showToast({
          title: '错误' + res.errCode,
        })
      })
    },
    _setDuraion(secs) {
      let min = Math.floor(secs / 60);
      let sec = Math.floor(secs % 60);
      console.log(secs);
      this.setData({
        ['showTime.totalTime'] : this._padding0(min)+':'+this._padding0(sec)
      })
    },

    _padding0(value) {
      if (value < 10)
        return '0' + value;
      return value;
    }
  }
})