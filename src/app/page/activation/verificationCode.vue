<!-- 获取验证码 -->
<template>
  <div class="code-content">
      <p class="code-info">{{verificationText.message}}</p>
      <p class="code-phone"><span>{{phoneNum[0]}}</span> <span>{{phoneNum[1]}}</span> <span>{{phoneNum[2]}}</span> <span>{{phoneNum[3]}}</span></p>
      <div class="code-middle-infor">
        <div class="code-input-area" @click="scrollTo(0)">
            <input type="tel" class="code-box"  @input="handleKeyUp($event, 4)"
             onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
             :placeholder="verificationText.placeholder"  v-model="submitForm.smsCode" />
            <qg-button :text="verificationText.code" @click="getImageCode" :disabled="isDisabled"
            class="code-button" :class="channelButton"></qg-button>
        </div>
        <div class="password-block">
            <div @click="scrollTo(40)"><bt-input  :ids="ids1" :addShow="addShow1" :isShow="eyeShow1" :maxlength="maxlength" 
            @input="inputFn1(maxlength)" v-model="submitForm.password" 
            :placeholder="verificationText.text1" class="bt"></bt-input></div>
            <div @click="scrollTo(80)"><bt-input  :ids="ids2" :addShow="addShow2" :isShow="eyeShow2" :maxlength="maxlength" 
            @input="inputFn2(maxlength)" v-model="submitForm.confirmPwd" 
            :placeholder="verificationText.text2" class="bt"></bt-input></div>
        </div>

        <div class="code-agree" :class="codeAgreeStyle">
            <span @click="selected=!selected"><span class="agree-select" :class="checkStyle" ></span>
            {{verificationText.agree[0]}}</span>
            <router-link to="/serviceAgreement">
                <a href="javascript:void(0)">{{verificationText.agree[1]}}</a>
            </router-link>
        </div>
      </div>
      <div :class="{'ios-modal': isIos}" v-if = "imgOpen">
          <modal :title="verificationText.modalTitle" :open="imgOpen">
            <div class="container" slot="body">
                <input type="text" class="enter-code" @focus="onFocusFn($event)"  @keyup="keyUpFn" v-model="messageForm.imageCode" oninput="if(value.length>4) value=value.slice(0,4)">
                <div  @click="refresh">
                    <img :src="imageCodeUrl" alt="">
                    <p>{{verificationText.refresh}}</p>
                </div>
                <i class="close" @click="close"></i>
            </div>
        </modal>
      </div>
      <qg-footer class="footer" v-show="noResize" :text="verificationText.footerText" :isShow="true" :isDisabled="isSubmit|| !submitForm.smsCode||!submitForm.password||!submitForm.confirmPwd||!selected" @click="active"></qg-footer>
  </div>
</template>

<script>
import qgFooter from '../../components/footer.vue'
import btInput from '../../components/input.vue'
import {Toast} from "qg-vue-components2"
import activeApi from '../../api/activeOrPay.api'
import imageCodeUrl from  '../../../images/img-code.png'
import Cookies from '../../service/cookieStorage.service'
import dataService from "../../service/static-data.service"
export default {
    data () {
        return {
            addShow1: false,
            eyeShow1: false,
            addShow2: false,
            eyeShow2: false,
            noResize: true,
            isSet: false,
            imgOpen: false,
            isDisabled: false,
            isSubmit: false,
            imageCodeUrl: imageCodeUrl,//图片验证码base64
            //获取短信验证码form表单
            messageForm: {
                phoneNo: '',
                imageCode: '',
                imageCodeId: '',
            },
            //设置交易密码
            submitForm: {
                smsCode: '', //短信验证码
                password: '', //交易密码
                confirmPwd: '',
            },
            selected: false,
            channelId: this.$store.state.baitiao.channelId,
            phoneNum: [],
            verificationText: {
                placeholder: ' 4 digit',//4位数字
                message: 'Kirim kode verifikasi SMS ke nomor ini',//短信验证码将发送到这个号码
                code: 'Konfirmasi kode',//获取验证码
                text: 'Konfirmasi kode',//获取验证码
                text1: 'Masukkan 6 digit kata sandi',//请设置6位数字交易密码
                text2: 'Silakan konfirmasi kata sandi',//请再次确认支付密码
                text3: 'Sandi pembayaran 6 digit baru',//请设置新的6位数字交易密码
                footerText: 'Langkah selanjutnya',//下一步
                modalTitle: 'Kode verifikasi gambar',//请输入图片验证码
                refresh: 'Refresh',//点击刷新
                agree: ['membaca dan menyetujui','Perjanian Layanan'],//我已阅读并同意,服务协议membaca dan menyetujui perjanjian layanan
                passLenError: 'Kata sandi pembayaran adalah 6 digit~',//密码长度不足6位
                passDiff: 'Konfirmasi sandi pembayaran tidak cocok~'//两次密码不一致
            },
            ids1: {
                imgId: 'imgId1',
                inputId: 'inputId1'
            },
            ids2: {
                imgId: 'imgId2',
                inputId: 'inputId2'
            },
            maxlength: 6,
            //白条额度状态
            condition: '',
            channelButton: {},
            codeAgreeStyle: {},
            checkStyle: {
                'isSelect': false,
                'doku-check': false,
                'lazada-check': false,
                'sepus-check': false,
            },
            fullHeight: document.body.clientHeight,
            originHeight: document.body.clientHeight,
            isIos: false
        }
    },

    components: {
        btInput,qgFooter
    },

    computed: {},

    methods: {
        handleKeyUp(event,maxlength) {
            let value = event.target.value
            value = value.replace(/[^\d]/g,'')
            if(value.length > maxlength) value = value.slice(0,maxlength)
            this.submitForm.smsCode = value
            if (value.length === 4){
                $('#' + this.ids1.inputId).focus()
                this.scrollTo(40)
            }
        },
        scrollTo(height) {
            document.body.scrollTop = height;
        },
        inputFn1(len) {
            if (this.submitForm.password.length === len){
                $('#' + this.ids2.inputId).focus()
                this.scrollTo(80)
            }
        },
        inputFn2(len) {
            if (this.submitForm.confirmPwd.length === len){
                $('#' + this.ids2.inputId).blur()
            }
        },
        //拆分电话号码
        phoneNumFormat (num) {
            let phoneNum = []
            for(let i = 0; i < num.length; i+=4) {
                phoneNum.push(num.substring(i, i + 4))
            }
            return phoneNum
        },
        //获取图片验证码
        getImageCode () {
            this.imgOpen = true
            activeApi.getImgCode().then(res => {
                let data = res.data
                this.imageCodeUrl = "data:image/png;base64," + data.image
                this.messageForm.imageCodeUrl = data.image
                this.messageForm.imageCodeId = data.imageCodeId
            })
        },
        //倒计时
        countDown (waitingTime) {
            let printLoading = (n) => {
                if (n) {
                    this.verificationText.code = n + 's'
                    setTimeout(() => {
                        printLoading(n - 1)
                    }, 1000);
                } else {
                    this.verificationText.code = this.verificationText.text;
                    this.isDisabled = false;
                }
            }
            printLoading(parseInt(waitingTime, 10));
        },
        //获取短信验证码
        getMessageCode (params) {
            activeApi.getMessageCode(params).then( res => {
                //图片验证码正确，给用户发送短信，同时关闭modal，清空内容
                this.imgOpen = false
                this.isDisabled = true
                this.countDown('120')
            })
        },
        //图片验证码获取焦点
        onFocusFn(event) {
            //解决苹果浏览器把文本顶上去的bug
            document.body.scrollTop = 0
            this.isIos = dataService.isIOS
        },
        //图片验证码输入四位后调取接口
        keyUpFn() {
            if (this.messageForm.imageCode.length === 4) {
                //获取后端短信验证码接口
                let params = JSON.parse(JSON.stringify(this.messageForm))
                this.refresh()
                setTimeout( () => {
                    this.messageForm.imageCode = ''
                }, 500)
                this.getMessageCode(params)   
            }
        },
        //点击刷新
        refresh() {
            //重新获取图片验证码
            this.getImageCode()
        },
        
        //设置交易密码
        setPassword() {
            let params = JSON.parse(JSON.stringify(this.submitForm))
            delete params.confirmPwd
            params.phoneNo = this.messageForm.phoneNo
            activeApi.setPassword(params).then( res => {
                //后端校验通过，判断是否需要补充资料
                this.close()
                this.removeCookie()
                this.$router.replace({name: 'auth-controller'})  
            })
        },
        //重置密码获取手机号
        getPhoneNo() {
            activeApi.getPhoneNo().then( res => {
                this.messageForm.phoneNo = res.data
                this.phoneNum = this.phoneNumFormat(this.messageForm.phoneNo.toString())
            })
        },
        //重置支付密码
        resetPassword() {
            let params = JSON.parse(JSON.stringify(this.submitForm))
            delete params.confirmPwd
            params.phoneNo = this.messageForm.phoneNo
            activeApi.resetPayPassword(params).then( res => {
                this.close()
                this.removeCookie()
                Toast('Perubahan berhasil')
                this.$router.replace({name: 'setting'})
            })
        },
        close() {
            this.imgOpen = false
            //关闭时 把modal还原50%高度
            this.isIos = false
        },
        active (text) {
            //信息校验
            if (this.submitForm.password.length < 6 || this.submitForm.confirmPwd.length < 6) {
                Toast(this.verificationText.passLenError)
                return
            }
            if (this.submitForm.password !== this.submitForm.confirmPwd) {
                Toast(this.verificationText.passDiff)
                return
            }
            this.isSubmit = true
            //防止用户多次点击
            setTimeout( () => {
                this.isSubmit = false
            }, 3000)
            //前端校验通过，开始请求交易密码的设置接口
            !this.isSet ? this.setPassword() : this.resetPassword()
        },
        //根据渠道切换主题颜色
        changeColorByChannel() {
            let channelIds = this.STATICDATA.channelIds
            this.channelButton = {
                'lazada-channel-button':this.channelId == channelIds.LAZADA,
                'sepus-channel-button':this.channelId == channelIds.SEPUS,
            }
            this.codeAgreeStyle = {
                'lazada-code-agree': this.channelId == channelIds.LAZADA,
                'sepus-code-agree': this.channelId == channelIds.SEPUS,
            }
        },
        //清除Cookie
        removeCookie () {
            Cookies.remove('submitForm')
            Cookies.remove('messageForm')
            Cookies.remove('selected')
        }
    },
    watch: {
        'selected': function(val) {
            let channelIds = this.STATICDATA.channelIds
            this.checkStyle['isSelect'] = val
            this.checkStyle['doku-check'] = val && this.channelId == channelIds.DOKU
            this.checkStyle['lazada-check'] = val && this.channelId == channelIds.LAZADA 
            this.checkStyle['sepus-check'] = val && this.channelId == channelIds.SEPUS
            Cookies.set('selected', val) 
        },
        'submitForm': {
            handler(val) {
                Cookies.set('submitForm', val)
            },
            deep:true
        },
        'messageForm': {
            handler(val) {
                Cookies.set('messageForm', val)
            },
            deep:true
        },
        $route (to, from) {
            if(to.name === "setting") {
                this.$destroy()
                this.removeCookie()
            }
        },
        //监听文档高度，键盘弹起，底部按钮弹起的修复
        fullHeight (val) {
            this.fullHeight = val
            if (val < this.originHeight * 60/100) {
                this.noResize = false
                this.isIos = dataService.isIOS
            } else {
                this.noResize = true
            }
        }
    },
    mounted () {
        this.changeColorByChannel()
        const that = this
        // window.onresize = () => {
        //     return (() => {
        //         window.fullHeight = document.body.clientHeight
        //         that.fullHeight = window.fullHeight
        //     })()
        // }
    },
    //本页面加了缓存，如果从设置页多次跳过时调该钩子函数-需要重新获取手机号
    activated() {
        this.isSet =  this.$route.query.isSet //修改密码
        if(this.isSet) {
            this.verificationText.text1 = this.verificationText.text3
            this.$store.commit('CHANGE_TITLE', 'Reset kata sandi') //重置密码 -title修改
            //需要重新调取接口获取手机号
            this.getPhoneNo()
            if (Cookies.get('submitForm')) this.submitForm = Cookies.get('submitForm')
            if (Cookies.get('messageForm')) this.messageForm = Cookies.get('messageForm')
            if (Cookies.get('selected')) this.selected = Cookies.get('selected')
        }else{
            this.messageForm.phoneNo = Cookies.get('phoneNo') || ''
        }
        this.phoneNum = this.phoneNumFormat(this.messageForm.phoneNo.toString())
    }
}

</script>
<style lang='less' scoped>
@import '../../../styles/_var.less';
    .code-content{
        padding-top:48px;
        text-align: center;
        // position: relative;
        .code-info{
            color:#a3a3a3;
            line-height: 15px;
            font-size: 14px;
            font-weight: 30;
        }
        .code-phone{
            margin-top: 16px;
            line-height: 22px;
            font-size: 22px;
            font-weight: 40;
        }
        .code-middle-infor{
            position: relative;
            width: 311px;
            margin: 0 auto;
            padding-bottom: 100px;
            .code-input-area{
                margin-top: 32px;
                height: 40px;
                .code-box{
                    width: 311px;
                    height: 40px;
                    line-height: 40px;
                    padding-bottom: 4px;
                    font-size: 22px;
                    padding-left: 16px;
                    letter-spacing: 10px;
                    border: 1px solid #dadada;
                    &::-webkit-input-placeholder{
                        font-size: 14px;
                        letter-spacing: 0;
                    }
                }
                .code-button{
                    position: absolute;
                    background: #e66233;
                    border-radius: 2px;
                    width: 40%;
                    top: 0;
                    right: 0;
                    font-size: 14px;
                    z-index: 10;
                }
                .lazada-channel-button{
                    background: @lazada-button-color;
                }
                .sepus-channel-button{
                    background: @sepus-button-color;
                }
            }
            .password-block{
                margin-top: 16px;
                .bt{
                    margin-bottom: 16px;
                }
            }
            .code-agree{
                position: absolute;
                text-align: left;
                left: 0;
                top: 164px;
                font-size: 12px;
                font-weight: 20;
                .agree-select{
                    display: inline-block;
                    margin-bottom: 2px;
                    vertical-align: middle;
                    border-radius: 2px;
                    width: 14px;
                    height: 14px;
                    border: 1px solid #ce514e;
                }
                a{
                    display: inline-block;
                    color:#5092bd;
                    vertical-align: bottom;
                }
                .isSelect{
                    background-image: url("../../../images/doku_agree.png");
                    background-position: center;
                    background-size: 14px 14px;
                    background-repeat: no-repeat;
                }
                .doku-check{
                    background-image: url("../../../images/doku_agree.png");
                }
                .lazada-check{
                    background-image: url("../../../images/lazada_agree.png");
                }
                .sepus-check{
                    background-image: url("../../../images/sepus_agree.png");
                }
                
                
            }
            .lazada-code-agree{
                .agree-select{
                    border: 1px solid @lazada-button-color;
                }
                a{
                    color: @lazada-text-color;
                }
            }
            .sepus-code-agree{
                .agree-select{
                    border: 1px solid @sepus-button-color;
                }
                a{
                    color: @sepus-button-color;
                }
            }
            
        }
        .ios-modal{
            .qg-modal{
                position: absolute;
                top: 30%;
            }  
        }
        .container{
            display: flex;
            .enter-code{
                width: 173px;
                height: 36px;
                border: 1px solid #487BAD;
                border-radius: 2px;
                background: #FDFDFD;
                color: #333333;
                letter-spacing: 2px;
                padding-left: 9px;
                font-size: 25px;
                margin-bottom: 30px;
            }
            img{
                width: 75px;
                height: 35px;
                margin-left: 12px;
            }
            p{
                position: absolute;
                right: 30px;
                top: 108px;
                color: #999999;
                font-size: 12px;
                line-height: 9px;
            }
            .close{
                position: absolute;
                right: 0;
                top: 10px;
                width: 30px;
                height: 30px;
                padding-left: 18px;
                text-align: center;
                background: url('../../../images/CLOSE3.png') no-repeat;
                background-size: 12px 12px;
            }
        }
        .footer{
            position: absolute;
        }   
    }
    .ios-margin{
        margin-top: 650px;
    }
</style>