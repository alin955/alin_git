<template>
    
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入内容" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
              <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">  
                  <div class="cmt-title">
                      第{{ i+1 }}楼&nbsp;&nbsp;匿名用户{{ item.user_name }}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat }}
                  </div>
                  <div class="cmt-body">
                     {{item.content}}
                  </div>
              </div>
        </div>
       <mt-button type="danger" plain @click="getMore" size="large">加载更多</mt-button>
    </div>   
    
</template>
<script>
        export default{
            data(){
                return{
                    pageIndex:1, //默认显示第一页
                    comments:[],
                    msg:'' //评论输入内容
                }
            },
            created() {
                this.getComments();
            },
            methods:{
                getComments(){
                    this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(function(res){
                        if(res.body.status==0){
                            //   this.comments=res.body.message;  
                            //每当获取新数据，拼接老数据
                            this.comments=this.comments.concat(res.body.message);  
                        }
                    });
                }
                ,getMore(){
                    //加载更多
                    this.pageIndex++;
                    this.getComments();
                },
                postComment(){
                    //发表评论
                    this.$http.post('api/postcomment/'+this.$route.params.id,{
                        content:this.msg.trim()
                    }).then(function(res){
                        if(res.body.status==0){
                            //拼接评论对象
                            var cmt={
                                user_name:"匿名用户",
                                add_time:Date.now(),
                                content:this.msg.trim()

                            };
                            this.comments.unshift(cmt);
                            //评论成功后数据清空
                            this.msg="";
                        }
                    })
                }
                
            },
            props:["id"]
        }
    
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-szie:13px;
                .cmt-title{
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                    
                }
            }
        }

    }
</style>
