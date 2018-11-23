//入口文件
import Vue from 'vue'

//按需导入Mint-UI组件

//导入MUI样式
import './lib/mui/css/mui.min.css'

import 'mint-ui/lib/style.css';

import { Header } from 'mint-ui';

Vue.component(Header.name, Header);

//导入APP跟组件
import app from './app.vue'

var vm=new Vue({
  el:'#app',
  render:c =>c(app)
})