<!-- 平台协议、忘记密码、常见问题、客服、关于我们入口 -->
<template>
    <div>
        <bt-order :item="settingText.agree" @click="agree"></bt-order>
        <bt-order :item="settingText.resetPwd" @click="resetPwd"></bt-order>
        <bt-order :item="settingText.question" @click="question"></bt-order>
        <bt-order :item="settingText.phone" @click="phone"></bt-order>
        <bt-order :item="settingText.feedback" @click="feedback"></bt-order>
        <bt-order :item="settingText.about" @click="about"></bt-order>
        <modal :title="settingText.phone.leftTop" :open="open1" name='openModal'>
            <div slot="body">
                <div style="text-align: center;">
                    <a href="tel:82113233895" class="phoneNo">82113233895</a>
                </div>
                <i class="close" @click="close"></i>
            </div>
        </modal>

        <div style="text-align:center;">
            <bt-footer :copyRight="copyRight"></bt-footer>
        </div>
    </div>
</template>
<script>
import btOrder from '../../components/accountList.vue'
import btFooter from '../../components/footer'
import {mapState} from 'vuex'
export default {
    data () {
        return {
            copyRight: true,
            open: false,
            settingText: {
                agree: {
                    leftTop: 'Perjanjian platform',//平台协议
                    isMore: true
                },
                resetPwd: {
                    leftTop: 'Lupa Kata sandi',//忘记密码
                    isMore: true
                },
                question: {
                    leftTop: 'Masalah Umum',//常见问题
                    isMore: true
                },
                phone: {
                    leftTop: 'consumer hotline',//客服电话
                    isMore: true
                },
                feedback: {
                    leftTop: 'Umpan balik',//问题反馈
                    isMore: true
                },
                about: {
                    leftTop: 'Tentang kami',//关于我们
                    isMore: true
                },
            }
        }
    },

    components: {
        btOrder,btFooter
    },

    computed: {
        ...mapState({
            open1 : state => state.qg.modal.openModal
        })
    },

    methods: {
        close() {
            this.$store.dispatch('closeModal', 'openModal')
        },
        agree() {
            this.$router.push({path:'/serviceAgreement'})
        },
        resetPwd() {
            this.$router.push({path:'/verificationCode',query: {isSet: 1}})
        },
        question() {
            this.$router.push({path:'/question'})
        },
        phone() {
            this.$store.dispatch('openModal', 'openModal')
        },
        feedback() {
            this.$router.push({path: '/feedBack'})
        },
        about() {
            this.$router.push({path: '/about'})
        },
    },

    mounted () {}
}

</script>
<style lang='less' scoped>
    .close{
        position: absolute;
        right: 15px;
        top: 10px;
        width: 12px;
        height: 12px;
        background: url('../../../images/CLOSE3.png') no-repeat;
        background-size: 12px 12px;
    }
    .phoneNo{
        font-size: 18px;
    }
</style>