<!-- 月分期账单 -->
<template>
    <div>
        <div class="stag-title">
            <div class="left">
                <p>{{stagBillText.billStag}}</p>
                <p>{{billDetail.currentMonthAmount}}</p>
            </div>
            <div class="middle">
                <p>{{stagBillText.count}}</p>
                <p>{{billDetail.periods}}</p>
            </div>
            <div class="right">
                <p>{{stagBillText.interest}}</p>
                <p>{{billDetail.interest}}</p>
            </div>
        </div>
        <div class="stag-table-title" :class="stagTableObj">
            <p>{{stagBillText.number}}</p>
            <p>{{stagBillText.amount}}</p>
            <p>{{stagBillText.repayDay}}</p>
        </div>
        <div class="stag-table-body">
            <div class="stag-list" v-for="(item,index) in billDetail.installmentListDTOs" :key="index">
                <p>{{item.period}}</p>
                <p>{{item.amount}} 
                    <!-- <i class="icon"></i> -->
                </p>
                <p>{{item.repayDate}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import billApi from '../../api/bill.api'
export default {
    data () {
        return {
            stagBillText: {
                billStag: 'Tagihan cicilan(Rp)',//账单分期
                count: 'Jumlah fase',//分期数
                interest: 'Biaya(Rp)',//手续费
                number: 'Jumlah periode',//期数
                amount: 'Jumlah',//金额
                repayDay: 'Tanggal pelunasan tagihan',//还款日
                monthBillStag: 'Detail tagihan'
            },
            installmentRecordId: '',
            billDetail: {
                currentMonthAmount: '',
                periods: '',
                interest: '',
                year: '',
                month: '',
                installmentListDTOs: []
            },
            stagTableObj: {}
        }
    },

    components: {},

    computed: {},

    methods: {
        //获取指定账单的分期详情
        getInstallmentDetail () {
            billApi.getInstallmentDetail({installmentRecordId: this.installmentRecordId}).then( res=> {
                this.billDetail = res.data
                let title =  this.stagBillText.monthBillStag + this.billDetail.month
                this.$store.commit('CHANGE_TITLE', title)
            })
        }
    },

    mounted () {
        let channelId = this.$store.state.baitiao.channelId
        this.stagTableObj = {
            'lazada-stag-table-title': channelId == this.STATICDATA.channelIds.LAZADA,
            'sepus-stag-table-title': channelId == this.STATICDATA.channelIds.SEPUS
        }
        this.installmentRecordId = this.$route.query.id || ''
        this.getInstallmentDetail()
    }
}

</script>
<style lang='less' scoped>
@import '../../../styles/_var.less';
    .stag-title,.stag-table-title,.stag-list{
        display: flex;
        display: -webkit-flex;
        text-align: center;
        justify-content: space-between;
    }
    .stag-title{
        padding: 18px 24px 20px;
        height: 78px;
        p:nth-child(1){
            font-size: @font-size-small;
            line-height: @font-size-button;
            color: @font-color-white;
            margin-bottom: 7px;
        }
        p:nth-child(2){
            font-size: @font-size-medium;
            line-height: @font-size-medium;
            font-weight: 40;
        }
    }
    .stag-table-title{
        height: 48px;
        background: #F9F9F9;
        border-top: 1px solid @border-blue;
        border-bottom: 1px solid @border-blue;
        color: @rekening-virtual-color;
        font-weight: bold;
        font-size: @font-size-small;
        line-height: 14px;
        padding: 9px 15px 9px 10px;
        p{
            width: 30%;
        }
        p:first-child,:nth-child(2){
            margin-top: 8px;
        }
        p:last-child{
            width: 40%;
        }
    }
    .lazada-stag-table-title{
        color: @lazada-text-color;
    }
    .sepus-stag-table-title{
        color: @sepus-button-color;
    }
    .stag-table-body{
        padding: 0 24px;
        .stag-list{
            height: 60px;
            line-height: 14px;
            padding: 23px 12px 23px 27px;
            border-bottom: 0.5px solid @border-blue;
            font-weight: 40;
            p:nth-child(2){
                margin-left:15px;
                position: relative;
            }
            .icon{
                position: absolute;
                top: 1px;
                right: -18px;
                width: 12px;
                height: 12px;
                margin-left: 2px;
                line-height: 14px;
                vertical-align: middle;
                background: url('../../../images/detail.png') no-repeat;
                background-size: 12px 12px;
            }
        }
    }
</style>