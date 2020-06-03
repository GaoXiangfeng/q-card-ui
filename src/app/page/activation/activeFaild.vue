<!-- 激活失败 -->
<template>
  <div class="active-success">
     <div class="img"></div>
      <p>{{activeFaildText.fail}}</p>
      <div class="ask-phone">
          <p>{{activeFaildText.question[0]}}</p>
          <p>{{activeFaildText.question[1]}}</p>
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
            activeFaildText: {
                fail: 'Aktivasi gagal',//激活失败
                question: ['Jika Anda memiliki pertanyaan,', 'Silakan hubungi kami'],//若有疑问请咨询客服
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
        .img{
            width: 45px;
            height: 45px;
            margin: 0 auto;
            background: url('../../../images/shape.png') no-repeat;
            background-size: 45px 45px; 
            margin-bottom: 24px;
        }
        p{
            font-weight: 30;
            margin-bottom: 80px;
        }
        .ask-phone{
            text-align: center;
            color: @bt-button-color;
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
    }
</style>