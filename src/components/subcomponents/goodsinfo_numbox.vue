<template>
    <!-- 可以使用watch属性监听，来监听父组件传递过来的max值 -->
    
                <div class="mui-numbox" data-numbox-min='1'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1"
                    @change="countChanged" ref="numbox" />
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
                <!-- 子组件传递数据给父组件 -->
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
    export default{
        mounted() {
            // 初始化数字选择框
            mui(".mui-numbox").numbox();
        },
        methods:{
            countChanged(){
                //每当文本框数据修改时候，把数据传递给父组件
                // console.log(this.$refs.numbox.value);
                this.$emit("getcount",parseInt(this.$refs.numbox.value));
            }
        },
        props:["max"],
        // watch:{
        //     //属性监听
        //     'max':function(newVal,oldVal){
        //         mui(".mui-numbox").numbox().setOption('max',newVal);
        //     }
        // }

    }
</script>

<style lang="scss" scoped>

</style>
