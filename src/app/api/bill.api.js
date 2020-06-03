import axios from '../service/http.service'
import config from '../config'
const ApiBaseUrl = config.env.ApiBaseUrl + '/ex'
module.exports = {
    //获取已出账/未出账详情
    getDetailInfo (params) {
        return axios.get(`${ApiBaseUrl}/repay/getDetailInfo`, {params: params})
    },
    //获取账单详情:本月消费额+本月剩余应还+本月已还+本月账单总额+本月账单金额明细（历史分期+本月消费）
    getBillDetail (params) {
        return axios.get(`${ApiBaseUrl}/bill/getBillDetail`, {params: params})
    },
    //获取指定账单的分期详情
    getInstallmentDetail (params) {
        return axios.get(`${ApiBaseUrl}/bill/getInstallmentDetail`, {params: params})
    },
    //获取已出账单列表
    getBillList (params) {
        return axios.get(`${ApiBaseUrl}/bill/getBillList`, {params: params})
    }
}