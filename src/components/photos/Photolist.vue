<template>
    <div>

        
        <!-- 顶部滑动条 -->
    <van-tabs v-model="active" @click="getCatImage">
    <van-tab  v-for="item in cats" :key="item.id" :title="item.title">
           
        <div class="photolist">
               <router-link  class="item" v-for="item in images" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                    <img v-lazy="item.img_url" alt="">
                    <div class="info">
                        <div class="info-title">{{item.title}}</div>
                        <div class="info-body">{{ item.zhaiyao }}</div>
                    </div>
                   </router-link>
        </div>
    </van-tab>
    </van-tabs>
    </div>
    

</template>

<script>
    
    export default{
        data(){
            return {
                cats:[],//存储分类名称
                active:0,
                images:[]
            };
        },
        created() {
            //初始化数据
            this.getImgCat();
             this.getCatImage(0,'全部');
        },
        methods:{
            getImgCat(){
                //发送ajax请求分类名称
                this.$http.get('api/getimgcategory').then(function(res){
                    if(res.body.status==0){
                        this.cats=res.body.message;
                        this.cats.unshift({id:0,title:'全部'});
                    }
                })
            },
            //标签页单击事件
            getCatImage(index,title){
                //获取对应分类的id 通过index下标获取
                var id=this.cats.length==0 ? 0:this.cats[index].id;
                 this.$http.get('api/getcatimages/'+id).then(function(res){
            if(res.body.status == 0){
              //赋值给当前data属性的images，用户遍历
              this.images = res.body.message;
          }
        });
            }
           

        }
    }
    
</script>

 <style lang="scss" scoped>

    .mint-header{
        z-index: 99;
    }
    .photolist{
        padding: 0 10px;

        li{
            background-color: #ccc;
            list-style: none;
            margin-bottom: 10px;
            box-shadow: 0px 0px 20px #aaa;
            position: relative;

            img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
            }
             img{
            width: 100%;
            vertical-align: middle;
        }
           
            .info{
                color: white;
                position: absolute;
                bottom: 0px;
                background-color: rgba(0,0,0,0.5);

                .info-title{
                      font-size: 15px;  
                }
                .info-body{
                    font-size: 12px;
                }
            }
        }
       
    }
</style>



