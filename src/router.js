import VueRouter from 'vue-router'


//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'

import MemberContainer from './components/tabbar/MemberContainer.vue'

import SearchContainer from './components/tabbar/SearchContainer.vue'

import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'

import newslist from './components/news/newslist.vue'

import newsdetail from './components/news/newsdetail.vue'

import PhotoList from './components/photos/Photolist.vue'

import Photoinfo from './components/photos/Photoinfo.vue'

import GoodsList from './components/goods/GoodsList.vue'

import GoodsInfo from './components/goods/GoodsInfo.vue'

import GoodsDesc from './components/goods/GoodsDesc.vue'

import GoodsComment from './components/goods/GoodsComment.vue'

//创建路由对象
var router=new VueRouter({
    routes:[ //配置路由规则
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/search',component:SearchContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newsdetail/:id',component:newsdetail},
        {path:'/home/photolist',component: PhotoList},
        {path:'/home/photoinfo/:id',component:Photoinfo},
        {path:'/home/goodslist',component:GoodsList},
        {path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
        {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},
    ],
    linkActiveClass:'mui-active' //覆盖默认路由高亮的类
})

//把路由对象暴露出去
export default router 