<!-- 问题反馈 -->
<template>
    <div>
        <div class="feed-back-box">
            <p class="title">{{feedBackText.title}}</p>
            <div class="content">
                <textarea  v-model="content" style="resize: none;" :maxlength="maxlength" class="text"  cols="50" rows="10" :placeholder="feedBackText.placeholder"></textarea>
                <span>{{content.length}}/{{maxlength}}</span>
            </div>
        </div>
        <bt-footer :isDisabled="!content" @click="submit" :text="feedBackText.footerText" :isShow="true"></bt-footer>
    </div> 
</template>

<script>
import btFooter from '../../components/footer'
import repayApi from '../../api/repayment.api'
import {Toast} from "qg-vue-components2"
export default {
    data () {
        return {
            feedBackText: {
                title: 'Saya memiliki pendapat untuk memberi masukan',//我有意见要反馈
                placeholder: 'Tolong jelaskan masalah atau saran Anda secara detail. Kami akan menindaklanjuti dan menyelesaikannya tepat waktu.',//请详细描述您的问题或建议，我们将及时跟进解决。
                footerText: 'Submit',//提交
                infor: 'Pengajuan sukses'//提交成功
            },
            maxlength: 1000,
            content: ''
        }
    },

    components: {
        btFooter
    },

    computed: {},

    methods: {
        submit() {
            let params = {
                channelId: this.$store.state.baitiao.channelId,
                content: this.content.replace(/\r/ig, "").replace(/\n/ig, " ")
            }
            repayApi.feedBack(params).then( res => {
                // 反馈成功
                Toast(this.feedBackText.infor)
                this.$router.replace({path: '/setting'})
            })
        }
    },

    mounted () {}
}

</script>
<style lang='less' scoped>
    .feed-back-box{
        padding: 0 28px;
        font-size: 14px;
        .title{
            line-height: 20px;
            min-height: 50px;
            padding: 15px 0;
            font-weight: 40;
            word-break: keep-all;
        }
        .content{
            border-top: 1px solid #D5D5D5;
            border-bottom: 1px solid #D5D5D5;
            padding: 12px 0 26px 0;
            position: relative;
            margin-bottom: 80px;
            .text{
                width: 100%;
                height: 130px;
                font-size: 14px;
                text-align: justify;
            }
            span{
                position: absolute;
                right: 0;
                bottom: 10px;
                font-size: 40;
            }
        }
    }
</style>