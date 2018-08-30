import showdown from './wx-parse/showdown.js';
import HtmlToJson from './wx-parse/html2json.js';

Component({
  properties: {
    rich: {
      type: String,
      value: '',
      observer(newVal) {
        this.wxParse()
      }
    },
    maxLayer: { // 最大层级数
      type: Number,
      value: 20
    },
    type: {
      type: String,
      value: 'html'
    },
    imagePadding: {
      type: Number,
      value: 0
    },
    padding: {
      type: String,
      value: '20rpx'
    }
  },

  ready() {
    this.wxParse();
  },

  methods: {
    wxParse() {
      const { imagePadding, type, rich, maxLayer } = this.data;
      let transData = {}; //存放转化后的数据
      if (type == 'html') {
        transData = HtmlToJson.html2json(rich, maxLayer);
      } else if (type == 'md' || type == 'markdown') {
        const converter = new showdown.Converter();
        const html = converter.makeHtml(rich);
        transData = HtmlToJson.html2json(html, maxLayer);
      }
      transData.view = {};
      transData.view.imagePadding = 0;
      if (typeof(imagePadding) != 'undefined') {
        transData.view.imagePadding = imagePadding
      }
      this.setData({
        content: transData
      })
    }
  }
})
