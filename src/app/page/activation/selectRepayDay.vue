<!-- 选择还款日 -->
<template>
    <div class="select-repay-box">
        <div class="title">
            <p>{{selectRepayText.title}}</p>
        </div>
        <bt-order :item="selectRepayText.content" @click="showDateActionSheet"></bt-order>
        <p class="infor" :class="inforObj">{{selectRepayText.infor}}</p>
        <qg-picker @select="selectDay" :cancelTxt="selectRepayText.cancelTxt" :confirmTxt="selectRepayText.confirmTxt" name="dateActionSheet" :open="open" :picker="selectRepayText.datePicker"></qg-picker>
        <bt-footer :text="selectRepayText.buttonText" :isDisabled="!repayDay || isSubmit" @click="active" :isShow="true" ></bt-footer>
    </div>
</template>
<script>
import btOrder from '../../components/accountList'
import btFooter from '../../components/footer'
import activeApi from '../../api/activeOrPay.api'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            isSubmit: false,
            selectRepayText: {
                title: 'Pilih jadwal pelunasan Anda',//请选择还款日
                day: ['setiap bulan',' Tanggal '],//每月几日
                content: {
                    leftTop: 'Tanggal pelunasan',//还款日
                    rightTop: '',
                    isMore: true
                },
                datePicker: {
                    title: 'Pilih periode',//选择时间
                    data: [],
                    defaultIndex: []
                },
                cancelTxt: 'Batal',//取消
                confirmTxt: 'Konfirmasi',//确定
                infor: 'Hari ini, jatuh tempo pelunasan Anda',//该日期为您使用白条支付后，每月的最后还款日期
                buttonText: 'Aktifasi',//激活
            },
            inforObj: {},
            repayDay: ''
        }
    },

    components: {
        btOrder, btFooter
    },

    computed: {
        ...mapState({
            open:state=>state.qg.picker.dateActionSheet
        })
    },

    methods: {
        showDateActionSheet() {
            this.$store.dispatch("openPicker","dateActionSheet")
        },
        selectDay(result) {
            this.repayDay = result.name
            this.selectRepayText.content.rightTop = this.selectRepayText.day[0]  + this.selectRepayText.day[1] + result.name
            this.selectRepayText.datePicker.defaultIndex[0] = result
        },
        active () {
            this.isSubmit = true
             setTimeout( () => {
                this.isSubmit = false
            }, 3000)
            activeApi.setRepayDay({repayDay: this.repayDay}).then( res => {
                this.$router.push({name: 'auth-controller'})
            })
        }
    },

    mounted () {
        var day = []
        for (let i = 0; i < 28; i++) {
            day.push({
                value: i,
                name: i + 1 
            })
        }
        this.selectRepayText.datePicker.data = [day]
        let channelId = this.$store.state.baitiao.channelId
        this.inforObj = {
            'lazada-infor': channelId == this.STATICDATA.channelIds.LAZADA,
            'sepus-infor': channelId == this.STATICDATA.channelIds.SEPUS
        }
    }
}

</script>
<style lang='less' scoped>
@import '../../../styles/_var.less';
    .select-repay-box{
        .title{
            text-align: center;
            padding: 0 24px;
            p{
                height: 100px;
                font-size: 22px;
                font-weight: 40;
                line-height: 20px;
                padding: 40px 0;
                border-bottom: 1px solid #E6E6E6;
            }
        }
        .infor{
            color: @rekening-virtual-color;
            font-size: 12px;
            margin-top: 12px;
            padding: 0 24px;
            font-weight: 30;
        }
        .lazada-infor{
            color: @lazada-text-color;
        }
        .sepus-infor{
            color: @sepus-button-color;
        }
    }
</style>