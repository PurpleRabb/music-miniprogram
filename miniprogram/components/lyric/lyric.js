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

  observers : {
    lyric(lrc) {
      //console.log(lrc);
      this._parseLyric(lrc);
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lrcList : []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _parseLyric(sLyric) { //解析歌词
      let line = sLyric.split('\n');
      console.log(line);
      let _lrcList = [];
      line.forEach((elem)=> {
        let time = elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g);
        //console.log(time);
        
        if (time != null) {
          let lrc = elem.split(time)[1];
          let _time = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/);
          //console.log(_time);
          let time2Secs = parseInt(_time[1]) * 60 + parseInt(_time[2]) + parseInt(_time[3]) / 1000;
          _lrcList.push({
            lrc,
            time:time2Secs
          })
        }
      });
      this.setData({
        lrcList : _lrcList
      })
    }
  }
})
