<!-- 无额度页面  -->
<template>
    <div class="active-success">
     <div class="img"></div>
      <p>{{noLimitText.no}}</p>
      <div class="ask-phone">
          <p>{{noLimitText.question[0]}}</p>
          <p>{{noLimitText.question[1]}}</p>
          <a href="tel:8000000909009" :class="channelObj">8000000909009</a>
      </div>
      <bt-footer :copyRight="copyRight"></bt-footer>
  </div>
</template>

<script>
import btFooter from '../../components/footer'
export default {
    data () {
        return {
            channelId: 1,
            //根据渠道切换颜色
            channelObj: {},
            copyRight: true,
            noLimitText: {
                no: 'Tidak ada batas kredit~',
                question: ['Jika Anda memiliki pertanyaan,','Silakan hubungi kami']
            }
        }
    },

    components: {
        btFooter
    },

    computed: {},

    methods: {},

    mounted () {
        this.channelId = this.$store.state.baitiao.channelId
        this.channelObj = {
            'channel-lazada': this.channelId == this.STATICDATA.channelIds.LAZADA,
            'channel-sepus': this.channelId == this.STATICDATA.channelIds.SEPUS
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
            width: 50px;
            height: 51px;
            margin: 0 auto;
            background: url('../../../images/noLimit.png') no-repeat;
            background-size: 50px 51px; 
            margin-bottom: 24px;
        }
        p{
            font-weight: 30;
            margin-bottom: 80px;
        }
        .ask-phone{
            text-align: center;
            p{
                color: #999999;
                margin-bottom: 5px;
            }
            a{
                color: @bt-button-color;
                font-weight: 30;
            }
            .channel-lazada{
                color: @lazada-button-color;
            }
            .channel-sepus{
                color: @sepus-button-color;
            }
        }
       
    }
</style>