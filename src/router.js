import Router from 'vue-router'
import staticService from './app/service/static-data.service'
import userService from './app/service/user.service';

const verificationCode = require('./app/page/activation/verificationCode.vue')
const selectRepayDay = require('./app/page/activation/selectRepayDay.vue')
const waiting = require('./app/page/activation/waiting.vue')
const personalInfor = require('./app/page/activation/personalInfor.vue')
const selectBank = require('./app/page/activation/selectBank.vue')
const activeFaild = require('./app/page/activation/activeFaild.vue')
const noLimit = require('./app/page/activation/noLimit.vue')
const serviceAgreement = require('./app/page/activation/serviceAgreement.vue')
const immediatePayment = require('./app/page/payment/immediatePayment.vue')
const orderFaild = require('./app/page/payment/orderFaild.vue')
const paymentSuccess = require('./app/page/payment/paymentSuccess.vue')
const paymentFaild = require('./app/page/payment/paymentFaild.vue')
const payAgreement = require('./app/page/payment/payAgreement.vue')
const repayGuide = require('./app/page/repayment/repayGuide.vue')
const home = require('./app/page/home.vue')
const billList = require('./app/page/bill/billList.vue')
const monthRepayBill = require('./app/page/bill/monthRepayBill.vue')
const stagingBill = require('./app/page/bill/stagingBill.vue')
const setting = require('./app/page/other/setting.vue')
const question = require('./app/page/other/question.vue')
const about = require('./app/page/other/about.vue')
const feedBack = require('./app/page/other/feedBack.vue')

const userStatus = staticService.userStatus
const routes = [
	{
		path: '/auth-controller',
		name: 'auth-controller',
		component: {
			template: ''
		}
	},
	{
		path: '/home',
		name: 'home',
		meta: {
			options: {
				back: false,
			},
			status: userStatus.Active,
		},
		component: home
	},
	{
		path: '/verificationCode',
		name: 'verificationCode',
		meta: {
			title: 'Sandi Pembayaran',//支付密码
			needKeepAlive: true,
			options: {
				back: false,
			},
			status: [userStatus.PayPassword,userStatus.Active],
		},
		component: verificationCode
	},
	{
		path: '/selectRepayDay',
		name: 'selectRepayDay',
		meta: {
			title: 'Tanggal pelunasan',//还款日
			needKeepAlive: true,
			options: {
				back: false,
			},
			status: userStatus.selectRepayDay,
		},
		component: selectRepayDay
	},
	{
		path: '/waiting',
		name: 'waiting',
		meta: {
			title: 'Kemajuan aktivasi',//激活进度-激活中
			options: {
				back: false,
			},
			status: userStatus.Running,
		},
		component: waiting
	},
	{
		path: '/personalInfor',
		name: 'personalInfor',
		meta: {
			title: 'Bahan tambahan', //补充资料
			needKeepAlive: true,
			options: {
				back: false,
			},
			status: userStatus.MakeUpData,
		},
		component: personalInfor
	},
	{
		path: '/selectBank',
		name: 'selectBank',
		meta: {
			title: 'Daftar bank', //银行列表
			options: {
				back: true
			},
			status: userStatus.MakeUpData,
		},
		component: selectBank
	},
	{
		path: '/activeFaild',
		name: 'activeFaild',
		meta: {
			title: 'Kemajuan aktivasi',//激活进度-激活失败
			options: {
				back: false,
			},
			status: userStatus.Fail,
		},
		component: activeFaild
	},
	{
		path: '/serviceAgreement',
		name: 'serviceAgreement',
		meta: {
			title: 'perjanjian layanan', //服务协议
			options: {
				back: true,
			}
		},
		component: serviceAgreement
	},
	{
		path: '/payAgreement',
		name: 'payAgreement',
		meta: {
			title: 'Bahan tambahan', //支付协议 （暂时没有）
			options: {
				back: true
			}
		},
		component: payAgreement
	},
	{
		path: '/noLimit',
		name: 'noLimit',
		meta: {
			title: 'Tanpa kredit',//无额度
			options: {
				back: false,
			},
			status: [userStatus.NoLimit, userStatus.Disable],
		},
		component: noLimit
	},
	{
		path: '/immediatePayment',
		name: 'immediatePayment',
		meta: {
			title: 'Pembayaran', //支付
			options: {
				back: false,
			},
			status: userStatus.Active,
		},
		component: immediatePayment
	},
	{
		path: '/orderFaild',
		name: 'orderFaild',
		meta: {
			title: 'Pembayaran', //支付
			options: {
				back: false,
			}
		},
		component: orderFaild
	},
	{
		path: '/paymentSuccess',
		name: 'paymentSuccess',
		meta: {
			title: 'Pembayaran', //支付
			options: {
				back: false,
			}
		},
		component: paymentSuccess
	},
	{
		path: '/paymentFaild',
		name: 'paymentFaild',
		meta: {
			title: 'Pembayaran', //支付
			needKeepAlive: true,
			options: {
				back: false,
			},
		},
		component: paymentFaild
	},
	{
		path: '/repayGuide',
		name: 'repayGuide',
		meta: {
			title: 'Panduan Pembayaran', //还款指引
			needKeepAlive: true,
			options: {
				back: true,
			}
		},
		component: repayGuide
	},
	{
		path: '/billList',
		name: 'billList',
		meta: {
			title: 'Semua tagihan',//全部账单
			options: {
				back: true
			}
		},
		component: billList
	},
	{
		path: '/monthRepayBill',
		name: 'monthRepayBill',
		meta: {
			title: 'Detail tagihan',//账单详情
			options: {
				back: true,
			}
		},
		component: monthRepayBill
	},
	{
		path: '/stagingBill',
		name: 'stagingBill',
		meta: {
			title: 'Detail tagihan  cicilan',//账单分期详情
			options: {
				back: true,
			}
		},
		component: stagingBill
	},
	{
		path: '/setting',
		name: 'setting',
		meta: {
			title: 'Pengaturan', //设置
			options: {
				back: true,
			}
		},
		component: setting
	},
	{
		path: '/question',
		name: 'question',
		meta: {
			title: 'Masalah Umum',//常见问题
			options: {
				back: true,
			}
		},
		component: question
	},
	{
		path: '/about',
		name: 'about',
		meta: {
			title: 'Tentang kami',//关于我们
			options: {
				back: true,
			}
		},
		component: about
	},
	{
		path: '/feedBack',
		name: 'feedBack',
		meta: {
			title: 'Umpan balik',//问题反馈
			options: {
				back: true,
			}
		},
		component: feedBack
	}
]

const router = new Router({
	mode: 'history',
	routes: routes
})

export default router
