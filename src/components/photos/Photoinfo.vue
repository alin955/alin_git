<template>
    <div class="photoinfo-container">
        <h3>{{ Photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{Photoinfo.add_time |dateFormat}}</span>
            <span>点击 :{{Photoinfo.click}}次</span>
        </p> 

        <hr> 

         <!-- 缩图区域 -->
         <div class="thumbs">
        <!-- <img class="preview-img" v-for="(item,index) in list" :src="item.src"
        height="100" @click="$preview.open(index,list)" :key="item.src"> -->
       <vue-preview :slides="list"></vue-preview>
         </div>
         <!-- 图片内容区域 -->
         <div class="content" v-html="Photoinfo.content"></div>
       

         <!-- 评论子组件 -->
         <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
    //1.导入评论子组件
    import comment from '../subcomponents/comment.vue'
    export default {
        data(){
            return{
                id:this.$route.params.id,
                Photoinfo:{},
                list:[] //缩图数组
            };

        },
        created() {
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods:{
            getPhotoInfo(){
                //获取图片详情
                this.$http.get('api/getimageInfo/'+this.id).then(function(result){
                if(result.body.status === 0){
                    this.Photoinfo=result.body.message[0];
                }
                });
            },
            getThumbs(){
                //获取缩图
                 this.$http.get('api/getthumbimages/'+this.id).then(function(result){
                if(result.body.status == 0){
                   //循环每个图片数据，补全高度和宽度
                   result.body.message.forEach(item => {
                       item.w=600;
                       item.h=400;
                       item.msrc=item.src
                   });
                   //把完整数据保存到list中
                   this.list=result.body.message;
                }
                });

            },
           
        },
        components:{
            //注册评论子组件
            'cmt-box':comment
        }
    }
    
</script>

<style lang="scss" scoped>

    .photoinfo-container{
        padding: 3px;
        h3 {
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }
        .thumbs{
            img{
                margin: 10px;
                box-shadow: 0 0 8px #999;
            }
        }
    }

</style>