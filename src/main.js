/* eslint-disable */
import $ from 'jquery'
import attachFastClick from "fastclick";
import "es6-promise/auto";
import Vue from "vue";
import router from "./router";
import App from "./app/App";
import store from "./app/store";
import initService from "./app/service/init.service";
import staticData from './app/service/static-data.service'
import VueRouter from "vue-router";
import QGVueComponents from "qg-vue-components2";
import "qg-vue-components2/dist/qg-vue-components.css";
attachFastClick.attach(document.body, { tapDelay: 200 });
attachFastClick.prototype.needsFocus = function (target) {
	switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'div':
			if (target.contentEditable) {
				return true
			}
		case 'input':
			switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
			}
			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
	}
};

Vue.use(VueRouter)

Vue.use(QGVueComponents)

Vue.directive('tap', function (el, binding) {
	let startTx, startTy, endTx, endTy;
	el.addEventListener("touchstart", function (e) {
		var touch = e.touches[0];
		startTx = touch.clientX;
		startTy = touch.clientY;
		el.addEventListener("touchend", function (e) {
			var touch = e.changedTouches[0];
			endTx = touch.clientX;
			endTy = touch.clientY;
			if (Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6) {
				var method = binding.value.method;
				var params = binding.value.params;
				method(params);
			}
		}, false);
	}, false);
})
Vue.filter('currency', function (value) {
	return typeof value !== 'undefined' ? Number(value).toFixed(2) : ''
})

initService.init(router)

//全局使用静态数据
Vue.prototype.STATICDATA = staticData

// 行为数据抓取
try {
	window && window._qgcollection && window._qgcollection({ router, sys: 'bospinjaman-h5-ui' });
} catch (e) {
	console.warn(e);
}


const app = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
/* eslint-enable */
