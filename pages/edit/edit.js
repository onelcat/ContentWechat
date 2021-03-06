// pages/edit/edit.js
const app = getApp();

const util = require("../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // false 增加 true 编辑
    type: true,
    info_data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("设置参数", options.is_add);

    var that = this;

    that.setData({
      type: options.is_add
    });

    if (that.data.type == "true") {
      console.log("新增数据", that.data.type);

      that.setData({
        info_data: {
          nike_name: "",
          avatar_url: "",
          remark: "",
          array: [{ phone_type: "住宅", phone_number: "" }]
        }
      });
    } else {

      var user_info = wx.getStorageSync("user_info");
      console.log("重新编辑数据", user_info);

      that.setData({
        info_data: user_info
      });
      wx.removeStorageSync("user_info");



    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  save_info_data: function() {
    var that = this;
    console.log("保存联系人", that.data);
    var nike_name = that.data.info_data.nike_name
    var array = that.data.info_data.array
    if (that.data.type == "true") {
      console.log("新增电话");

      var body = {
        open_id: app.globalData.openid,
        nike_name: nike_name,
        avatar_url: "",
        remark: "",
        array: array
      };

      var url = util.root_url + "add_content";

      wx.request({
        url: url,
        data: body,
        header: {},
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: function(res) {
          console.log("添加一个用户成功", res.data);
          wx.navigateBack({
            url: 1
          });
        },
        fail: function(res) {},
        complete: function(res) {}
      });
    } else {
      console.log("编辑电话");


    }
  },

  // bindFormSubmit: function (e) {
  //   console.log(e.detail.value)
  //   var data = e.detail.value
  //   console.log("输入的号码部分",data)
  //   var nike_name = ""
  //   var phone_number = []
  //   for (var key in data) {
  //     if (key == 'nike_name'){
  //       nike_name = data[key]
  //     } else {
  //       // console.log("电话本号码", data[key])
  //       phone_number.push(data[key])
  //     }
  //   }
  //   // console.log("我的电话本",phone_number)
  //   var array = []
  //   phone_number.forEach(phone => {
  //     // console.log("获取遍历数组",phone)
  //     array.push({phone_type:"住宅",phone_number: phone})
  //   })
  //   // console.log("用户电话号码",array)

  //   var body = {
  //     open_id:  app.globalData.openid,
  //     nike_name: nike_name,
  //     avatar_url: "",
  //     remark: "",
  //     array: array
  //   }

  //   var url = util.root_url + "add_content"

  //   wx.request({
  //     url: url,
  //     data: body,
  //     header: {},
  //     method: 'POST',
  //     dataType: 'json',
  //     responseType: 'text',
  //     success: function (res) {
  //       console.log("添加一个用户成功", res.data)

  //       if (data.is_add) {
  //         wx.navigateBack({
  //           url: 1,
  //         })
  //       } else {
  //         wx.navigateBack({
  //           url: 2,
  //         })
  //       }

  //     },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })

  // },

  add_new_phone: function() {
    var that = this;
    if (that.data.type == "true"){
      
      console.log("新增电话", that.data.info_data.array);
      var info_data = that.data.info_data;
      var new_number = { phone_type: "住宅", phone_number: "" };
      info_data.array.push(new_number);
      // 重新刷新页面 对数据刷新
      that.setData({
        info_data: info_data
      });
    } else {

    }



  },

  delete_phone_number: function(e) {

    var that = this
    var index = e.currentTarget.dataset.index;
    console.log("删除号码的下标", index);
    if (that.data.type == "true"){
      var array = this.data.info_data.array;
      array.splice(index, 1);
      console.log("数组数据", array);
      var info_data = that.data.info_data;

      info_data.array = array;
  
      that.setData({
        info_data: info_data
      });

    } else {

    }


  },

  // bindblur_handler:function(e){
  //   console.log("失去焦点",e)
  // },

  bindinput_nike_name_handler: function(e) {

    console.log("输入的昵称", e.detail.value);
    var that = this;
    var info_data = that.data.info_data;
    info_data.nike_name = e.detail.value;
    that.setData({
      info_data: info_data
    });
    
  },

  bindinput_handler: function(e) {
    console.log("获取实时输入的数据", e);
    var index = e.currentTarget.dataset.index;
    var that = this;
    var info_data = that.data.info_data;
    info_data.array[index].phone_number = e.detail.value;
    that.setData({
      info_data: info_data
    });
  }
});
