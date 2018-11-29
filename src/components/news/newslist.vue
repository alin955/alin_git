<template>
    <div class="newslist-container">
        <!-- 新闻列表展示区 -->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsdetail/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>{{item.add_time |dateFormat }}</span>
                            <span class="click">{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
           

        </ul>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                newslist:[]
            }
        },
        created() {
            this.getnewslist();
        },
        methods:{
            getnewslist(){
                //获取新闻列表页数据
                this.$http.get('api/getnewslist').then(function(res){
                    if(res.body.status==0){
                        this.newslist=res.body.message;
                    }
                })
            }
        }

    }
</script>

<style lang='scss' scoped>
    .newslist-container{
        .mui-table-view h2{
            font-size: 13px;
        }
        .mui-ellipsis{
            color: blue;
            font-size: 12px;
        }
        .click{
            float:right;
        }

    }
</style>