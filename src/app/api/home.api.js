import axios from '../service/http.service'
import Api from '../config'
const mallApi = Api.env.ApiBaseUrl;
module.exports = {
	getHomeData () {
		return axios.get(`${mallApi}mall/home?channel=1`)
	},
	getRecommendData () {
		return axios.get(`${mallApi}mall/other/ex/wx/recommend`)
	},
	getCategory () {
		return axios.get(`${mallApi}mall/category?channel=1`)
	},
	getCategoryTwo (categoryId) {
		return axios.get(`${mallApi}mall/secondCategory?channel=1&categoryId=${categoryId}`)
	},
	getAlbumList (pageNo = 1, pageSize = 5) {
		return axios.get(`${mallApi}mall/other/ex/display/album_list?pageNo=${pageNo}&pageSize=${pageSize}`)
	},
	getBtStatus () {
		return axios.get(`${mallApi}mall/btStatus?from=weixin88888`)
	}
}
