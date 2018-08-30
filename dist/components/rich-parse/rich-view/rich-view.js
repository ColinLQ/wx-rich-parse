let realWindowWidth = 0;
let realWindowHeight = 0;
wx.getSystemInfo({
  success: function(res) {
    realWindowWidth = res.windowWidth
    realWindowHeight = res.windowHeight
  }
})

Component({
  properties: {
    content: {
      type: Object,
      value: {}
    },
    maxLayer: { // 最大层级数
      type: Number
    },
    item: {
      type: Object,
      value: {}
    }
  },

  ready() {
    if (this.data.item.tag === 'img') {
      console.log(this)
    }
  },

  methods: {
    wxParseImgLoad(e) {
      const padding = this.data.content.view.imagePadding;
      const windowWidth = realWindowWidth - 2 * padding;
      const width = e.detail.width > windowWidth ? windowWidth : e.detail.width;
      this.setData({ 'item.width': width });
    },
    wxParseImgTap(e) {
      const { src, from: tagFrom } = e.target.dataset;
      if (typeof(tagFrom) != 'undefined' && tagFrom.length > 0) {
        wx.previewImage({
          current: src,
          urls: this.data.content.imageUrls
        })
      }
    }
  }
})
