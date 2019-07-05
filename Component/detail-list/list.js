//Component Object
Component({
    options:{
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        list: Array,
        title: String
    },
    data: {

    },
    methods: {
        jumpDetail:function(e){
            let id = e.currentTarget.id;
            wx.navigateTo({
                url: '../../pages/movieDetail/movieDetail?id=' + id
            });
        }
    },
    created: function() {

    },
    attached: function() {

    },
    ready: function() {

    },
    moved: function() {

    },
    detached: function() {

    },
});
  