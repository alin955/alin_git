<template>
    <div class="goodsinfo-container" >
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
       <!-- 商品轮播区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <swiper :lunbo="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

       <!-- 商品购买区域 -->
                    <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                              市场价:<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">
                                  ￥{{goodsinfo.sell_price}}</span>  
						</p> 
                        <!-- 传递给子组件 -->
                        <p>购买数量:<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p> 
                        <p>
                             <mt-button type="primary" size="small">立即购买</mt-button>
                             <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>   

                                <!-- 解决父子组件的嵌套 -->
                                <!-- 解决问题:子组件向父组件传值 -->
                             <!-- 事件调用的本质:父向子传递方法，子调用这个方法,同时数据当作参数,传递给这个方法 -->


                        </p>   

					</div>
				</div>
			</div>

       <!-- 商品参数区域 -->
                    <div class="mui-card">
				<div class="mui-card-header"></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{goodsinfo.goods_no}}</p>
                        <p>库存情况:{{goodsinfo.stock_quantity}}</p>
                        <p>上架时间:{{goodsinfo.add_time}}</p>
					</div>
				</div>
                
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>

    </div> 
</template>

<script>
    //导入轮播组件
     import swiper from '../subcomponents/swiper.vue';
     import numbox from '../subcomponents/goodsinfo_numbox.vue'
     

    export default{
        data(){
            return{
                id:this.$route.params.id, //将路由对象id挂载到data
                lunbotu:[],
                goodsinfo:{},
                ballFlag:false,
                selectedCount:1 //默认商品数量为1
            }
        },
          components:{
            swiper,
            numbox
        },
        created() {
            this.getLunbotu();
            this.getGoodsInfo();
        },
        methods:{
            getLunbotu(){
               this.$http.get('api/getthumbimages/'+this.id).then(function(result){
                    if(result.body.status==0){
                        //先循环数组，给item添加img
                         result.body.message.forEach(ele => {
                            ele.img = ele.src;
                            ele.url = ele.src;
                     });
                           
                    }
                     this.lunbotu=result.body.message; 
                });
            },
            getGoodsInfo(){
                //获取商品信息
                this.$http.get("api/getgoodsinfo/"+this.id).then(result=>{
                    if(result.body.status == 0){
                        this.goodsinfo=result.body.message[0];
                    }
                })
            },
            goDesc(id){
                //使用编程式导航跳转到图文介绍
                this.$router.push({name:"goodsdesc",params:{id}});
            },
            goComment(id){
                 this.$router.push({name:"goodscomment",params:{id}});
            },
            addToShopCar(){
                //添加到购物车
                this.ballFlag=!this.ballFlag;

                var goodsinfo = {
                    id:this.id,
                    count:this.selectedCount,
                    price:this.goodsinfo.sell_price,
                    selected:true  //默认选中状态
                };
                this.$store.commit('addToCar',goodsinfo);
            },
            beforeEnter(el){
                el.style.transform="translate(0,0)";
            },
            enter(el,done){
               el.offsetWidth;
                //获取小球在页面的位置
                const ballPosition=this.$refs.ball.getBoundingClientRect();
                //获取微标在页面位置
                const badgePosition=document
                .getElementById("badge")
                .getBoundingClientRect();
                

                const xDist=badgePosition.left - ballPosition.left;
                const yDist=badgePosition.top - ballPosition.top;
             

                //字符串拼接
                // el.style.transform='translate(${xDist}px ,${yDist}px)';
                el.style.transform=`translate(${xDist}px ,${yDist}px)`;
                console.log(el.style.transform);
               el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)";
               done();
            },
            afterEnter(el){
                this.ballFlag=!this.ballFlag;
            },
            getSelectedCount(count){
                //当子组件把选中数量传递给父组件,把选中值保存到data
                this.selectedCount=count;
                console.log("父组件拿到的数量为"+this.selectedCount);
            }

                
            

        },
      
    }
</script>

<style lang="scss" scoped>
        .goodsinfo-container{
            background-color: #eee;
            overflow: hidden;
        }
        .now_price{
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 10px 0;
            }
        }

        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 407px;
            left: 140px;
            
           
        }
</style>

