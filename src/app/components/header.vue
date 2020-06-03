<template>
    <div>
        <header class="bt-header qg-box">
            <div class="bt-header-left qg-box">
                <slot name="left">
                    <div @click="handleBack" qg-log="返回" class="bt-header-back" v-if="options.back">
                    </div>
                    <div @click="shutDown" qg-log="关闭" class="bt-header-close" v-if="options.close">
                    </div>
                </slot>
            </div>
            <div class="qg-flex-1">
                <p  class="bt-header-title" v-text="title"></p>
            </div>
        </header>
        <div class="static-header"></div>
    </div>
</template>
<script>
/**
 * bt-header
 * @module components/header
 * @desc 按钮
 * @param {string} [title] - 标题
 * @param {function} [back] - 返回事件(on)
 * @param {Boolean} [search] - 关闭事件()
 * @param {slot}[left] - 左侧
 * @param {slot}[right] - 右侧
 * @example
 * <bt-header back='' close=''>头部</bt-header>
 */
export default {
    name: 'header',
    props: {
        options: Object,
        title: String,
        back: Function,
    },
    data () {
        return {
            channelId: 1
        }
    },
    methods: {
        //返回
        handleBack () {
            this.$router.go(-1)
        },
        //关闭
        shutDown () {}
    },
    computed: {
        
    },
    mounted () {
        this.channelId = this.$store.state.baitiao.channelId
    }
}
</script>
<style lang="less" scoped>
@import "../../styles/_var.less";
.static-header {
    width: 100%;
    height: @header-default-height;
}

.bt-header {
    position: fixed;
    // background-color: @bt-header-color;
    background-color: #fff;
    text-align: center;
    height: @header-default-height;
    width: 100%;
    max-width: 640px;
    line-height: @header-default-height;
    border-bottom: 1px solid #e6e6e6;
    z-index: 100;
    .bt-header-title {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        // color: #fff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: @font-size-button;
    }
    .bt-header-left {
        .bt-header-back {
            margin-left: 15px;
            height: 20px;
            width: 20px;
            background-image: url("../../images/BACK2.png");
            background-position: center;
            background-size: 12px 16px;
            background-repeat: no-repeat;
        }
        .bt-header-close{
            margin-left: 12px;
            height: 20px;
            width: 20px;
            background-image: url("../../images/CLOSE2.png");
            background-position: center;
            background-size: 15px 16px;
            background-repeat: no-repeat;
        }
    }
    
}

</style>
