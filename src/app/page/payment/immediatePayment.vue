<!-- 立即支付 -->
<template>
  <div class="pay-box" :class="payObj">
      <div class="pay-top">
            <p class="f-12">{{payText.limit}}</p>
            <p class="f-30">{{freeAmount}}</p>
      </div>
      <div class="pay-number">
          <span>{{payText.amount}}</span> <span>{{orderAmount}}</span>
      </div>
      <div class="pay-number">
          <span>{{payText.type}}</span> <span>Q Card</span>
      </div>
      <!-- 支付协议暂时没有 -->
      <!-- <div class="pay-agree">
          {{payText.agree[0]}} 
          <router-link to="/payAgreement">
            <a href="javascript:void(0)">{{payText.agree[1]}}</a>
          </router-link>
      </div> -->
      <div id="myinput" :class="{'ios-modal': isIos}" v-if="open">
        <modal :title="payText.modalTitle" :open="open">
            <div class="passContainer" slot="body">
                <!-- 密码框  注意调整letter-spacing -->
                <input id="enter" type="tel" @input="handleKeyUp($event, 6)"
             onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
             @focus="onFocusFn($event)" class="password" v-model="form.password">    
                <!-- 使用6个div模拟6个框框 -->
                <div class="passItem" :id="'key'+item" v-for="item in 6" :key="item"></div>
            </div>
        </modal>
      </div>
      <qg-footer v-show="noResize" :text="payText.footerText" :isShow="true" @click="pay"></qg-footer>
  </div>
</template>

<script>
import qgFooter from '../../components/footer.vue'
import payApi from '../../api/activeOrPay.api'
import commonService from '../../service/common.service'
import {Toast} from "qg-vue-components2"
import dataService from "../../service/static-data.service"
export default {
    data () {
        return {
            noResize: true,
            payText: {
                limit: 'Jumlah kredit yang tersedia （Rp）',//可以额度
                amount: 'Jumlah transaksi(Rp)',//交易金额
                type: 'Metode Pembayaran',//付款方式
                footerText: 'Konfirmasi',//立即支付\确认
                modalTitle: 'Kata sandi pembayaran',//支付密码
                agree: [],//'支付代表同意','服务协议'
                limitPrompt: 'Saldo kredit tidak mencukupi~'//余额不足
            },
            open: false,
            isTrue: true,
            len: 0,
            form: {
                orderId: '',
                password: '' 
            },
            freeAmount: 0,
            orderAmount: 0,
            payObj: {},
            fullHeight: document.body.clientHeight,
            originHeight: document.body.clientHeight,
            isIos: false
        }
    },

    components: {
        qgFooter
    },

    computed: {},

    methods: {
        //立即支付
        pay () {
            if (this.isTrue) {
                Toast(this.payText.limitPrompt)
                return
            }
            this.open = true
        },
        onFocusFn(event) {
            //解决苹果浏览器把文本顶上去的bug
            document.body.scrollTop = 0
            this.isIos = dataService.isIOS
        },
        handleKeyUp (event, maxlength) {
            let value = event.target.value
            value = value.replace(/[^\d]/g,'')
            if(value.length > maxlength) value = value.slice(0,maxlength)
            this.form.password = value
            if (this.form.password.length > this.len) {
                this.len = this.form.password.length
                $('#key'+[this.form.password.length]).addClass('box-border')
            } else {
                $('#key'+[this.len]).removeClass('box-border')
                this.len = this.form.password.length
            }
            if(this.form.password.length === 6) {
                document.getElementById('enter').blur()
                let params = JSON.parse(JSON.stringify(this.form))
                setTimeout( () => {
                    this.form.password = ''
                    this.isIos = false
                }, 500)
                payApi.payDo(params).then( res => {
                    switch (res.businessCode) {
                        case '0000': //支付成功
                            this.open =  false
                            this.$router.replace({path: '/paymentSuccess'})
                            break
                        case '3002': //重复支付
                            Toast(res.msg)
                        case '4001': //订单失效
                            this.open =  false
                            this.$router.replace({path:'/orderFaild'})
                            break
                        case '4002': //支付失败（用户存在逾期）
                            this.open =  false
                            Toast(res.msg)
                            this.$router.replace({path: '/paymentFaild'})
                            break
                    }
                }) 
            }
        },
        //获取可用额度和交易金额
        getAmount() {
            payApi.payInfo({orderId: this.form.orderId}).then( res => {
                if (res.businessCode === '0107') {
                    //额度未激活或不可用	
                    this.$router.replace({path: '/noLimit'})
                    return
                }
                res = res.data
                this.isTrue = res.freeAmount < res.orderAmount
                this.freeAmount = commonService.amountFormat(res.freeAmount)
                this.orderAmount = commonService.amountFormat(res.orderAmount)
            })
        }
    },
    watch: {
        //监听文档高度，键盘弹起，底部按钮弹起的修复
        fullHeight (val) {
            this.fullHeight = val
            if (val < this.originHeight) {
                this.noResize = false
                this.isIos = dataService.isIOS
            } else {
                this.noResize = true
            }
        }
    },
    mounted () {
        this.form.orderId = this.$route.query.orderId || ''
        this.getAmount()
        let channelId = this.$store.state.baitiao.channelId
        this.payObj = {
            'lazada-pay-box': channelId == this.STATICDATA.channelIds.LAZADA,
            'sepus-pay-box': channelId == this.STATICDATA.channelIds.SEPUS
        }
        const that = this
        // window.onresize = () => {
        //     return (() => {
        //         window.fullHeight = document.body.clientHeight
        //         that.fullHeight = window.fullHeight
        //     })()
        // }
    }
}

</script>
<style lang='less'>
@import "../../../styles/_var.less";
    .pay-box{
        margin-top: 43px;
        text-align: center;
        .pay-top{
            margin: 0 24px;
            border-bottom: 1px solid @border-gray;
        }
        .f-12{
            font-size: @font-size-small;
            line-height: 17px;
            color: @font-color-white;
            margin-bottom: 8px;
        }
        .f-30{
            font-size: 30px;
            line-height: 30px;
            color: @font-color-black;
            margin-bottom: 44px;
            font-weight: 900;
        }
        .pay-number{
            display: -webkit-flex;
            display:flex;
            padding: 19px 0;
            margin: 0 24px;
            justify-content: space-between;
            border-bottom: 1px solid @border-gray;
            padding-bottom: 15px;
            font-size:@font-size-normal;
            color: @font-color-black;
        }
        .pay-agree{
            font-size: 12px;
            word-spacing: 0.17;
            text-align: left;
            margin-top: 12px;
            margin-left: 24px;
            a{
                color: @rekening-virtual-color;
            }
        }
    }
    .ios-modal{
        .qg-modal{
            position: absolute;
            top: 30%;
        }  
    }
    .passContainer {
        border-radius: 6px;
        width: 290px;
        height: 50px;
        padding: 0;
        position: relative;
        input {
            width: 110%;
            height: 35px;
            background-color: transparent;
            background: transparent;
            position: absolute;
            border: none;
            padding: 10px;
            outline: none;
            font-size: 25px;
            line-height: 100%;
            font-family: "courier new", sans-serif;
            letter-spacing: 30px;
            text-align: left;
            text-overflow: hidden;
            caret-color: #C74745;
        }
        //为了去掉在type为number时，右边的上下箭头
        input::-webkit-outer-spin-button,            
        input::-webkit-inner-spin-button{ 
            -webkit-appearance: none !important;
        }
        input[type="number"]{-moz-appearance:textfield;}
        .password{
            -webkit-text-security: disc;
            text-security: disc;/*使用指定形状代替文字显示 circle圆圈 disc 圆形 square 正方形*/ 
        }
    }
    .passItem {
        width: 35px;
        height: 35px;
        line-height: 35px;
        float: left;
        margin-right: 10px;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }
    .passItem:last-child {
        margin-right: 0;
    }

    
    .box-border{
        border:1px solid #464B53;
    }
    #myinput .qg-modal .qg-modal-header{
        font-size: @font-size-large;
        line-height: 25px;
    }
    #myinput .qg-modal .qg-modal-footer{
        color: @bt-button-color;
        font-weight: 40;
    }
    .lazada-pay-box{
        .pay-agree{
            a{
                color: @lazada-text-color;
            }
        }
        .passContainer{
            input{
               caret-color:@lazada-button-color; 
            }
        }
    }
    .sepus-pay-box{
        .pay-agree{
            a{
                color: @sepus-button-color;
            }
        }
        .passContainer{
            input{
               caret-color:@sepus-button-color; 
            }
        }
    }
        

</style>