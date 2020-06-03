<!-- 已出账\未出账 -->
<template>
    <div class="bill-box" :class="billObj">
        <div v-if="isHave" class="bill-detail"  v-for="(items,parentIndex) in billList" :key="parentIndex">
                <p class="year" :class="{'no-border':parentIndex==0}">{{items.year}}</p>
                <div class="infor" v-for="(item,childIndex) in items.list" :key="childIndex"  @click="goBill(item.status,item.billId)">
                    <div class="left">
                        <p>{{billListText.monthBill}}{{item.month}}</p>
                        <p>{{item.startDate}}-{{item.endDate}}</p>
                    </div>
                    <div class="right">
                        <p>{{item.billAmount}}</p>
                        <p :class="{'warning': item.status==0,'error':item.status==2}">{{billListText.status[item.status]}}</p>
                        <i class="icon"></i>
                    </div>
                </div>
        </div>
        <div v-if="!isHave" class="no-bill">
            <div class="img"></div>
            <p>{{billListText.noBill}}</p>
        </div>
    </div>
</template>

<script>
import billApi from '../../api/bill.api'
export default {
    data () {
        return {
            isHave: false,
            billListText: {
                monthBill: 'Tagihan pada bulan ',//月账单
                noBill: 'Tidak ada informasi penagihan~',//暂无账单信息
                status: {
                    0: 'Menunggu pembayaran',//待还款
                    1: 'Telah dilunasi',//已还清
                    2: 'Terlambat',//已逾期
                },
            },
            billObj: {},
            billList: [],
            channelId: ''
        }
    },

    components: {},

    computed: {},

    methods: {
        selectTab(index){
            this.curTabIdx = index
        },
        //获取账单列表
        getBillList() {
            billApi.getBillList({channelId: this.channelId}).then( res => {
                this.billList =  res.data
                this.isHave = this.billList.length > 0
            })
        },
        //去账单页，包括待还款、已逾期、已还清三种状态
        goBill(status,billId) {
            this.$router.push({path:'/monthRepayBill',query: {status: status,billId: billId, isShow: 0}})
        },
    },
    mounted () {
        let channelId = this.$store.state.baitiao.channelId
        this.billObj = {
            'lazada-bill-box': channelId == this.STATICDATA.channelIds.LAZADA,
            'sepus-bill-box': channelId == this.STATICDATA.channelIds.SEPUS
        }
        this.channelId = channelId
        this.getBillList()
    }
}

</script>
<style lang='less' scoped>
@import "../../../styles/_var.less";
    .bill-box{
        .bill-detail{
            .year{
                height: 32px;
                line-height: 14px;
                color: @rekening-virtual-color;
                padding: 9px 24px;
                background: #F9F9F9;
                border-top: 1px solid @border-blue;
                border-bottom: 1px solid @border-blue;
                font-weight:30;
            }
            .no-border{
                border-top-color: transparent;
            }
            .infor{
                display: -webkit-flex;
                display: flex;
                justify-content: space-between;
                padding: 24px 0;
                margin: 0 24px;
                border-bottom: 1px solid @border-blue;
                margin-bottom: -1px;//合并边框
                .left,.right{
                    p:first-child{
                        font-weight: 40;
                        font-size: @font-size-medium;
                        line-height: @font-size-medium;
                        margin-bottom: 8px;
                    }
                    p:nth-child(2){
                        color: @font-color-white;
                        font-size: @font-size-small;
                        line-height: @font-size-small;
                    }
                }
                .right{
                    text-align: right;
                    padding-right: 18px; 
                    position: relative;
                    .icon{
                        position: absolute;
                        right: 0;
                        top: 10px;
                        width: 10px;
                        height: 18px; 
                        background: url('../../../images/jiantou1.png') no-repeat;
                        background-size: 10px 18px;
                    }
                    p:nth-child(2).warning{
                        color: @bt-button-color;
                    }
                    p:nth-child(2).error{
                        color: #FF0000;
                    }
                }
            }
        }
        .no-bill{
            padding-top: 100px;
            text-align: center;
            .img{
                width: 50px;
                height: 51px;
                margin: 0 auto;
                background: url('../../../images/noLimit.png') no-repeat;
                background-size: 50px 51px; 
                margin-bottom: 24px;
            }
            p{
                font-weight: 30;
                margin-bottom: 80px;
            }
        }       
    }
    .lazada-bill-box{
        .bill-detail{
            .year{
                color: @lazada-text-color;
            }
            .infor{
                .right{
                    p:nth-child(2).warning{
                        color: @bt-button-color;
                    }
                }
            }
        }
    }
    .sepus-bill-box{
        .bill-detail{
            .year{
                color: @sepus-button-color;
            }
            .infor{
                .right{
                    p:nth-child(2).warning{
                        color: @sepus-button-color;
                    }
                }
            }
        }
    }
</style>