<template>
    <div class="bt-pass-block">
        <!-- 文案提示 -->
        <slot name="text"></slot>
        <!--密码输入框-->
        <div class="input-block">
            <div  class="wrapper" @click="hideShowPsw"><img :id="ids.imgId" :src="imgSrc"></div>
            <input type="tel" ref="input" class="demo_input" :class="{'show': addShow}"
            v-model="currentValue"
            :id="ids.inputId"
            :placeholder="placeholder"
            :maxlength="maxlength"
            onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
             @touchstart="handleTouch($event)"
             @input="handleInput($event)"
             @focus="handleFocus($event)"
             @blur="handleBlur($event)"/>
        </div>
    </div>
</template>
<script>
import imgSrc from "../../images/lazada_close.png"
import imgSrc1 from "../../images/lazada_open.png"
/**
 * bt-input
 * @module components/input
 * @param {string} [placeholder] - 占位符
 * @param {string} [text] - 文案提示
 * @param {Boolen} [label] - label
 * @param {string} [value] - input是值
 * @param {Number} [maxlength] - 最大长度
 * @param {function} [back] - 返回事件(on)
 * @param {Object}[ids] -输入框和img的ids
 * @example
 * <bt-input placeholder="" ids=""></bt-input>
 */
export default {
    name: 'input',
    props: {
        placeholder: String,
        text: {
            type: String,
            default: '请设置交易密码'
        },
        ids: {
            type: Object,
            default: function (){
                return {
                    imgId: 'imgId',
                    inputId: 'inputId'
                }
            }
        },
        label :{
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number,
            default: 6
        },
        // value: {
        //     type: [String, Number],
        //     default: ''
        // },
    },
    data () {
            return  {
                addShow: false,
                imgSrc: imgSrc,
                imgSrc1: imgSrc1,
                currentValue: '',
                isShow: false
            }
        },
    methods: {
        //兼容移动端调取数字键盘 暗纹、明文显示
        handleTouch(event) {
            var demoInput = $('#'+this.ids.inputId)
            demoInput.prop('type','tel')
            this.addShow = !this.isShow
            this.$emit('on-touch',event)
        },
        handleInput (event) {
            let value = event.target.value
            value = value.replace(/[^\d]/g,'')
            if(value.length > this.maxlength) value = value.slice(0,this.maxlength)
            this.currentValue = value
            this.$emit('input', value)
        },
        handleFocus (event) {
            this.handleTouch(event)
            this.$emit('on-focus', event);
        },
        handleBlur (event) {
            this.$emit('on-blur', event);
        },
        hideShowPsw(){
            var demoImg = document.getElementById(this.ids.imgId)
            var demoInput = $('#'+this.ids.inputId)
            if (!this.isShow) {
                this.addShow = false
                demoInput.prop('type','text')
                this.isShow = true
                demoImg.src = imgSrc1
            }else {
                this.addShow = true 
                demoImg.src = imgSrc
                this.isShow = false
            }
        }
    },
    watch: {
        // value (val){
        //     this.currentValue = val
        //     console.log(2,val, this.currentValue)
        // }
    },
    mounted() {
        let channelId = this.$store.state.baitiao.channelId
    }
   
}
</script>

<style lang="less" scoped>
    .bt-pass-block{
        width: 311px;
        height: 40px;
        margin: 0 auto;
        p{
            font-size: 14px;
            margin-bottom: 8px;
            text-align: left;
        }
        .input-block{
            position: relative;
            width: 100%;
            border: 1px solid #dadada;  
            padding-right:60px;
            height: 40px;
            vertical-align: middle;
            .demo_input{
                width: 85%; 
                font-size: 14px;
                line-height: 36px;
                padding-left: 0;
                padding-top: 2px;
            }
            .show{
                text-security:disc;
                -webkit-text-security:disc;
                -mox-text-security:disc;/*使用指定形状代替文字显示 circle圆圈 disc 圆形 square 正方形*/ 
                // text-security:none;
                // -webkit-text-security:none;
                // -mox-text-security:none;/*使用指定形状代替文字显示 circle圆圈 disc 圆形 square 正方形*/ 
            }
            input:focus {  
                outline: none;  
            }
            //为了去掉在type为number时，右边的上下箭头
            input::-webkit-outer-spin-button,            
            input::-webkit-inner-spin-button{ 
                -webkit-appearance: none !important;
            }
            input[type="number"]{-moz-appearance:textfield;}
            /*显示隐藏密码图片*/
            .wrapper{
                position: absolute;
                right: 0;
                top: 15px;
                width: 60px;
                height: 50px; 
                &>img{
                width: 16px;
                height: 10px; 
                margin: 0 auto;
                vertical-align: top;   
            }
            }
        }
    }
</style>

