// pages/detailList/detailList.js
import { getMovieList } from '../../services/services'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[], //榜单详情
    page:1, //默认第一页
    hasMore:true, //加载更多
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    //获取榜单类型
    this.setData({
      type:options.type
    })

    //动态设置当前页面的标题
    if(this.data.type === 'new_movies'){
      let type = '新片榜';
      wx.setNavigationBarTitle({
        title: type
      })
    }else if(this.data.type === 'top250'){
      let type = '豆瓣 Top250';
      wx.setNavigationBarTitle({
        title: type
      })
    }else if(this.data.type === 'weekly'){
      let type = '口碑榜';
      wx.setNavigationBarTitle({
        title: type
      })
    }else if(this.data.type === 'us_box'){
      let type = '北美票房榜';
      wx.setNavigationBarTitle({
        title: type
      })
    }
  
    //获取榜单详情
    this.getList(this.data.type, this.data.page);
  },

  //获取榜单详情
  getList:function(type, page){
    if(!this.data.hasMore){
      return
    }
    wx.showLoading({
      title: '正在加载中',
      mask: true
    });
    return getMovieList(type, page).then(res => {
      wx.hideLoading();
      // console.log(res);
      let list = res.subjects;
      if(list.length){
        this.setData({
          list:this.data.list.concat(list),
          page:page
        })
      }else{
        this.setData({
          hasMore:false
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err);
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
    //滑动到底部之后判断加载跟多（即增加一页）
    this.getList(this.data.type, ++this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})