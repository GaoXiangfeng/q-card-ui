var pluses = /\+/g;

var jsonRegex = /^\{(.+:.+,*)*}$/;

var encode = function (s) {
    return _cookie.raw ? s : encodeURIComponent(s);
}

var decode = function (s) {
    return _cookie.raw ? s : decodeURIComponent(s);
}

var stringifyCookieValue = function (value) {
    return encode(_cookie.json ? JSON.stringify(value) : String(value));
}

var parseCookieValue = function (s) {
    if (s.indexOf('"') === 0) {
        s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    try {
        s = decodeURIComponent(s.replace(pluses, ' '));
        return _cookie.json ? JSON.parse(s) : s;
    } catch (e) {}
}

var read = function (s, converter) {
    var value = _cookie.raw ? s : parseCookieValue(s);

    return typeof cb == "function" ? converter(value) : value;
}

var _cookie = function (key, value, options) {
    // Write
    if (arguments.length > 1 && !(typeof cb == "function")) {
        options = options ? options : {};
        if (typeof options.expires === 'number') {
            var days = options.expires,
                t = options.expires = new Date();
            t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
        }
        return (document.cookie = [
            encode(key), '=', stringifyCookieValue(value),
            // use expires attribute, max-age is not supported by IE
            options.expires ? '; expires=' + options.expires.toUTCString() : '',
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
    var result = key ? undefined : {},
        cookies = document.cookie ? document.cookie.split('; ') : [],
        i = 0,
        l = cookies.length;
    for (; i < l; i++) {
        var parts = cookies[i].split('='),
            name = decode(parts.shift()),
            cookie = parts.join('=');
        if (key === name) {
            result = read(cookie, value);
            break;
        }
        if (!key && (cookie = read(cookie)) !== undefined) {
            result[name] = cookie;
        }
    }
    return result;
};

var cookieStorage = {
    cookieKeyPrefix: "__localStorage__",
    get: function(key) {
        return _cookie(this.cookieKeyPrefix + key);
    },
    set: function(key, value) {
        return _cookie(this.cookieKeyPrefix + key, value, {
            expires: 365
        });
    },
    clear: function() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var key = cookies[i].split("=")[0];
            _cookie(key, "", {
                expires: -1
            })
        }
    },
    remove: function(key) {
        return _cookie(this.cookieKeyPrefix + key, "", {
            expires: -1
        })
    }
};

var localStorage = {
    get: function(key) {
        return window.localStorage.getItem(key);
    },
    set: function(key, value) {
        return window.localStorage.setItem(key, value);
    },
    clear: function() {
        return window.localStorage.clear();
    },
    remove: function(key) {
        return window.localStorage.removeItem(key);
    }
};

var originStorage = (function () {
    var supportLocalStorage = true;
    try {
        window.localStorage.setItem('__test__', 1);
        window.localStorage.getItem('__test__');
        window.localStorage.removeItem('__test__');
    } catch (e) {
        supportLocalStorage = false;
    }
    return supportLocalStorage ? localStorage : cookieStorage;
})();

module.exports = { // 可以存对象，不限于字符串。
    get: function(k) {
        var _return = originStorage.get(k);
        if (!_return) {
            _return = '';
        }
        if (jsonRegex.test(_return)) {
            return JSON.parse(_return);
        }
        return _return;
    },
    set: function(k, v) {
        if (v == null || v == undefined || Object.prototype.toString.call(v) === "[object String]") {
            originStorage.set(k, v);
        } else {
            originStorage.set(k, JSON.stringify(v));
        }
    },
    clear: function() {
        return originStorage.clear();
    },
    remove: function(k) {
        return originStorage.remove(k);
    }
};
