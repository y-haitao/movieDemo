//Component Object
Component({
    properties: {
        summary: String
    },
    data: {
        isClose: true
    },
    methods: {
        fold:function(){
            this.setData({
              isClose: !this.data.isClose
            })
        }
    },
    created: function(){

    },
    attached: function(){

    },
    ready: function(){

    },
    moved: function(){

    },
    detached: function(){

    },
});