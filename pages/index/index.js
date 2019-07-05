// pages/index/index.js
import { getMovieList } from '../../services/services'
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hit: [], //正在热映
    hitPage: 1, //默认正在热映第一页
    hitHasMore: true, //加载更多热映（默认加载）
    upcoming: [], //即将上映
    upcomingPage: 1, //默认即将上映第一页、
    upcomingHasMore: true, //加载更多上映（默认加载）
    size: 20, //默认每页20条数据
    tabNum: 0, //默认正在热映页面
    tabbar: {} //tabbar组件
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar(); //引入tabbar组件
    this.getHitList(this.data.hitPage);
    this.getUpcomings(this.data.upcomingPage);
  },

  //点击跳转影片详情页面
  jumpDetail:function(e){
    let id = e.currentTarget.id;
    wx.navigateTo({
      // url: `../movieDetail/movieDetail?id=${id}`, //ES6写法
      url:'../movieDetail/movieDetail?id=' + id, //ES5写法
    });
  },

  //获取正在热映列表
  getHitList: function (page) {
    if(!this.data.hitHasMore){
      return
    }
    wx.showLoading({
      title: '正在加载中',
      mask: true
    });
    return getMovieList('in_theaters', page).then(res => {
      wx.hideLoading();
      // console.log(res.subjects);
      let list = res.subjects;
      if(list.length){
        this.setData({
          hit:this.data.hit.concat(list),
          hitPage:page
        })
      }else{
        this.setData({
          hitHasMore:false
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err);
    })
  },

  //获取即将上映列表
  getUpcomings:function(page){
    if(!this.data.upcomingHasMore){
      return
    }
    wx.showLoading({
      title: '正在加载中',
      mask: true
    });
    return getMovieList('coming_soon', page).then(res => {
      wx.hideLoading();
      // console.log(res.subjects);
      // console.log(typeof(res.subjects.durations));
      let list = res.subjects;
      if(list.length){
        this.setData({
          upcoming:this.data.upcoming.concat(list),
          upcomingPage:page
        })
      }else{
        this.setData({
          upcomingHasMore:false
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err);
    })
  },

  //点击选项卡标题（根据索引判断是哪个页面滑动到底部然后加载更多）
  changTab:function(e){
    // console.log(e);
    this.setData({
      tabNum:e.detail.index
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
    //下拉重新加载（刷新）事件
    this.setData({
      hit: [], //正在热映
      hitPage: 1, //默认正在热映第一页
      hitHasMore: true, //加载更多热映（默认加载）
      upcoming: [], //即将上映
      upcomingPage: 1, //默认即将上映第一页、
      upcomingHasMore: true, //加载更多上映（默认加载）
    })
    //当前页面为第一页的时候
    this.getHitList(this.data.hitPage).then(() => {
      this.getUpcomings(this.upcomingPage).then(() => {
        wx.stopPullDownRefresh() //停止当前页面下拉刷新
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //滑动到底部之后判断加载跟多（即增加一页）
    if(this.data.tabNum === 0){
      this.getHitList(++this.data.hitPage)
    }else{
      this.getUpcomings(++this.data.upcomingPage)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})