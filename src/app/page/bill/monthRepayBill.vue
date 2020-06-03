<!--本月应还/月账单  -->
<template>
    <div :class="monthBillObj">
        <div class="bill-box" v-if="isShow">
            <div class="bill-title">
                <p @click="selectTab(index)" v-for="(item,index) in billText.tabs" :key="index"  :class="{'on': curTabIdx == index}">{{item}}</p>
            </div>
        </div>
        <!-- ======================================已出账==================================== -->
        <div v-if="curTabIdx==0 || !isShow">
            <!-- 已出账账单已出 -->
            <div v-if="isOut">
                <!-- 顶部已还清、待还款、已逾期三种状态展示 -->
                <div class="shouldRepay-top">
                    <!-- <router-link to="/question">
                        <i class="help"></i>
                    </router-link>  -->
                    <div class="middle">
                        <!-- 待还款 -->
                        <div v-show="billDetailDTO.status==0">
                            <p>{{billText.residue[0]}}{{billDetailDTO.month}}{{billText.residue[1]}}</p>
                            <p class="topay-money">{{billDetailDTO.toPayTotal}}</p>
                            <p class="footer">{{billText.deadLine}}<span class="warning">{{billDetailDTO.repayDate}}</span></p>
                        </div>
                        <!-- 已还清 -->
                        <div v-show="billDetailDTO.status==1">
                            <img src="../../../images/success.png" alt="" class="ok">
                            <p class="footer">{{billText.clear}}</p>
                        </div>
                        <!-- 已逾期 -->
                        <div v-show="billDetailDTO.status==2">
                            <p>{{billText.residue[0]}}{{billDetailDTO.month}}{{billText.residue[1]}}</p>
                            <!-- //待还总额和应还的逾期费用 -->
                            <p class="topay-money" @click="openInfo">{{billDetailDTO.toPayTotal}}
                                 <i class="icon"></i>
                                 <!-- <span class="overdueAmount">({{billText.toPayOverdue}}{{billDetailDTO.toPayOverdue}})</span></p> -->
                            <p class="footer"><span class="error">{{billText.overdure[0]}}</span>{{billText.overdure[1]}}</p>
                        </div>
                    </div>
                </div>
                <modal :title="billText.toPayOverdue" :button="billText.button" :open="infoOpen" name='openModal'>
                    <div class="container" slot="body" >
                        <h3>Rp{{billDetailDTO.toPayOverdue}}</h3>
                    </div>
                </modal>
                <!-- 有退款、还款金额、分期金额的显示 -->
                <div class="shouldRepay-middle" v-if="billDetailDTO.amountList.length>0">
                    <div class="line"></div>
                    <div v-for="(item,index) in billDetailDTO.amountList" :key="index">
                        <bt-order :item="item"></bt-order>
                    </div>
                </div>
                <!-- 本月订单总数，金额总数 -->
                <p v-if="billDetailDTO.count" class="title">{{billText.monthCount[0]}}{{billDetailDTO.count}}{{billText.monthCount[1]}}{{billDetailDTO.billAmount}}</p>
                <div class="shouldRepay-footer">
                    <div v-for="(item,index) in billDetailDTO.billInstallmentListDTOs" :key="index">
                        <bt-order :item="item" @click="detail(item.id)"></bt-order>
                    </div>
                    <div v-for="(item,index) in billDetailDTO.orders" :key="index">
                        <bt-order :item="item"></bt-order>
                    </div>
                </div>
            </div>
            <!-- 已出账账单未出 -->
            <div v-else>
                <div class="no-bill">
                    <div class="img"></div>
                    <p>{{billText.noBill}}</p>
                </div>
            </div>
        </div>
        <!-- =================================未出账单============================================= -->
        <div  v-if="curTabIdx==1 && isShow">
            <!-- 顶部待还款一种状态展示 -->
            <div class="shouldRepay-top">
                <!-- <router-link to="/question">
                        <i class="help"></i>
                </router-link>  -->
                <div class="middle">
                    <!-- 待还款（最后还款日） -->
                    <div>
                        <p>{{billText.residue[0]}}{{nonBillDetailDTO.month}}{{billText.residue[1]}}</p>
                        <p class="topay-money">{{nonBillDetailDTO.toPayTotal}}</p>
                        <p class="footer">{{billText.deadLine}}<span class="warning">{{nonBillDetailDTO.repayDate}}</span></p>
                    </div>
                </div>
            </div>
            <!-- 有退款、还款金额的显示 -->
            <div class="shouldRepay-middle" v-if="nonBillDetailDTO.amountList.length>0">
                <div class="line"></div>
                <div v-for="(item,index) in nonBillDetailDTO.amountList" :key="index">
                    <bt-order :item="item"></bt-order>
                </div>
            </div>
            <!-- 本月订单总数，金额总数 -->
            <p v-if="nonBillDetailDTO.count" class="title">{{billText.monthCount[0]}}{{nonBillDetailDTO.count}}{{billText.monthCount[1]}}{{nonBillDetailDTO.billAmount}}</p>
            <div class="shouldRepay-footer">
                <div v-for="(item,index) in nonBillDetailDTO.billInstallmentListDTOs" :key="index">
                    <bt-order :item="item" @click="detail(item.id)"></bt-order>
                </div>
                <div v-for="(item,index) in nonBillDetailDTO.orders" :key="index">
                    <bt-order :item="item"></bt-order>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qgFooter from '../../components/footer.vue'
import btOrder from '../../components/accountList.vue'
import billApi from '../../api/bill.api'
import commonApi from '../../service/common.service'
import moment from 'moment'
import {mapState} from 'vuex'
export default {
    data () {
        return {
            isShow: false,
            curTabIdx: 0,
            isOut: false,//是否出账
            // 以后做国际化使用
            billText: {
                tabs: ['Sudah dikirim', 'Belum dikirim'],//['已出账', '未出账']
                clear: 'Jumlah tagihan bulan ini telah lunas',//本月账单已还清
                overdure: ['Tagihan jatuh tempo',', segara lakukan pembayaran'],//['已逾期',',请尽快还款']
                deadLine: 'Tanggal pembayaran terakhir ',//最后还款日
                residue: ['Sisa tagihan di bulan ',' juga harus dilunasi（Rp）'],//月剩余应还
                refundAmount: 'Pengembalian dana pada bulan ',//月退款金额
                repayTotal: 'Pelunasan pada bulan ',//月已还款金额
                currentMonthAmount: 'Jumlah cicilan pada bulan ',//月已分期金额
                repayOverdue: 'Biaya Keterlambatan sebesar Rp',//包含逾期费
                monthCount: ['Terdapat ' , ' tagihan untuk bulan ini, Rp'],//['月账单共','笔，Rp']
                installRecords:[ 'Cicilan Bulan ke-','Periode tagihan'],//['年','月分期','账单分期']
                noBill: 'Tidak ada informasi penagihan~',//暂无账单信息
                toPayOverdue: 'Biaya Keterlambatan sebesar ',//包含逾期费用
                button: [{text: 'sudah tahu'}]
            },
            status: '1',
            //已出账单
            billDetailDTO: {
                orders: [],//本期账单订单列表
                billInstallmentListDTOs: [],//本期账单分期列表,
                repayTotal: 0, //已还总额
                repayOverdue: 0,//已还逾期费
                toPayTotal: 10000,//待还总额
                toPayOverdue: 0,//待还逾期费
                currentMonthAmount: 0,//本月已分期金额
                billAmount: 0,//账单金额
                refundAmount: 0,//本月退款金额
                count: 0,//本月账单笔数
                status: 2,//账单状态
                year: 2018,//	账单年
                month: 4,//账单月
                repayDate: "-",//最后还款日,
                //格式化
                amountList: []
            },
            //未出账单
            nonBillDetailDTO: {
                orders: [],
                billInstallmentListDTOs: [],
                repayTotal: 0,
                repayOverdue: 0,
                toPayTotal: 0,
                toPayOverdue: 0,
                currentMonthAmount: 0,
                billAmount: 0,
                refundAmount: 0,
                count: 0,
                status: 0,
                year: 2018,
                month: 5,
                repayDate: "-",
                amountList: []
            },
            styleObj: {
                borderBottom: 0
            },
            billId: '',//账单id
            monthBillObj: {},
        }
    },

    components: {
        qgFooter, btOrder
    },

    computed: {
         ...mapState({
            infoOpen : state => state.qg.modal.openModal
        })
    },

    methods: {
        close() {
            this.$store.dispatch('closeModal', 'openModal')
        },
        openInfo() {
            this.$store.dispatch('openModal', 'openModal')
        },
        //切换已出账、未出账tab
        selectTab(index){
            this.curTabIdx = index
            this.$store.commit('CHANGE_TABINDEX', index)
        },
        //对应已出账、未出账数据的统一处理
        dataHandle(type, res) { //type: 1、已出账 2、已出账和未出账   res: 返回的数据
            //已出账、未出账信息
            let billDetailDTO = {}
            let nonBillDetailDTO = {}
            if(type === 2) {
                billDetailDTO = res.billDetailDTO || {}
                nonBillDetailDTO = res.nonBillDetailDTO || {}
            } else {
                billDetailDTO = res
            }
            if (Object.keys(billDetailDTO).length > 0){ //已还清的时候只要未出账
                this.isOut = true
                //账单金额、待还总额、待还逾期费
                billDetailDTO.toPayOverdue = commonApi.amountFormat(billDetailDTO.toPayOverdue)
                billDetailDTO.toPayTotal = commonApi.amountFormat(billDetailDTO.toPayTotal)
                billDetailDTO.billAmount = commonApi.amountFormat(billDetailDTO.billAmount)
                //是否有退款、已还、已分期金额
                billDetailDTO.amountList =  [
                    {
                        leftTop: this.billText.refundAmount + billDetailDTO.month,
                        rightTop: commonApi.amountFormat(billDetailDTO.refundAmount)
                    },
                    {
                        leftTop: this.billText.repayTotal + billDetailDTO.month,
                        rightTop: commonApi.amountFormat(billDetailDTO.repayTotal),
                        rightDown: billDetailDTO.repayOverdue ? this.billText.repayOverdue + commonApi.amountFormat(billDetailDTO.repayOverdue) : ''
                    },
                    {
                        leftTop:  this.billText.currentMonthAmount + billDetailDTO.month,
                        rightTop: commonApi.amountFormat(billDetailDTO.currentMonthAmount)
                    },
                ]
                if (!billDetailDTO.repayOverdue) delete billDetailDTO.amountList[1].rightDown
                //月账单-分期账单列表
                var list1 = [],order1 = []
                billDetailDTO.billInstallmentListDTOs.forEach(item => {
                    list1.push({
                        leftTop: `${this.billText.installRecords[0]}${item.month} ${item.year}`, //2018年3月分期: Cicilan Bulan ke-3 2018
                        leftDown: `[${item.currentPeriod}/${item.periods}]${this.billText.installRecords[1]}`,
                        rightTop: commonApi.amountFormat(item.amount),
                        isMore: true,
                        id: item.id
                    })
                })
                billDetailDTO.billInstallmentListDTOs = list1
                //月账单-未分期订单列表
                billDetailDTO.orders && billDetailDTO.orders.forEach(item => {
                    order1.push({
                        leftTop: item.description,
                        leftDown: moment(item.ctime).format('YYYY-MM-DD HH:mm'),
                        rightTop: commonApi.amountFormat(item.amount)
                    })
                })
                billDetailDTO.orders = order1
                this.billDetailDTO = billDetailDTO
            }
            
            if (type === 2) {
                var list2 = [],order2 = []
                nonBillDetailDTO.toPayTotal = commonApi.amountFormat(nonBillDetailDTO.toPayTotal)
                nonBillDetailDTO.billAmount = commonApi.amountFormat(nonBillDetailDTO.billAmount)
                nonBillDetailDTO.amountList =  [
                    {
                        leftTop: this.billText.refundAmount + nonBillDetailDTO.month,
                        rightTop: commonApi.amountFormat(nonBillDetailDTO.refundAmount)
                    },
                    {
                        leftTop: this.billText.repayTotal + nonBillDetailDTO.month,
                        rightTop: commonApi.amountFormat(nonBillDetailDTO.repayTotal),
                        rightDown: nonBillDetailDTO.repayOverdue ? this.billText.repayOverdue + commonApi.amountFormat(nonBillDetailDTO.repayOverdue) : ''
                    },
                ]
                nonBillDetailDTO.billInstallmentListDTOs.forEach(item => {
                    list2.push({
                        leftTop: `${this.billText.installRecords[0]}${item.month} ${item.year}`,
                        leftDown: `[${item.currentPeriod}/${item.periods}]${this.billText.installRecords[1]}`,
                        rightTop: commonApi.amountFormat(item.amount),
                        isMore: true,
                        id: item.id
                    })
                })
                nonBillDetailDTO.billInstallmentListDTOs = list2
                nonBillDetailDTO.orders.forEach(item => {
                    order2.push({
                        leftTop: item.description,
                        leftDown: moment(item.ctime).format('YYYY-MM-DD HH:mm'),
                        rightTop: commonApi.amountFormat(item.amount)
                    })
                })
                nonBillDetailDTO.orders = order2
                this.nonBillDetailDTO = nonBillDetailDTO
            }
        },
        //获取已出账信息（从账单列表跳转过来查看账单详情-不显示tab）
        getBillInfor() {
            billApi.getBillDetail({billId: this.billId}).then( res => {
                this.dataHandle(1, res.data)
            })
        },
        //获取已出账和未出账信息(从首页的下月应还、本月应还跳转过来-显示tab)
        getDetailInfo () {
            billApi.getDetailInfo({channelId: this.$store.state.baitiao.channelId}).then( res => {
                this.dataHandle(2, res.data)       
            })
        },
        //查看账单分期详情
        detail(id) {
            this.$router.push({path: '/stagingBill',query: {id: id}})
        },
        //初始化
        getInitData () {
            let channelId = this.$store.state.baitiao.channelId
            this.monthBillObj = {
                'lazada-month-bill': channelId == this.STATICDATA.channelIds.LAZADA,
                'sepus-month-bill': channelId == this.STATICDATA.channelIds.SEPUS
            }
            let query = this.$route.query
            //控制当前tab的切换位置
            this.curTabIdx = this.$store.state.baitiao.tabIndex
            this.isShow = query.isShow - 0 //转化为数字
            this.billId = query.billId || ''
            this.billId ? this.getBillInfor() : this.getDetailInfo()
        }
    },

    mounted () {
        this.getInitData()
    }
}

</script>
<style lang='less' scoped>
@import "../../../styles/_var.less";
    .bill-box{
        padding: 18px 0;
        height: 51px;
        .bill-title{
            p{
                display: inline-block;
                height: 33px;
                width: 50%;
                font-weight: bold;
                padding-bottom: 19px;
                line-height: 14px;
                text-align: center;
                color: #999999;
                border-bottom: 1px solid @border-blue;
                &.on{
                    color: @rekening-virtual-color;
                    border-bottom: 2px solid @rekening-virtual-color;
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
    .container{
        text-align: center;
        h3{
            color: #333;
        }
    }     
    .shouldRepay-top{
        padding: 32px 0;
        min-height: 154px;
        position: relative;
        text-align: center;
        .help{
            position: absolute;
            right: 8px;
            top: 8px;
            width: 50px;
            height: 50px;
            background: url('../../../images/help.png') no-repeat;
            background-size: 18px 18px;
            background-position: 50% 50%;
        }
        .middle{
            width: 80%;
            min-height: 82px;
            margin: 0 auto;
            .ok{
                width: 45px;
                height: 45px;
            }
            p{
                font-size: 12px;
                color: @font-color-black;
            }
            p:first-child{
                color: @font-color-white;
                font-weight: 40;
            }
            h1{
                margin-top: 12px;
                font-size: 30px;
                line-height: 30px;
            }
            .footer{
                margin-top: 16px;
                font-size: 12px;
                color: #999999;
                font-weight: 40;
            }
            .warning{
                color: @bt-button-color;
                font-weight: bold;
            }
            .error{
                color: #E54949;
                font-weight: bold;
            }
            .topay-money{
                font-size: 30px;
                line-height: 30px;
                font-weight: 40;
                margin-top: 12px;
                position: relative;
                .icon{
                    position: absolute;
                    top: 1px;
                    width: 50px;
                    height: 50px;
                    margin-left: 2px;
                    line-height: 14px;
                    vertical-align: middle;
                    background: url('../../../images/detail.png') no-repeat;
                    background-size: 12px 12px;
                }
            }
            .overdueAmount{
                font-size: 12px;
                font-weight: 1;
                line-height: 18px;
                vertical-align: middle;
                color: #999999;
            }
        }
    }
    .shouldRepay-middle{
        .line{
            height: 16px;
            background: #F9F9F9;
            border-top: 1px solid @border-blue;
            border-bottom: 1px solid @border-blue;
            // box-shadow:  0px 0px 2px rgba(0, 0, 0, 0.2);
        }
    }
    .title{
        height: 32px;
        line-height: 14px;
        text-align: center;
        color: @rekening-virtual-color;
        padding: 9px 24px;
        background: #F9F9F9;
        border-top: 1px solid @border-blue;
        border-bottom: 1px solid @border-blue;
        font-weight:30;
        font-size:@font-size-small;
    }
    .shouldRepay-footer{
        margin-bottom: 40px;
    }
    .lazada-month-bill{
        .bill-title{
            p{
                &.on{
                    color: @lazada-text-color;
                    border-bottom: 2px solid @lazada-text-color;
                }
            }
        }
        .shouldRepay-top{
            .middle{
                .warning{
                    color:@lazada-button-color
                }
            }
        }
        .title{
            color: @lazada-text-color;
        }
    }
    .sepus-month-bill{
        .bill-title{
            p{
                &.on{
                    color: @sepus-button-color;
                    border-bottom: 2px solid @sepus-button-color;
                }
            }
        }
        .shouldRepay-top{
            .middle{
                .warning{
                    color:@sepus-button-color
                }
            }
        }
        .title{
            color: @sepus-button-color;
        }
    }
    
</style>