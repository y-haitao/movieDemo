// tabBarComponent/tabbar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#696969",
        "selectedColor": "#32A4FF",
        "list": [
          {
            "pagePath": "pages/index/index",
            "iconPath": "../images/movies.png",
            "selectedIconPath": "../images/movies_active (2).png",
            "text": "首页"
          },
          {
            "pagePath": "pages/list/list",
            "iconPath": "icon/@2x.png",
            "isSpecial": true,
            "text": "榜单"
          },
          {
            "pagePath": "pages/mine/mine",
            "iconPath": "../images/profile.png",
            "selectedIconPath": "../images/profile_active (2).png",
            "text": "我的"
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model == "iPhone X" ? true : false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
