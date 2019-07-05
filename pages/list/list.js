// pages/list/list.js
import { getMovieList } from "../../services/services";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    new_movies:[], //新片榜
    top250: [], //豆瓣 Top250
    weekly:[], //口碑榜
    us_box:[], //北美票房榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载中',
      mask: true
    });
    // 新片榜
    getMovieList('new_movies').then(res => {
      // console.log(res);
      let new_movieslist = res.subjects;
      let new_movies3 = new_movieslist.slice(0, 3);
      this.setData({
        new_movies: new_movies3
      })
    })
    //豆瓣 Top250
    .then(() => {
      getMovieList('top250').then(res => {
        // console.log(res);
        let top250list = res.subjects;
        let top2503 = top250list.slice(0, 3);
        this.setData({
          top250: top2503
        })
      })
      .catch(err => {
        wx.hideLoading()
        console.error(err)
      })
    })
    //口碑榜
    .then(() => {
      getMovieList('weekly').then(res => {
        // console.log(res.subjects);
        let weeklylist = res.subjects;
        let weeklyList = weeklylist.map(item => {
          return item.subject
        })
        let weekly3 = weeklyList.slice(0, 3);
        this.setData({
          weekly: weekly3
        })
      })
      .catch(err => {
        wx.hideLoading()
        console.error(err)
      })
    })
    //北美票房榜
    .then(() => {
      getMovieList('us_box').then(res => {
        // console.log(res.subjects);
        wx.hideLoading() //这里记得隐藏提示框
        let us_boxlist = res.subjects;
        let us_boxList = us_boxlist.map(item => {
          return item.subject
        })
        let us_box3 = us_boxList.slice(0, 3);
        this.setData({
          us_box: us_box3
        })
      })
      .catch(err => {
        wx.hideLoading()
        console.error(err)
      })
    })
    .catch(err => {
      wx.hideLoading()
      console.error(err)
    })
  },

  //点击跳转搜索页面
  jumpSearch:function(){
    wx.navigateTo({
      url: '../search/search',
    });
  },

  //点击跳转查看全部榜单
  jumpAllList:function(e){
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../detailList/detailList?type=' + type
    });
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})