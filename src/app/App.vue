<template>
    <div id="app" :class="{ios:isIOS}">
        <qgHeader :title="title" :back="back" :options="options" v-if="header"></qgHeader>
        <qg-toast :open="open" :message="message"></qg-toast>
        <keep-alive>
            <router-view v-if="needKeepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!needKeepAlive"></router-view>
        <qg-alertify :open="open1" :message="message1" :duration="duration" :styleObject="styleObject"></qg-alertify>
        <qg-top text="top" :transitionTime="top.time" :pageY="top.pageY"></qg-top>
        <qg-loading v-show="loading"></qg-loading>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import staticData from './service/static-data.service'
import qgHeader from './components/header.vue'
export default {
    name: 'app',
    data () {
        return {
            isIOS: staticData.isIOS,
            top: {
                time: 500,
                pageY: 100
            }
        }
    },
    methods: {
        back () {
            this.$router.go(-1)
        },
        close () {
            window.close()
        },
        click () {

        }
    },
    computed: {
        ...mapState({
            header: state => state.baitiao.header,
            channelId: state => state.baitiao.channelId,
            options: state => state.baitiao.options,
            title: state => state.baitiao.title,
            footerText: state => state.baitiao.footerText,
            needKeepAlive: state => state.baitiao.needKeepAlive,
            open: state => state.qg.toast.open,
            message: state => state.qg.toast.message,
            loading: state => state.qg.loading.open,
            open1: state => state.qg.alertify.open,
            message1: state => state.qg.alertify.message,
            duration: state => state.qg.alertify.duration,
            styleObject: state => state.qg.alertify.styleObject
        })
    },
    components: {
        qgHeader
    },
    mounted () {
        let clientH = document.documentElement.clientHeight
        this.top.pageY = clientH * 2
    }
}
</script>
<style lang="less">
@import "../styles/qg.less";
@import "../styles/_var.less";
@import "../styles/override-qg-style.less";
body {
    color: #333333;
    font-size: 14px !important;
}
#app {
  height: 100%;
  max-width: 640px;
  margin: 0 auto;
  font-family:sans-serif;
  user-select:none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  .qg-toast-vuex{
      max-width: 640px;
  }
}
.opacity-overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
}
.ios{
    font-weight:300;
    .field-control{
        input {
           font-weight: 300;

        }
        ::-webkit-input-placeholder {
            font-weight: 300;

        }
        .divMode {
            font-weight: 300;

        .placeholder {
            font-weight: 300;
        }
        }
        .multiLine {
            font-weight: 300;
        }
        [contenteditable=true]:empty:before {
            font-weight: 300;
        }
    }
}
.qg-top-warp {
    background-color:hsla(0,0%,60%,.17) !important;
}
.qg-top-tip {
    left:9px !important;
    bottom: 9px !important;
}
</style>
