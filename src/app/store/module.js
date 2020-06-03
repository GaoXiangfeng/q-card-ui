import * as types from "./type";
let keepAlive = [{controRefrsh: false}, {controRefrsh: false}, {controRefrsh: false}, {controRefrsh: false}, {controRefrsh: false},
	{controRefrsh: false}, {controRefrsh: false}]
const state = {
	header: true,
	needKeepAlive: false, //
	searchValue: '',    // 搜索关键词
	searchWords: [],    // 搜索联想词
	options: {
		back: false,
		title: false,
		close: false,
		search: false,
		cancel: false,
		searchBar: false,
		order: false,
		footer: false
	},
	footerText: '',
	title: '',
	loading: {
		open: false
	},
	meta: {},
	keepAlive: keepAlive,
	channelId: 1,
	tabIndex: 0
}

// getters
const getters = {}

// actions
const actions = {
	change_header ({commit}, header) {
		commit(types.CHANGE_HEADER, header)
	},
	change_title({commit}, title) {
		commit(types.CHANGE_TITLE, title)
	},
	change_meta({commit}, meta){
		commit(types.CHANGE_META, meta)
	},
	closeLoading ({commit}) {
		commit(types.CLOSE_LOADING)
	},
	openLoading ({commit}) {
		commit(types.OPEN_LOADING)
	}
}

// mutations
const mutations = {
	[types.CHANGE_HEADER] (state, header) {
		if (header !== undefined) {
			state.header = header
		}
	},
	[types.CHANGE_TITLE](state, title){
		if (title) {
			state.title = title
		}
		document.title = state.title;
	},
	[types.CHANGE_META](state, meta){
		for (let i in meta) {
			state.meta[i] = meta[i]
		}
	},
	[types.CHANGE_CHANNELID](state, channelId){
		state.channelId = channelId
	},
	[types.CHANGE_TABINDEX](state, tabIndex){
		state.tabIndex = tabIndex
	},
	[types.OPEN_LOADING] (state) {
		state.loading.open = true;
	},
	[types.CHANGE_NEEDKEEPALIVE] (state, flag) {
		if (flag !== undefined) {
			state.needKeepAlive = flag
		} else {
			state.needKeepAlive = false
		}
	},
	[types.CLOSE_LOADING](state){
		state.loading.open = false;
	},
	[types.CHANGE_OPTIONS](state, options){
		state.options = options;
	},
	[types.UPDATE_SEARCH_VALUE](state, val) {
		state.searchValue = val
	},
	[types.UPDATE_SEARCH_WORDS](state, val) {
		state.searchWords = val
	},
	[types.UPDATE_KEEP_ALIVE](state, val) {
		state.keepAlive[val[0]] = val[1]
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
