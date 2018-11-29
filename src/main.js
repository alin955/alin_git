//入口文件
import Vue from 'vue'

import VueRouter from 'vue-router';
//手动安装vueRouter到Vue身上去
Vue.use(VueRouter);
//按需导入Mint-UI组件

//注册vueX
import Vuex from 'vuex'
Vue.use(Vuex)

  //获取本地存储数据
  var car=JSON.parse(localStorage.getItem('car') || [])

var store = new Vuex.Store({
  state:{
      car:[] //存储商品对象
  },
  mutations:{
        //点击购物车，把商品信息保存store 的car
        addToCar(state,goodsinfo){
          //没有找到对应商品，push到car
      
          var flag=false;

          state.car.some(item => {
            if(item.id==goodsinfo.id){
              item.count+=parseInt(goodsinfo.count)
              flag=true
              return true
            }
          })
        

          if(!flag){
            state.car.push(goodsinfo);
          }
       //更新之后car.把car转换字符串存进本地
       localStorage.setItem('car',JSON.stringify(state.car));

        },
        updateGoodsInfo(state,goodsinfo) {
          //修改购物车数量
          state.car.some(item=>{
            if(item.id == goodsinfo.id){
              item.count =parseInt(goodsinfo.count)
              return true
            }
          })
            //更新之后car.把car转换字符串存进本地
       localStorage.setItem('car',JSON.stringify(state.car));
  
        },
        removeFormCar(state,id){
          //根据id 删除store对应商品的数据
          state.car.some((item,i)=>{
            if(item.id == id){
              state.car.splice(i,1)
              return true;
            }
          })
          localStorage.setItem('car',JSON.stringify(state.car));

        },
        updateGoodsSelected(state,info){
          state.car.some(item=>{
            if(item.id==info.id){
              item.selected=info.selected
            }
          })
          localStorage.setItem('car',JSON.stringify(state.car));
        }
  },
  getters:{
    //计算属性 实现微标值自动更新
    getAllCount(state){
      var c=0;
      state.car.forEach(item=>{
        c += item.count
      })
      return c
    },
    //  如何从购物车获取商品数量，先创建一个空对象，然后循环购物车数据
    // id作为对象属性名,count作为对象的属性值，循环得到一个对象 {} 
    getGoodsCount(state){
      var shop={}
      state.car.forEach(item=>{
        shop[item.id]=item.count
      })
      return shop;
    },
    getGoodsSelected(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o= {
        count:0, //勾选数量
        amount:0  //勾选总价

      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count+=item.count
          o.amount+=item.price*item.count
        }
      })
      return o
    }
   
  }
})

//导入 vue-resoure 
import VueResource from 'vue-resource'
//安装 vue-resoure
Vue.use(VueResource);
//导入vant组件
import { Tab, Tabs } from 'vant';
import 'vant/lib/index.css';
Vue.use(Tab).use(Tabs);
//导入时间的插件
import moment from 'moment'

//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

//设置全局ajax请求
Vue.http.options.root="http://127.0.0.1:3000/";



Vue.http.options.emulateJSON=true;
//导入MUI样式
import './lib/mui/css/mui.min.css'

import './lib/mui/css/icons-extra.css'

import 'mint-ui/lib/style.css';
import './lib/mui/css/golbal.css'

//按需导入Mint-UI组件 
// import { Header,Button } from 'mint-ui';
// import { Swipe, SwipeItem} from 'mint-ui';
// import { Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'


Vue.use(VuePreview)



//导入自己的路由模块
import router from './router.js'


//导入APP跟组件
import app from './app.vue'
// import { stat } from 'fs';
// import { stat } from 'fs';

var vm=new Vue({
  el:'#app',
  render:c =>c(app),
  //挂载路由的对象到VM实例
  router,
  store //挂载store状态管理对象
})