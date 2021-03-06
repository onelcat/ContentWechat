// pages/content/content.js

const util = require('../../utils/util.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_show: false,
    array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var url = util.root_url + "get_content_index_list"
    
    that.setData({
      is_show: true
    })

    if (app.globalData.openid) {
      
      
      // that.openid = app.globalData.openid
      that.setData({
        openid: app.globalData.openid
      })

      var open_id = app.globalData.openid

      var body = { "open_id": open_id }
      
      wx.request({
        url: url,
        data: body,
        header: {},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log("获取联系人列表",res.data)
        },
        fail: function (res) { },
        complete: function (res) { },
      })


    } else {

      app.openIdReadyCallback = res => {
        
        that.setData({
          openid: res.data.openid
        })

        var open_id = app.globalData.openid
        
        var body = { "open_id": open_id }

        wx.request({
          url: url,
          data: body,
          header: {},
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log("获取联系人列表", res.data)
            that.setData({
              array: res.data
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })

      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 显示
    if (this.data.is_show == false){
      
      var that = this

      var url = util.root_url + "get_content_index_list"

      var open_id = app.globalData.openid

      var body = { "open_id": open_id }

      wx.request({
        url: url,
        data: body,
        header: {},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log("获取联系人列表", res.data)
          that.setData({
            array: res.data
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("生命周期函数--监听页面隐藏")
    this.setData({
      is_show: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("生命周期函数--监听页面卸载")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  calling_phone:function(e){
    var phone_number = e.target.dataset.phone
    console.log("打电话", phone_number)
    
    wx.makePhoneCall({
      phoneNumber: phone_number, //此号码并非真实电话号码，仅用于测试
      success:function(){
        console.log("拨打电话成功！")
      },
      fail:function(){
        console.log("拨打电话失败！")
      }
    })
  },
  
  add_phone_handler: function(e) {
    console.log("添加号码本")
    wx.navigateTo({
      url: '../edit/edit?is_add=true',
    })
  },
  
  goto_info:function(e) {
    var content_id = e.target.dataset.id
    var url = "../info/info?content_id=" + content_id
    console.log("去到信息页面",url)
    wx.navigateTo({
      url: url,
    })
    

  },
})