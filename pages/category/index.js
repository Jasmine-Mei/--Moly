import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [], //数据列表
    activeKey: 0,
    currentIndex: 0 //当前点击的索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request({
      url: "/categories"
    }).then(res => {
      let {
        message
      } = res.data;
      this.setData({
        categoryList: message
      })
      console.log(message)
      console.log(res)
    })
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail+1}项`
    })
    console.log(event)
    this.setData({
      currentIndex: event.detail
    })
  }
})