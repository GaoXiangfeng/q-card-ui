const protocol = window.location.protocol
let apiHost = protocol + '//192.168.28.249:9016'//李青开发
// let apiHost = protocol + '//192.168.25.198:9016'//文波开发
// let apiHost = protocol + '//192.168.29.39:9016'//tonny开发
// let apiHost = `${protocol}//q-card-api-dongmeifeng1.q-gp.com`//测试
// let apiHost = `${protocol}//pinjaman-api.uanguang.com`//线上
module.exports = {
	ApiBaseUrl: apiHost,
}
