<!-- 激活等待中 -->
<template>
  <div class="waiting">
    <qg-loading class="loading" v-show="loading"></qg-loading>
    <div class="infor">
        <p>{{waitingText.wait}}</p>
        <p>{{waitingText.result}}</p>
    </div>
    <bt-footer :copyRight="copyRight"></bt-footer>
  </div>
</template>

<script>
import authController from '../../service/auth.controller'
import state from '../../store'
import btFooter from '../../components/footer'
export default {
    data () {
        return {
            loading: true,
            timer: null,
            copyRight: true,
            waitingText: {
                wait: 'Proses aktivasi sedang dilakukan, mohon tunggu',//激活中，请耐心等待
                result: 'Hasil aktivasi akan dikirimkan melalui SMS'//激活结果会以短信通知您
            }
        }
    },

    components: {
        btFooter
    },

    computed: {},

    methods: {},

    beforeRouteEnter (to, from, next) {
        authController.go()
        next(vm => {
            vm.$store.dispatch('closeLoading')
        })
    },

    mounted () {},

}

</script>
<style lang='less'>
    .waiting{
        position: relative;
        text-align: center;
        // .wait-loading-wrapper .wait-loading{
        //     position: absolute;
        //     top: 50% !important;
        //     left: 50% !important;
        //     margin: 0 !important;
        //     transform: translate(-50%,-50%)
        // }
        // @media (min-width:640px){
        //     .wait-loading-wrapper .wait-loading{
        //         position: absolute;
        //         top: 244px !important;
        //         left: 320px !important;
        //         margin: 0 !important;
        //         transform: translate(-50%,-50%)
        //     } 
        // }
        .loading{
            position: absolute;
            top: 35% !important;
            left: 50% !important;
            margin: 0 !important;
            transform: translate(-50%,-50%)
        }
        .infor{
            position: absolute;
            top: 274px;
            left: 50%;
            transform: translate(-50%,0);
            font-weight: 30;
            text-align: center;
            white-space:nowrap;
        }
        p{
            margin-bottom: 10px;
        }
    }
    
    
</style>