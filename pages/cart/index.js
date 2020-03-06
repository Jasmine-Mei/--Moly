// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址
    address: {},
    // 本地的商品列表
    goods: [],
    //总价格
    allPrice: 0
  },
  onLoad: function(options) {
    // 获取本地的收货地址
    this.setData({
      // 如果本地没有address就等于一个空对象
      address: wx.getStorageSync("address") || {}
    })
    // 保存到本地
    wx.setStorageSync('address', this.data.address)
  },

  onShow() {
    // 因为data和onload只会执行一次，所以需要在每次打开页面都获取一次本地的数据
    this.setData({
      goods: wx.getStorageSync("goods") || []
    });

    // console.log(this.goods)

    // 计算总价格
    this.handleAllPrice();
  },
  // 获取收货地址
  handleGetAdress() {
    wx.chooseAddress({
      success: (res) => {
        // 把收货地址保存到data
        this.setData({
          address: {
            // 收货人
            name: res.userName,
            // 手机号码
            tel: res.telNumber,
            // 详细地址
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        });

        // 保存到本地
        wx.setStorageSync('address', this.data.address);
      }
    })
  },

  // 计算总价格
  handleAllPrice() {
    let price = 0;
    // 循环添加商品价格
    this.data.goods.forEach(v => {
      // v是数组的对象
      price += v.goods_price * v.number;
    })

    // 修改总价格
    this.setData({
      allPrice: price
    })

    // 修改本地的数据
    wx.setStorageSync('goods', this.data.goods)
  },

  // shuliang 加1
  handleCalc(e) {
    // index是点击的索引值, number可能是1，也可能是-1
    const {
      index,
      number
    } = e.currentTarget.dataset;
    // 给当前点击的商品的数量加一，但是页面不会刷新
    this.data.goods[index].number += number;

    if (this.data.goods[index].number === 0) {
      wx.showModal({
        title: '提示',
        content: '是否删除商品',
        success: (res) => {
          // 确认删除
          if (res.confirm) {
            // 删除商品
            this.data.goods.splice(index, 1)
          } else {
            // 如果点击取消的话就重新加一
            this.data.goods[index].number += 1;
          }
          // 重新修改data的goods的值
          this.setData({
            goods: this.data.goods
          })
        }
      })
    }

    // 重新修改data的goods值
    this.setData({
      goods: this.data.goods
    })

    this.handleAllPrice();
  }
})