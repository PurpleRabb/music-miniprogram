// components/lyric/lyric.js
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
      //console.log(lrc);
      this._parseLyric(lrc);
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
      for (let i = 0; i < _lrcList.length; i++) {
        if (currentTime <= _lrcList[i].time) {
          this.setData({
            nowHighLightIndex : i-1
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
