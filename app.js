//app.js
App({
  data: {
    // currentCity: '北京', //当前城市
  },

  onLaunch: function () {
    //隐藏系统的tabBar
    wx.hideTabBar();
    //获取设备信息
    this.getSystemInfo();
  },
  //获取系统信息
  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },
  //点击时作为按钮选中的判断方法为
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    systemInfo: null, //客户端设备信息
    userInfo: null, //用户信息
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#696969",
      "selectedColor": "#32A4FF",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "iconPath": "/images/movies.png",
          "selectedIconPath": "/images/movies_active (2).png",
          "text": "院线"
        },
        {
          "pagePath": "/pages/list/list",
          "iconPath": "/images/@2x.png",
          "isSpecial": true,
          "text": "榜单"
        },
        {
          "pagePath": "/pages/mine/mine",
          "iconPath": "/images/profile.png",
          "selectedIconPath": "/images/profile_active (2).png",
          "text": "我的"
        }
      ]
    }
  }
})