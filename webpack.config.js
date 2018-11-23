
var path = require('path');
var VueLoaderPlugin = require("vue-loader/lib/plugin.js");
module.exports = {
  mode: "development",
  //指定打包的入口
  entry:"./src/main.js",
  //指定打包的出口文件（bundle.js）
  output:{
    path:path.join(__dirname,'dist'), //指定打包后的文件目录
    filename:'bundle.js' //指定打包后的文件
  },
  module:{
    //rules匹配文件的规则 交给loader处理

    rules:[
      //通过正则  use顺序 从右到左
      {
        test: /\.css$/,
        use:[{
          loader: 'style-loader'
        },{
          loader: 'css-loader'
        }
        ]
      },
      //生成唯一的hash值 生成指定长度8
      {
        test:/\.(jpg|png|gif|bmp|jpeg)$/,
        loader: 'url-loader',
        options:{
          limit:500,
          name: '[hash:8]-[name].[ext]'
        }
      },
      {
        //配置加载字体文件的loader器
        test:/\.(ttf|ttf2|woff|woff2|svg|eot)$/,
        use:['url-loader']
      },
      {
        
        test:/\.js$/,
        use:['babel-loader'],
        exclude:/node_modules/   
      },
      {
        test:/\.vue$/,
        use:['vue-loader']
      },
      {
        test:/\.scss$/,
        use: ['style-loader','css-loader','sass-loader']
      }


      // {test:/\.css$/,use:['style-loader','css-loader']},
      //匹配图片
      // {test:/\.(png|jpg|bmp|jpeg|gif)$/,use:['url-loader']},
      //匹配字体文件
      // {test:/\.(ttf|svg|woff|woff2|eot)$/,use:['url-loader']}
      ]
  },
  resolve:{
    //修正导入vue路径时候的问题
    alias:{
      "vue$":"vue/dist/vue.js"
    }
  },
  plugins:[
    new VueLoaderPlugin()  //实例vue-loader的实例对象，为了加载.vue组件
  ]
}
