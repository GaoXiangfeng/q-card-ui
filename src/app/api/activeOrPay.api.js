import axios from '../service/http.service'
import config from '../config'
const ApiBaseUrl = config.env.ApiBaseUrl
const activeOrPayBaseUrl = ApiBaseUrl + '/ex'
module.exports = {
    //获取图片验证码
    getImgCode() {
        return axios.get(`${activeOrPayBaseUrl}/validate/imageCode`)
    },
    //获取短信验证码
    getMessageCode (params) {
        return axios.get(`${activeOrPayBaseUrl}/validate/smsCode`, {params: params})
    },
    //设置交易密码
    setPassword (params) {
        return axios.post(`${activeOrPayBaseUrl}/credit/activate/payPassword`, params)
    },
    //设置还款日
    setRepayDay (params) {
        return axios.post(`${activeOrPayBaseUrl}/credit/activate/repayDay`, params)
    },
    //查询白条额度状态
    getCondition () {
        return axios.get(`${activeOrPayBaseUrl}/credit/activate/condition`)
    },
    //补充用户资料
    makeUpData (params) {
        return axios.post(`${activeOrPayBaseUrl}/credit/activate/makeUpData`, params, {
            headers: {'Content-Type': 'application/json'}
        })
    },
    //获取银行卡列表
    getBankList () {
        return axios.get(`${activeOrPayBaseUrl}/pay/banks`)
    },
    //首页信息
    indexInfor () {
        return axios.get(`${activeOrPayBaseUrl}/process/index/info`)
    },
    //支付页面信息
    payInfo (params) {
        return axios.get(`${activeOrPayBaseUrl}/process/pay/info`, {params: params})
    },
    //发起支付页面
    payDo (params) {
        return axios.post(`${activeOrPayBaseUrl}/process/pay/do`, params)
    },
    //重置密码页获取手机号
    getPhoneNo() {
        return axios.get(`${activeOrPayBaseUrl}/process/resetPayPassword/info`)
    },
    //重置支付密码
    resetPayPassword(params) {
        return axios.post(`${activeOrPayBaseUrl}/pay/resetPayPassword`, params)
    },
}