// components/lyric/lyric.js
let lyricHeight = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowLyric: {
      type: Boolean,
      value: false
    },
    lyric: String
  },

  observers: {
    lyric(lrc) {
      console.log(lrc);
      //this._parseLyric(lrc);
      if (lrc == "暂无歌词") {
        this.setData({
          lrcList: [
            {
              lrc,
              time: 0,
              nowHighLightIndex: -1
            }
          ]
        });
      } else {
        this._parseLyric(lrc);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lrcList: [],
    nowHighLightIndex : 0,
    scrollTop : 0
  },

  lifetimes: {
    ready() {
      //小程序约定手机宽度为750rpx
      wx.getSystemInfo({
        success: (result) => {
          //求出1rpx=多少px
          lyricHeight = result.screenWidth / 750 * 64;//计算歌词的实际高度
          console.log(result);
        },
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    update(currentTime) {
      //console.log(currentTime);
      let _lrcList = this.data.lrcList;
      if (_lrcList.length == 0) {
        return;
      }
      if (currentTime > _lrcList[_lrcList.length - 1].time) {
        if (this.data.nowHighLightIndex != -1) {
          this.setData({
            nowHighLightIndex : -1,
            scrollTop: _lrcList.length * lyricHeight
          })
        }
      }
      for (let i = 0; i < _lrcList.length; i++) {
        if (currentTime <= _lrcList[i].time) {
          this.setData({
            nowHighLightIndex : i-1,
            scrollTop : lyricHeight * (i-1)
          })
          break;
        }
      }
    },
    _parseLyric(sLyric) { //解析歌词
      let line = sLyric.split('\n');
      //console.log(line);
      let _lrcList = [];
      line.forEach((elem) => {
        let time = elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g);
        //console.log(time);
        if (time != null) {
          let lrc = elem.split(time)[1];
          let _time = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/);
          //console.log(_time);
          let time2Secs = parseInt(_time[1]) * 60 + parseInt(_time[2]) + parseInt(_time[3]) / 1000;
          _lrcList.push({
            lrc,
            time: time2Secs
          })
        }
      });
      this.setData({
        lrcList: _lrcList
      })
    }
  }
})
