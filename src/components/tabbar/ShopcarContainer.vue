<template>
<div class="shopcar-container">
    <!-- 商品列表区域 -->
    <div class="goods-list">
        <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- <mt-switch v-model="$store.getters. getGoodsSelected[item.id]"
        @change="selectedChanged(item.id,$store.getters. getGoodsSelected[item.id])"></mt-switch> -->
        	<!-- <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="changeSelected(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch> -->
            	<!-- <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch> -->
        
            <mt-switch v-model="$store.getters. getGoodsSelected[item.id]"
             @change="selectedChanged(item.id,$store.getters. getGoodsSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="info">
                          <h1>{{item.title}}</h1>
                          <p>
                          <span class="price">${{item.sell_price}}</span>
                          <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>

                          <!-- 如何从购物车获取商品数量，先创建一个空对象，然后循环购物车数据
                          id作为对象属性名,count作为对象的属性值，循环得到一个对象 {} -->

                          <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                          </p>  
                    </div>   
                </div>
            </div>
        </div>
    </div>
        <!-- 结算区域 -->
     <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                   <div class="left">
                       <p>总结(不含运费)</p>
                       <p>已勾选商品<span class="red">{{$store.getters. getGoodsCountAndAmount.count}}</span>件，总价 
                       <span class="red">${{$store.getters. getGoodsCountAndAmount.amount}}</span></p>
                   </div>   
                   <mt-button type="danger">去结算</mt-button>
                </div>
                
            </div>
        </div>
        <!-- <p>{{ $store.getters.getGoodsSelected}}</p> -->
           <p>{{$store.getters.getGoodsSelected}}</p>
    </div>


</template>

<script>
    import numbox from '../subcomponents/shopcar_numbox.vue'


    export default {
        data(){
            return {
                goodslist: []
            }
        },
        created() {
            this.getGoodsList();
        },
        methods:{
        getGoodsList(){
            //1.获取store商品id ,然后拼接字符串
            var idArr=[];
            this.$store.state.car.forEach(item =>idArr.push(item.id));
            //如果没有商品，直接返回
            if(idArr.length<=0){
                return;
            }

            this.$http.get('api/getshopcarlist/'+idArr.join(",")).then(result=>{
                if(result.body.status == 0){
                    this.goodslist=result.body.message;
                }
            });
        },
        remove(id,index){
            //点击删除，把store传递过来的id删除,同时通过index 把当前goodList对应的商品删除
            this.goodslist.splice(index,1);
            this.$store.commit("removeFormCar",id);

        },
        selectedChanged(id,val){
            //每次点击开关，把最新状态同步到store
            // console.log(id+"----"+val);
            this.$store.commit("updateGoodsSelected",{id,selected:val});
        }
    //      changeSelected(id,selected){
    //     //调用mutations中的方法，修改商品的选中状态
    //     console.log(id,selected);
    //     this.$store.commit('changeSelected',{id:id,selected:selected});
    //   }
        },
        components:{
            numbox
        }
    }
</script>

<style lang="scss" scoped>
        .shopcar-container{
            background-color: #fff;
            overflow: hidden;
               .jiesuan{
             display:flex;
             justify-content: space-between;
             align-items: center;
             .red{
                 color: red;
                 font-size: 14px;
             }
            
         }
            .goods-list{
             .mui-card-content-inner{
                 display:flex;
                 justify-content: space-between;
             }
             img{
                 width: 60px;
                 height: 60px;
             }
             h1{
                 font-size: 16px;
             }
             .info{
                .price{
                    color: red;font-weight: bold;
                }
         }
           
         
            }

       
     
        
         
        }
</style>