import localStorage from './localStorage.service.js'
import Cookies from './cookieStorage.service'
import router from '../../router'
import config from "../config"

export default {
    saveToken(token) {
      Cookies.set('token', token);
    },
    removeToken() {
      Cookies.remove('token');
    },
    getToken() {
        return Cookies.get('token');
    },
    isLogin() {
        return !!(this.getToken());
    },
    goLogin() {
        const redirectURL = encodeURIComponent(window.location.href);
        const url = config.env.xyqbUserUI + 'landing?key=baitiao&target=cashTarget5&channelId=222&registerFrom=' + Cookies.get('registerFrom') + '&redirectURL=' + redirectURL; //跳转到登录
        window.location.href = url;
    },
    getPhoneNo() {
        return Cookies.get('phoneNo');
    },
    saveMockStatus(data) {
       Cookies.set('mockStatus',data);
    },
    saveUserStatus(data) {
      Cookies.set("userStatus", data);
    },
    saveSearchWords(word) {
        if (!word.replace(/\s+/g, '')) {
            return
        }
        let _history = localStorage.get('_history')
        _history = _history ? JSON.parse(_history) : []
        var index = _history.indexOf(word);
        if (index === -1) {
            _history.unshift(word)
        } else if (index !== -1 && index !== 0) {
            _history.splice(index, 1)
            _history.unshift(word)
        }
        if (_history.length > 10) {
            _history.pop()
        }
        localStorage.set('_history', _history)
    },
    checkUserStatus(expectUserStatus, errorCallback) {
        // return; //测试开启
        if (typeof expectUserStatus == "undefined") {
            return true;
        }
        errorCallback = errorCallback || function() {
            router.replace({ name: "auth-controller" });
        };

        var userStatus = Cookies.get('userStatus')
        if (typeof expectUserStatus == "object") {
            if (expectUserStatus.indexOf(userStatus) == -1) {
                errorCallback();
                return false;
            }
        } else if (userStatus != expectUserStatus) {
            errorCallback();
            return false;
        }
        return true;
    }
};
