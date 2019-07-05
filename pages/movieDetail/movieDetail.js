// pages/movieDetail/movieDetail.js
import { findMovieById } from '../../services/services'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {} //影片详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let id = options.id; //获取影片对应的id
    // let id = 26931786; //测试id号

    wx.showLoading({
      title: '正在加载中',
      mask: true,
    });

    //获取电影详情条目
    findMovieById(id).then(res => {
      wx.hideLoading();
      // console.log(res);
      this.setData({
        detail:res
      })
    })
    .catch(error => {
      wx.hideLoading();
      console.log(error);
    })
  },

  //点击预览剧照
  preview:function(e){
    let photos = this.data.detail.photos;
    //循环遍历数组里面的照片链接
    let urls = photos.map(photos => {
      return photos.image
    })
    //在新页面中全屏预览图片
    wx.previewImage({
      current: urls[e.currentTarget.dataset.index], //urls 的第一张
      urls //需要预览的图片链接列表
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