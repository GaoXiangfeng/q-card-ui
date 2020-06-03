<!-- 付款成功 -->
<template>
  <div class="active-success">
      <img src="../../../images/success.png" alt="">
      <p>{{paySuccessText.success}}</p>
      <!-- <div class="enter-home"><span>{{count}}</span>秒跳回商户</div> -->
      <bt-footer :copyRight="copyRight"></bt-footer>
  </div>
</template>

<script>
import btFooter from '../../components/footer'
export default {
    data () {
        return {
            count: 3,
            timer: null,
            copyRight: true,
            paySuccessText: {
                success: 'Pembayaran berhasil'//付款成功
            }
        }
    },

    components: {
        btFooter
    },

    computed: {},

    methods: {
        //倒计时
        fun () {
            const TIME_COUNT = 3
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 1 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        window.location.href = 'http://www.baidu.com'
                        clearInterval(this.timer)
                        this.timer = null;
                    }
                }, 1000)
            }
        }
    },
    mounted () {
        // this.fun()
    }
}

</script>
<style lang='less' scoped>
    .active-success{
        position: relative;
        text-align: center;
        padding-top: 200px;
        img{
            margin-bottom: 24px;
            width: 45px;
            height: 45px;
        }
        p{
            font-weight: 30;
            margin-bottom: 80px;
        }
        .enter-home{
            background: #fff;
            span{
                margin-right: 5px;
            }
        }
        .success-footer{
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            color: #487BAD;
            font-size: 10px;
            font-weight: 30;
        }
    }
</style>