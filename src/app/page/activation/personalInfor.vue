<!-- 个人信息 -->
<template>
    <div class="person-infor-box" :class="personInforObj">
        <!-- 个人信息 -->
        <div class="infor-title">{{personInforText.personInfo}}</div>
        <div class="input-box">
            <p class="label">{{infor[0].label}}</p>
            <input class="input" type="text" maxlength="60" :disabled="form.realName!== ''&&isSubmitName"  
            :class="{'select-bank':form.realName &&isSubmitName}" :placeholder="infor[0].placeholder" v-model="form.realName"/>
        </div>
        <!-- 身份证号 -->
        <div class="input-box">
            <p class="label">{{infor[1].label}}</p>
            <input class="input" type="tel" @input="handleKeyUp($event, 16, 'idCardNo')"
            onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"  
            :disabled="form.idCardNo!==''&&isSubmitCard"  :class="{'select-bank':form.idCardNo&&isSubmitCard}"  :placeholder="infor[1].placeholder" v-model="form.idCardNo"/>
        </div>
        <!-- 银行名称 -->
        <div class="input-box"  @click="selectBank">
            <p class="label">{{infor[7].label}}</p>
            <a class="input select-contact-color" href="javascript:void(0)" :class="{'select': isSelect3,'select-bank': isSelect3&&isSubmiBank}">{{infor[7].placeholder}} <img  src="../../../images/jiantou3.png" class="icon"></a>
        </div>
        <!-- 银行卡号 -->
        <div class="input-box">
            <p class="label">{{infor[2].label}}</p>
            <input class="input" type="tel"  @input="handleKeyUp($event, 20, 'bankCardNo')"
            onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
            :disabled="form.bankCardNo!==''&&isSubmitNumber"
            :class="{'select-bank':form.bankCardNo&&isSubmitNumber}"  
            :placeholder="infor[2].placeholder" v-model="form.bankCardNo"/>
        </div>
        <!-- 联系人1 -->
        <div class="infor-title">{{personInforText.contact}}1</div>
        <!-- 关系 -->
        <div class="contact">
            <div class="left" @click="showPicker1">
                <div class="input-box">
                    <p class="label">{{infor[3].label}}</p>
                    <p class="input select-contact-color" :class="{'select': isSelect1}">{{infor[3].placeholder}} <img src="../../../images/jiantou3.png" class="icon"></p>
                </div>
            </div>
            <!-- 联系人1姓名 -->
            <div class="right">
                <div class="input-box">
                    <p class="label">{{infor[4].label}}</p>
                    <input class="input" type="text" maxlength="60" :placeholder="infor[4].placeholder" v-model="form.userContactsList[0].realName"/>
                </div>
            </div>
        </div>
        <!-- 联系1人电话 -->
        <div class="input-box">
            <p class="label">{{infor[5].label}}</p>
            <input class="input" type="tel"  @input="handleKeyUp($event, 13, 'phoneNo1')"
            onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
            :placeholder="infor[5].placeholder" v-model="form.userContactsList[0].phoneNo"/>
        </div>
        <!-- 联系人2 -->
        <div class="infor-title">{{personInforText.contact}}2</div>
        <div class="contact">
            <div class="left" @click="showPicker2">
                <div class="input-box">
                    <p class="label">{{infor[6].label}}</p>
                    <p class="input  select-contact-color" :class="{'select': isSelect2}">{{infor[6].placeholder}} <img src="../../../images/jiantou3.png" class="icon"></p>
                </div>
            </div>
            <!-- 联系人2姓名 -->
            <div class="right">
                <div class="input-box">
                    <p class="label">{{infor[4].label}}</p>
                    <input class="input" type="text" maxlength="60" :placeholder="infor[4].placeholder" v-model="form.userContactsList[1].realName"/>
                </div>
            </div>
        </div>
        <!-- 联系人2电话 -->
        <div class="input-box">
            <p class="label">{{infor[5].label}}</p>
            <input class="input" type="tel" @input="handleKeyUp($event, 13, 'phoneNo2')"
            onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
            :placeholder="infor[5].placeholder" v-model="form.userContactsList[1].phoneNo"/>
        </div>
        <qg-picker @select="selectContact1" :cancelTxt="cancelTxt" :confirmTxt="confirmTxt" name="contact1" :open="open1" :picker="contactPicker1"></qg-picker>
        <qg-picker @select="selectContact2" :cancelTxt="cancelTxt" :confirmTxt="confirmTxt" name="contact2" :open="open2" :picker="contactPicker2"></qg-picker>
        <qg-footer v-show="noResize" :text="personInforText.footerText" :isDisabled="isDisabled" @click="sumit" :isShow="true"></qg-footer>
    </div>
</template>

<script>
import btInput from '../../components/input.vue'
import qgFooter from '../../components/footer.vue'
import {mapState} from 'vuex'
import activeApi from '../../api/activeOrPay.api'
import {Toast} from 'qg-vue-components2'
import Cookies from '../../service/cookieStorage.service'
export default {
    data () {
        return {
            noResize: true,
            isSubmitName: false,
            isSubmitCard: false,
            isSubmitNumber: false,
            isSubmiBank: false,
            isDisabled: true,
            cancelTxt: 'Batal',//取消
            confirmTxt: 'Konfirmasi',//确认
            personInforText: {
                phoneDiff: 'Nomor telepon sudah dipakai~',//联系人电话号码重复
                footerText: 'Submit',//提交
                personInfo: 'Informasi Pribadi',//个人信息
                contact: 'Kontak'//联系人
            },
            infor: [
                {
                    label: 'Nama Lengkap',//姓名
                    placeholder: 'Masukkan Nama Anda',//请输入您的姓名
                },
                {
                    label: 'KTP',//身份证号
                    placeholder: 'Silahkan masukkan KTP anda'//请输入您的身份证号
                },
                {
                    label: 'Nomor kartu Bank',//银行卡号
                    placeholder: 'Masukkan nomor kartu Bank Anda'//请输入您的银行卡号
                },
                {
                    label: 'Hubungan',
                    placeholder: 'Pilihan Hubungan',
                },
                {
                    label: 'Nama',//姓名
                    placeholder: 'Nama kontak',//请输入联系人姓名  Nama kontak
                },
                {
                    label: 'Nomor telepon',//电话号码
                    placeholder: 'Silakan masukkan Nomor HP Kontak Anda'//请输入联系人电话号码
                },
                {
                    label: 'Hubungan',//关系
                    placeholder: 'Pilihan Hubungan',//选择关系
                },
                {
                    label: 'Nama Bank',//银行名称
                    placeholder: 'Silakan pilih Nama Bank',//请选择银行名称
                },
            ],
            form: {
                realName: '',
                idCardNo: '',
                bankCode: '',
                bankName: '',
                bankCardNo: '',
                userContactsList: [
                    {
                        realName: '',
                        phoneNo: '',
                        relation: '',
                    },
                    {
                        realName: '',
                        phoneNo: '',
                        relation: '',
                    },
                ]
            },
            contactPicker1: {
                data: [this.STATICDATA.relation],
                defaultIndex: []
            },
            contactPicker2: {
                data: [this.STATICDATA.relation],
                defaultIndex: []
            },
            
            isSelect1: false,
            isSelect2: false,
            isSelect3: false,
            personInforObj: {},
            fullHeight: document.body.clientHeight,
            originHeight: document.body.clientHeight,
            num: 0,
        }
    },

    components: {
        btInput, qgFooter
    },

    computed: {
        ...mapState({
            open1: state => state.qg.picker.contact1,
            open2: state => state.qg.picker.contact2,
        })
    },

    methods: {
        handleKeyUp (event,maxlength, name) {
            let value = event.target.value
            value = value.replace(/[^\d]/g,'')
            if(value.length > maxlength) value = value.slice(0,maxlength)
            if (name == 'phoneNo1') this.form.userContactsList[0].phoneNo = value
            else if (name == 'phoneNo2') this.form.userContactsList[1].phoneNo = value
            else this.form[name] = value
        },
        //选择银行
        selectBank() {
            this.num ++ 
            if (this.form.bankCode && this.isSubmiBank) return
            if (this.num > 1) this.$router.replace({path: '/selectBank'})
            else this.$router.push({path: '/selectBank'})
        },
        showPicker1() {
            this.$store.dispatch("openPicker", 'contact1');
        },
        showPicker2() {
            this.$store.dispatch("openPicker", 'contact2');
        },
        selectContact1(result) {
            this.infor[3].placeholder = result.name
            this.form.userContactsList[0].relation = result.key
            this.isSelect1 = true
            this.contactPicker1.defaultIndex[0] = result
        },
        selectContact2(result) {
            this.infor[6].placeholder = result.name
            this.form.userContactsList[1].relation = result.key
            this.isSelect2 = true
            this.contactPicker2.defaultIndex[0] = result
        },
        //获取用户资料
        getPersonInfor() {
            let makeUpData = Cookies.get('makeUpData') || {}
            for (let items in makeUpData) {
                this.form[items] = makeUpData[items]
                if (this.form[items]) {
                    if (items === 'realName') this.isSubmitName = true
                    if (items === 'idCardNo') this.isSubmitCard = true
                    if (items === 'bankCardNo') this.isSubmitNumber = true
                    if (items === 'bankName') {
                        this.isSubmiBank = true
                        this.isSelect3 = true
                        this.infor[7].placeholder = makeUpData[items]
                    }
                    if (items === 'userContactsList') {
                        for(let j = 0;j< makeUpData[items].length;j++){
                            for(let item of this.STATICDATA.relation){
                                if (item.key == makeUpData[items][j].relation){
                                    this.infor[3*j+3].placeholder = item.name
                                    this['isSelect'+ (j+1)] = true
                                } 
                            }
                            this.form[items][j] = makeUpData[items][j]
                        }
                    }
                }
                
            }
            //判断按钮是否可点
            this.judgmentButton(this.form)
        },

        //queryData
        queryData () {
            //从选择银行页面过来带过来的银行名称
            let query = this.$route.query
            if (query.bank) {
                let bankInfo = JSON.parse(query.bank)
                this.infor[7].placeholder = bankInfo.name
                this.form.bankCode = bankInfo.code
                this.form.bankName = bankInfo.name
                this.isSelect3 = true
            }
            let channelId = this.$store.state.baitiao.channelId
            this.personInforObj = {
                'lazada-person-info': channelId == this.STATICDATA.channelIds.LAZADA,
                'sepus-person-info': channelId == this.STATICDATA.channelIds.SEPUS
            }
        },

        //判断按钮是否可点
        judgmentButton(val) {
            for(let key in val) {
                if(!val[key]) {
                    this.isDisabled = true
                    return
                }
                if (key === 'userContactsList') {
                    let user = val[key]
                    for(let i = 0; i< user.length;i++) {
                        for(let j in user[i]) {
                            if (!user[i][j])  {
                                this.isDisabled = true
                                return
                            }
                        } 
                    }
                }
            }
            this.isDisabled = false
        },
        //提交用户信息
        sumit() {
            if (this.form.userContactsList[0].phoneNo === this.form.userContactsList[1].phoneNo) {
                Toast(this.personInforText.phoneDiff)
                return
            }
            this.isDisabled = true
            //一旦提交，不可点击、防止重复提交
            setTimeout( () => {
                this.isDisabled = false
            }, 3000)
            activeApi.makeUpData(this.form).then( res => {
                Cookies.remove('makeUpData')
                //一旦提交，不可点击、防止重复提交
                this.isDisabled = true
                // 强状态机制
                this.$router.replace({name: 'auth-controller'})
            })
        }
    },
    watch: {
        'form': {
            handler(val) {
                this.judgmentButton(val)
            },
            deep:true
        },
        '$route': 'queryData',
        //监听文档高度，键盘弹起，底部按钮弹起的修复
        fullHeight (val) {
            this.fullHeight = val
            if (val < this.originHeight * 60/100) {
                this.noResize = false
            } else {
                this.noResize = true
            }
        }
    },

    mounted () {
        //获取用户已经填写的资料
        this.getPersonInfor()
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
<style lang='less' scoped>
@import '../../../styles/_var.less';
    .person-infor-box{
        padding-bottom: 70px;
        overflow:scroll;
        -webkit-overflow-scrolling: touch;
        .infor-title{
            height: 32px;
            padding: 9px 24px;
            line-height: 14px;
            font-weight: 30;
            color: @rekening-virtual-color;
            background: #f9f9f9;
            border-bottom: 0.5px solid @border-blue;  
        }
        .input-box{
            min-height: 64px;
            padding: 14px 24px;
            border-bottom: 0.5px solid #DCDCDC;
            .label{
                font-size: 12px;
                line-height: 12px;
                font-weight: 40;
                color: @font-color-black;
            }
            .input{
                display: inline-block;
                width: 95%;
                height: 17px;
                font-size: 14px;
                margin-top: 8px;
                line-height: 17px;
                font-weight: 40;
                position: relative;
                &::-webkit-input-placeholder{
                    color: #B5B5B5;
                    font-weight: 40;
                }
                .icon{
                    width: 7px;
                    height: 13px;
                    position:absolute;
                    top: 0px;
                    right: -10px;
                }
            }
            //为了去掉在type为number时，右边的上下箭头
            input::-webkit-outer-spin-button,            
            input::-webkit-inner-spin-button{ 
                -webkit-appearance: none !important;
            }
            input[type="number"]{-moz-appearance:textfield;}
            .select-contact-color{
                color: #B5B5B5;
            }
            .select{
                color: black;
                font-weight: normal;
            }
            .select-bank{
                color: @font-color-black;
                background: #eeeeee;
                opacity: .5;
            }
        }
        .contact{
            display: flex;
            -webkit-display:flex;
            .left{
                width: 50%;
                border-right: 1px solid @border-blue;
            }
            .right{
                width: 50%;
            }

        }   
    }
    .lazada-person-info{
        .infor-title{
            color: @lazada-text-color;
        }
    }
    .sepus-person-info{
        .infor-title{
            color: @sepus-button-color;
        }
    }
    
    
</style>