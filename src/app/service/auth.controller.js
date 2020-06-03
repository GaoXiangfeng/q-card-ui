import activeApi from '../api/activeOrPay.api'
import router from '../../router'
import Cookies from '../service/cookieStorage.service'
import userService from './user.service';
import staticDataService from '../service/static-data.service'
module.exports.go = () => {
    //获取白条额度状态
    activeApi.getCondition().then( res => {
        // no 无额度,payPassword 设置支付密码, makeUpData 补充资料,
        // running 激活中,fail 激活失败, active 已激活且未被禁用, disable 已激活但被禁用
        function go(name) {
            router.replace({name: name})
        }
        let data = res.data
        let USERSTATUS = staticDataService.userStatus
       
        let condition = data.condition
        userService.saveUserStatus(condition)
        
        switch(condition) {
            case USERSTATUS.NoLimit:
                go('noLimit')
                break;
            case USERSTATUS.PayPassword:
                //该页面会获取手机号
                Cookies.set('phoneNo', data.phoneNo)
                go('verificationCode')
                break;
            case USERSTATUS.RepayDay:
                //设置还款日
                go('selectRepayDay')
                break;
            case USERSTATUS.MakeUpData:
                //补充资料数据
                Cookies.set('makeUpData', data.makeUpData)
                go('personalInfor')
                return
            case USERSTATUS.Running:
                go('waiting')
                break;
            case USERSTATUS.Fail:
                go('activeFaild')
                break;
            case USERSTATUS.Active:
                //激活后，进入主页后跳转的页面不再强状态控制
                go('home')
                break;
            case USERSTATUS.Disable:
            //todo 待定跳转页面
                go('noLimit')
                break;
        }
    })      

} 

