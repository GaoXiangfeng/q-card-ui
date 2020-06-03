import Promise from "./promise.service";
import axios from 'axios'
import userService from "./user.service";
import {Toast} from "qg-vue-components2";
import router from '../../router';

// 每一个请求都会进入队列并附带一个定时，在请求成功后清除，当请求时间超过200Ms时会自动唤起全局的loading，在 timeout/所有请求结束后清空
import store from '../store/index'
let httpQueue = [],
	timeout = 200,
	loadingTimeOut,
	closeTimeOut

function beforeRequest(url) {
	if(url.includes('condition')) return
	httpQueue.push(url)
	loadingTimeOut = setTimeout(()=> {
		if (httpQueue.length !== 0 && !store.state.qg.loading.open) {
			store.dispatch('openLoading')
		}
	}, timeout)
	closeTimeOut = setTimeout(()=> {
		if (store.state.qg.loading.open) {
			store.dispatch('closeLoading')
		}
	}, 5000)
}

function afterRequest(url) {
	clearTimeout(loadingTimeOut)
	var index = httpQueue.indexOf(url);
	if (index > -1) {
		httpQueue.splice(index, 1);
	}
	if (httpQueue.length == 0) {
		setTimeout(()=> {
			store.dispatch('closeLoading')
		}, 200)
	}
}
//axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 30000;

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	let returnData = response.data
	if (returnData.code === '0000' || returnData.code === 0) {
		if (returnData.businessCode === '0001' && returnData.msg) { // 默认非0000 有msg都要底层弹提示信息的
			Toast(returnData.msg)
			// router.replace({name: 'error'})
			return Promise.reject(returnData)
		} else {
			return returnData
		}
	} else {
		Toast(returnData.msg)
		//错误页面没有加
		// router.push({name: 'error'})
		return Promise.reject(returnData)
	}
}, function (error) {
	// 对响应错误做点什么
	if (error.code === 'ECONNABORTED' || !error.response) { // 请求超时
		Toast('Request time out, please try again')
		let data = {
			businessCode: '0100',
			code: '0100',
			data: 'Request time out'
		}
		return Promise.reject(data)
	}
	let errorData = error.response
	let returnData = error.response.data

	//是否要跳转登录
	if (errorData.status === 401 || returnData.code === '0401') {
		// userService.goLogin()
		Toast(returnData.msg)
		return
	}
	if (errorData.status === 404) {
		// router.replace({name: ''})
		return
	}
	// router.push({name: 'error'})
});
function formatParams(data) {
	let key = Object.keys(data)
	let result = ''
	key.map((ele) => {
		result += `${ele}=${encodeURIComponent(data[ele])}&`
	})
	return result.slice(0, -1)
}
export default {
	get(url, options = {}) {
		if(!options.headers){
			options.headers = {};
		}
		options.headers['X-Auth-Token'] = userService.getToken()
		options.headers['lang'] = navigator.systemLanguage || navigator.browserLanguage || navigator.language
		beforeRequest(url)
		return new Promise((resolve, reject) => {
			axios.get(url, options).then((response) => {
				afterRequest(url)
				resolve(response)
			}).catch((response) => {
				afterRequest(url)
				reject(response)
			})
		})
	},
	post(url, data, options = {}) {
		if(!options.headers){
			options.headers = {};
		}
		options.headers['X-Auth-Token'] = userService.getToken()
		options.headers['lang'] = navigator.systemLanguage || navigator.browserLanguage || navigator.language
		beforeRequest(url)
		if ( options.headers && options.headers['Content-Type'] === 'application/json') {
			console.log(options.headers)
			data = data
		} else {
			data = formatParams(data)
		}
		return new Promise((resolve, reject) => {
			axios.post(url, data, options).then((response) => {
				afterRequest(url)
				resolve(response)
			}).catch((response) => {
				afterRequest(url)
				reject(response)
			})
		})
	}
}
