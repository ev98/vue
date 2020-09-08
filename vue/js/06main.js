var app = new new Vue({
    el:"#player",
    data:{
        query:"",
        musicList:[],
        musicUrl:"",
        musicCover:"",
        hotComments:[],
        isPlaying:false,
        musicMV:"",
        isShow:false
    },
    methods: {
        searchMusic:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                that.musicList = response.data.result.songs;
                //console.log(response.data.result.songs);
            },function(err){})
        },
        playMusic:function(musicId){
            //console.log(musicId);
            var that = this;
            // 获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(response){
                //console.log(response.data.data[0].url);
                that.musicUrl = response.data.data[0].url;
            },function(err){})
            //歌曲封面
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(response){
                //console.log(response.data.songs[0].al.picUrl);
                that.musicCover = response.data.songs[0].al.picUrl;
            },function(err){})
            //歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(response){
                that.hotComments = response.data.hotComments
            },function(err){})
        },
        play:function(){
            //console.log("play");
            this.isPlaying = true;
        },
        pause:function(){
            //console.log("pause");
            this.isPlaying = false;
        },
        playMV:function(mvId){
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvId)
            .then(function(response){
                that.isShow = true;
                that.musicMV = response.data.data.url;
            })
        },
        hide:function(){
            this.isShow = false;
            this.musicMV = "";
        }
    },
})