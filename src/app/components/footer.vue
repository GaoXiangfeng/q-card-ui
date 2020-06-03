<!-- footer -->
<template>
    <div>
        <!-- text -->
        <div class="success-footer" :class="channelFooter" v-if="copyRight">
          &copy; 2018 Qworks 
        </div>
        <!-- 按钮 -->
        <div class="code-footer" v-if="isShow">
        <qg-button :text="text" class="active-button" :disabled="isDisabled" :class="channelLazadaBt" @click="clickFn"></qg-button>
        </div>
    </div>
</template>

<script>
/**
 * bt-footer
 * @module components/footer
 * @param {string} [text] - 按钮文案
 * @param {Boolean} [isShow] - 是否显示
 * @param {Boolean} [copyRight] - 是否显示
 * @param {Boolean} [isDisabled] - 是否可点击
 * @param {function} [click] - 点击事件(on)
 * @example
 * <bt-footer text='' :active="">头部</bt-footer>
 */
export default {
    name: 'footer',
    props: {
        text: {
            type: String,
            default: ''
        },
        active: Function,
        isShow: {
            type: Boolean,
            default: false
        },
        copyRight: {
            type: Boolean,
            default: false
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
    },
    data () {
        return {
            channelId: 1,
            channelFooter: {},
            channelLazadaBt:{}
        }
    },

    components: {},

    computed: {

    },

    methods: {
        clickFn () {
            this.$emit('click')
        },
        getColorByChannelId(channelId) {
            const channelIds = this.STATICDATA.channelIds
            this.channelFooter = {
                'channel-lazada-footer': channelId == channelIds.LAZADA,
                'channel-sepus-footer': channelId == channelIds.SEPUS
            }
            this.channelLazadaBt = {
                'channel2-button': channelId == channelIds.LAZADA,
                'channel-sepus-button': channelId == channelIds.SEPUS,
            }
        }
    },

    mounted () {
        this.channelId = this.$store.state.baitiao.channelId
        this.getColorByChannelId(this.channelId)
    }
}

</script>
<style lang='less' scoped>
@import "../../styles/_var.less";
    .code-footer{
        position: fixed;
        bottom: 0;
        max-width: 640px;
        width: 100%;
        .active-button{
            width: 100%;
            height: 50px;
            background: @bt-button-color;
            border-radius: 0;
        }
        .channel2-button{
            background: @bt-button-color;
        }
        .channel-sepus-button{
            background: @sepus-button-color;
        }
    }
    .success-footer{
        position: fixed;
        bottom: 20px;
        left: 0;
        right: 0;
        color: @rekening-virtual-color;
        font-size: 10px;
        font-weight: 30;
    }
    .channel-lazada-footer{
        color: @lazada-text-color;
    }
    .channel-sepus-footer{
        color: @sepus-button-color;
    }
</style>