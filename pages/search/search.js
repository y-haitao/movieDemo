// pages/search/search.js
import { getMovieList } from '../../services/services'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchMovie:'', //搜索框内容
    movies:[], //显示搜索结果
    page: 1, //默认第一页
    size: 20, //每页20条
    hasMore: true //加载更多
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //获得搜索结果(暂未实现)
  getResult:function(){
    if(!this.data.hasMore){
      return
    }
    wx.showLoading({
      title: '正在加载中',
      mask: true
    });
    let page = this.data.page;
    let size = this.data.size;
    let search = this.data.searchMovie;
    getMovieList('search', page++, size, search).then(res => {
      wx.hideLoading()
      // console.log(res);
      let movies = res.subjects;
      if(movies.length){
        this.setData({
          movies:this.data.movies.concat(movies),
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

  //确定搜索时触发
  onSearch:function(e){
    this.setData({
      searchMovie:e.detail, //搜索框内容
      movies:[], //显示搜索结果
      page: 1, //默认第一页
      hasMore: true //加载更多
    })
    this.getResult();
  },

  //取消搜索搜索时触发
  onCancel:function(){
    console.log('cancel')
  },

  //点击跳转详情页面
  jumpDetail:function(e){
    let id = e.currentTarget.id;
    wx.navigateTo({
      // url: `../movieDetail/movieDetail?id=${id}`, //ES6写法
      url:'../movieDetail/movieDetail?id=' + id, //ES5写法
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
    this.getResult();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})