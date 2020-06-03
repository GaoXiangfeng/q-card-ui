<!-- 首页 -->
<template>
    <div class="bt-home" :class="btHomeObj">
        <div class="bt-limit">
            <!-- <div class="q-head">
               
            </div> -->
            <router-link to="/setting">
                <p class="setting"></p>
            </router-link>
            <router-link to="/question">
                <p class="helping"></p>
            </router-link>
            <!-- 额度 -->
            <div class="bt-limit-top">
                <p class="font-12">{{homeText.limit}}</p>
                <p class="font-30">{{freeAmount}}</p>
            </div>
            <div class="bt-limit-bottom">
                <!-- 本月应还、下月应还 -->
                <router-link :to="whereToGo" style="width: 50%">
                    <div class="left">
                    <p class="font-18">{{homeText.amount}}</p>
                    <p class="font-12">{{homeText.text}}</p>
                </div>
                </router-link>
                <div class="middle"></div>
                <!-- 全部账单 -->
                <router-link to="/billList" style="width: 50%">
                    <div class="right">
                        <p class="font-18" style="font-weight:bold">{{homeText.totalBills}}</p>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="prompt font-12">
            <span v-if="repaying">{{homeText.repay[1]}}<span class="red">{{homeText.date}}</span></span>
            <span v-if="nextrRepaying">{{homeText.nextRepay[1]}}<span class="red">{{homeText.nextDate}}</span></span>
            <span v-if="overdure">{{homeText.overdure[0]}}<span style="color: #FF0000;font-weight: bold">{{homeText.overdure[1]}}</span>{{homeText.overdure[2]}}</span>
        </div>
        <div class="line"></div>
        <div class="repay-guide-box">
            <div class="percent-title">
                <span></span> <Strong>Rekening Virtual</Strong>
            </div>
            <div class="percent-content" v-for="(item,index) in bankList" :key="index">
                <span :class="{'isAndroid': isAndroid}">•</span>
                <div class="bank-info">
                    <p class="bank-name">{{item.bankCode}}</p>
                    <p class="bank-num">
                        <span v-for="(bank,index) in item.bankAccount" :key="index">{{bank}}</span>
                    </p>
                </div>
            </div> 
        </div>
        <qg-footer :text="homeText.footerText" :isShow="true" @click="repay"></qg-footer>
    </div>
</template>

<script>
import qgFooter from '../components/footer.vue'
import homeApi from '../api/activeOrPay.api'
import billApi from '../api/bill.api'
import commonApi from '../service/common.service'
import dataService from "../service/static-data.service"
export default {
  data () {
    return {
        homeText: {
            limit: 'Jumlah kredit yang tersedia（Rp）',//可用额度
            repay: ['Tagihan bulan ini','Tagihan sudah dibuat,mohon dibayar sebelum '],//['本月应还','账单已出，请于','前还款',]
            nextRepay: ['Tagihan bulan depan','Tagihan bulan depan akan dihasilkan dalam '],//下月应还、下月账单将于  生成
            totalBills: 'Semua tagihan',//全部账单
            date: '5-25',
            nextDate: '5-15',
            overdure: ['Tagihan',' jatuh tempo ',', segara lakukan pembayaran'],//Tagihan jatuh tempo, segara lakukan pembayaran'您的账单','已逾期',',请尽快还款'
            footerText: 'Bayar sekarang',//立即还款
            text: 'Tagihan bulan depan',//下月应还
            amount: '0'
        },
        repaying: false,
        nextrRepaying: false,
        overdure: false,
        bankList: [
            {
                bankCode: 'BNI',
                bankAccount: [100,344,89]
            }
        ],
        whereToGo: {path:'/monthRepayBill',query: {curTabIdx: 1}} , //下一步跳转
        freeAmount: 0,
        btHomeObj: {},
        isAndroid: false
    }
  },

  components: {
      qgFooter
  },

  computed: {},

  methods: {
        //拆分账户号码
        accountNumFormat (num) {
            var arr = []
            for(let i = 0; i < num.length; i+=4) {
                arr.push(num.substring(i,i+4))
            }
            return arr
        },
        //获取本月应还/下月待还入口
        getIndexInfor () {
            homeApi.indexInfor().then( res => {
                if (res.businessCode === '0107') {
                    //额度未激活或不可用	
                    this.$router.replace({path: '/noLimit'})
                    return
                }
                res = res.data
                //对额度处理
                this.freeAmount = commonApi.amountFormat(res.freeAmount)
                let repayInfo = res.repayInfo
                //跳转处理
                switch(repayInfo.whereToGo) {
                    case 1:
                        this.whereToGo = '/billList' //* 1:有历史逾期,跳转账单列表
                        break;
                    case 2:
                        this.$store.commit('CHANGE_TABINDEX', 0)
                        this.whereToGo = {path:'/monthRepayBill',query: {isShow: 1}} //* 2:无历史逾期,本期未还清,跳转已出账页
                        break;
                    case 3:
                        this.$store.commit('CHANGE_TABINDEX', 1)
                        this.whereToGo = {path:'/monthRepayBill',query: {isShow: 1}} //* 3:本期已还清,跳转未出账页
                        break;
                }
                //状态处理
                switch(repayInfo.status) {
                    case 1:
                        this.homeText.text = this.homeText.repay[0] //* 1:已逾期,显示"账单已逾期"字样
                        this.overdure = true
                        break;
                    case 2:
                        this.homeText.text = this.homeText.repay[0] //* 2:未逾期,未还清,显示"请于XX时间还款"字样
                        this.repaying = true
                        this.homeText.date = repayInfo.date
                        break;
                    case 3:
                        this.homeText.text = this.homeText.nextRepay[0] //* 3:已还清,显示"下月账单将于xx时间生成"字样
                        this.nextrRepaying = true
                        this.homeText.nextDate = repayInfo.date
                        break;
                }
                //对金额处理
                this.homeText.amount = commonApi.amountFormat(repayInfo.amount)
                //还款账户处理
                this.bankList = []
                for(let key in res.vaAccounts){
                    this.bankList.push({
                        bankCode: key,
                        bankAccount: res.vaAccounts[key]
                    })
                }
                this.bankList.forEach(element => {
                    element.bankAccount = this.accountNumFormat(element.bankAccount)
                })
            })
        },
        //还款
        repay () {
            this.$router.push({path: '/repayGuide'})
        }
    },
    mounted () {
        this.getIndexInfor()
        let channelId = this.$store.state.baitiao.channelId
        this.btHomeObj = {
            'lazada-bt-home': channelId == this.STATICDATA.channelIds.LAZADA,
            'sepus-bt-home': channelId == this.STATICDATA.channelIds.SEPUS
        }
        //兼容安卓手机小圆点显示问题
        this.isAndroid = dataService.isAndroid
    }
}

</script>
<style lang='less' scoped>
@import "../../styles/_var.less";
    .bt-home{
        height: 600px;
        overflow: scroll;
        .bt-limit{
            width: 100%;
            height: 162px;
            padding: 16px 24px;
            color: #fff;
            font-weight: 30;
            background:-webkit-linear-gradient(10deg,#EA6953,#D55552);
            position: relative;
            .setting{
                position: absolute;
                left: 8px;
                top: 0;
                width: 50px;
                height: 50px;
                background: url('../../images/setting.png') no-repeat;
                background-size: 18px 18px;
                background-position: 50% 50%;
            }
            .helping{
                position: absolute;
                top: 0;
                right: 8px;
                width: 50px;
                height: 50px;
                background: url('../../images/helping.png') no-repeat;
                background-size: 18px 18px;
                background-position: 50% 50%;
            }
            .q-head{
                position: absolute;
                display: -webkit-flex;
                display: flex;
                justify-content: space-between;
                
            }
        }
        .bt-limit-top{
            text-align: center;
            margin-bottom: 29px;
            margin-top: 24px;
        }
        .bt-limit-bottom{
            display: -webkit-flex;
            display: flex;
            justify-content: space-around;
            width: 100%;
            height: 70px;
            padding: 8px;
            background: #fff;
            border-radius: 4px;
            box-shadow:  0px 2px 6px rgba(0, 0, 0, 0.1);
            .left,.right{
                // width: 50%;
                text-align: center;
                &>.font-18{
                    color: @font-color-black;
                    font-weight: bold;
                    letter-spacing: .3px;
                }
                &>.font-12{
                    color: @font-color-white;
                    margin-top: 8px;
                    text-align: center;
                    letter-spacing: .1px;
                }
                
            }
            .right>.font-18{
                margin-top: 19px;
            }
            .middle{
                position: absolute;
                left: 49%;
                width: 1px;
                height: 54px;
                background: #e6e6e6;
            }

        }
        .font-12{
            font-size: 12px;
            opacity: .7;
            line-height: 12px;
        }
        .font-18{
            font-size: 18px;
            margin-top: 10px;
            line-height: 18px;
            letter-spacing: 0.18;
        }
        .font-30{
            font-size: 30px;
            margin-top: 12px;
            line-height: 30px;
            font-weight: bold;
        }
        .prompt{
            margin: 47px auto 24px auto;
            text-align: center;
        }
        .red{
            color: #e66233;
            font-weight: bold;
        }
        .line{
            height: 8px;
            background: #F9F9F9;
        }
        .repay-guide-box{
            padding: 0 24px;
            .percent-title{
                color: @rekening-virtual-color;
                font-size: 14px;
                line-height: 14px;
                margin-bottom: 25px;
                margin-top: 24px;
                span{
                    display: inline-block;
                    width: 4px;
                    height: 18px;
                    line-height: 18px;
                    border-radius: 1px;
                    vertical-align: middle;
                    background: @rekening-virtual-color;
                    margin-right: 8px;
                    margin-bottom: 2px;
                }
            }
            .percent-content{
                margin-left: 10px;
                margin-bottom: 16px;
                &>span{
                    display: inline-block;
                    color: @rekening-virtual-color;
                    margin-right: 8px;
                    vertical-align:top;
                    height: 42px;
                    line-height: 42px;
                    font-size: 18px;
                }
                &>.isAndroid{
                    font-size: 28px;
                }
                .bank-info{
                    display: inline-block;
                    p.bank-name{
                        font-size: @font-size-small;
                        color: @font-color-white;
                        line-height: 12px;
                        margin-bottom: 10px;
                        font-weight: 30;
                    }
                    p.bank-num{
                        color: @font-color-gray;
                        font-size: @font-size-large;
                        line-height: 18px;
                        font-weight: 40;
                        span{
                            margin-right: 10px;
                        }
                    }
                }
            }
            .last{
                margin-bottom: 0;
            }
        }
        .code-footer{
            position: fixed;
            bottom: 0;
            max-width: 640px;
            width: 100%;
            .active-button{
                width: 100%;
                height: 50px;
                background: #e66233;
                border-radius: 0;
            }
        }
    }
    //lazada渠道主题色
    .lazada-bt-home{
        .bt-limit{
            background:-webkit-linear-gradient(10deg,#003F54,#179AB5);
        }
        .red{
            color: @lazada-button-color;
        }
        .repay-guide-box{
            .percent-title{
                color: @lazada-text-color;
                span{
                    background: @lazada-text-color;
                }
            }
            .percent-content{
                &>span{
                    color: @lazada-text-color;
                }
            }
        }
    }
    //lazada渠道主题色
    .sepus-bt-home{
        .bt-limit{
            background: @sepus-button-color;
        }
        .red{
            color: @sepus-button-color;
        }
        .repay-guide-box{
            .percent-title{
                color: @sepus-button-color;
                span{
                    background: @sepus-button-color;
                }
            }
            .percent-content{
                &>span{
                    color: @sepus-button-color;
                }
            }
        }
    }
</style>