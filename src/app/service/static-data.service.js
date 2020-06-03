const ua = window.navigator.userAgent.toLowerCase()
const relation = [
    {
        value: 0,
        key: 'PARENT',
        name: 'orang tua',//父母
    }, {
        value: 1,
        key: 'SPOUSE',
        name: 'pasangan',//配偶
    }, {
        value: 2,
        key: 'CHILDREN',
        name: 'anak'//子女
    }, {
        value: 3,
        key: 'BROTHER',
        name: 'kerabat'//亲戚
    }, {
        value: 4,
        key: 'COLLEAGUE',
        name: 'rekan'//同事
    }, {
        value: 5,
        key: 'CLASSMATE',
        name: 'teman sekelas'//同学
    }, {
        value: 6,
        key: 'FRIEND',
        name: 'teman'//朋友
    }, {
        value: 7,
        key: 'OTHER',//其他
        name: 'Lainnya'
    }
];
//渠道号
const channelIds =  {
    LAZADA: 16,
    DOKU: 14,
    SEPUS: 15
}
//用户状态,用于强状态控制跳转
const userStatus = {
    NoLimit: 'no',//无额度
    PayPassword: 'payPassword',//设置支付密码
    RepayDay: 'repayDay',//设置还款日
    MakeUpData: 'makeUpData',//补充资料
    Running: 'running',//激活中
    Fail: 'fail',//激活失败
    Active: 'active',//已激活且未被禁用
    Disable: 'disable',//已激活但被禁用
}
export default {
	isApp: ua.indexOf('xyqb') != -1,
	isAndroid: ua.indexOf('android') > -1,
	isIOS: ua.indexOf('iphone') > -1,
	isWeiXin: ua.match(/micromessenger/i) == "micromessenger",
    relation: relation,
    channelIds: channelIds,
    userStatus: userStatus
};
