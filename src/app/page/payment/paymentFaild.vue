<!-- 付款失败 -->
<template>
  <div class="active-success">
      <img src="../../../images/shape.png" alt="">
      <p>{{payFaildText.fail}}</p>
      <div class="ask-phone">
          <p>{{payFaildText.question[0]}}</p>
          <p>{{payFaildText.question[1]}}</p>
          <a href="tel:82113233895" :class="phoneObj">82113233895</a>
      </div>
      <bt-footer :copyRight="copyRight"></bt-footer>
  </div>
</template>

<script>
import btFooter from '../../components/footer'
export default {
    data () {
        return {
            copyRight: true,
            phoneObj: {},
            payFaildText: {
                fail: 'Pembayaran gagal',//付款失败
                question: ['Jika Anda memiliki pertanyaan,', 'Silakan hubungi kami']//若有疑问请咨询客服
            }
        }
    },

    components: {
        btFooter
    },

    computed: {},

    methods: {},

    mounted () {
        let channelId = this.$store.state.baitiao.channelId
        this.phoneObj = {
            'lazada-phone': channelId == this.STATICDATA.channelIds.LAZADA,
            'sepus-phone': channelId == this.STATICDATA.channelIds.SEPUS,
        }
  }
}

</script>
<style lang='less' scoped>
@import '../../../styles/_var.less';
    .active-success{
        position: relative;
        text-align: center;
        margin-top: 60px;
        img{
            margin-bottom: 24px;
            width: 45px;
            height: 45px;
        }
        p{
            font-weight: 30;
            margin-bottom: 80px;
        }
        .ask-phone{
            text-align: center;
            color: #E3572D;
            p{
                color: #999999;
                margin-bottom: 5px;
            }
        }
        .lazada-phone{
            color: @lazada-button-color;
        }
        .sepus-phone{
            color: @sepus-button-color;
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