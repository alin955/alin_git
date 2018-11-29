<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsdetail.title}}</h3>
        <p class="subtitle">
            <span>发表时间 {{newsdetail.add_time | dateFormat }}</span>
            <span>点击:{{newsdetail.click}}</span>
        </p>
        <hr>
        <div class="content" v-html="newsdetail.content">

        </div>
        <!-- 评论区域 -->
        <comment-box :id="this.id"></comment-box>
    </div>    
</template>

<script>

//导入评论子组件
    import comment from "../subcomponents/comment.vue";
    export default{
        data(){
            return{
                //在script获取参数 this
                id:this.$route.params.id,
                newsdetail:{}
            }
            
        },
        created() {
            this.getnewsdetail();
        },
        methods:{
            getnewsdetail(){
                //获取新闻详情页
                this.$http.get('api/getnew/'+this.id).then(function(res){
                    if(res.body.status==0){
                        this.newsdetail=res.body.message[0];
                    }
                })
            }
        },
        components:{ //注册子组件
            "comment-box":comment

        }
    }
</script>

<style lang="scss">
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color:red;
        }
        .subtitle{
            font-size: 13px;
            color:cadetblue;
            display:flex;
            justify-content:space-between;
            
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>
