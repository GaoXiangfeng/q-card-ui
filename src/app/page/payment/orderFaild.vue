<!-- 订单失效 -->
<template>
  <div class="active-success">
      <img src="../../../images/shape.png" alt="">
      <p>{{orderText.order}}</p>
      <div class="pay-info">
          <p>{{orderText.infor[0]}}</p>
          <p>{{orderText.infor[1]}}</p>
      </div>
      <bt-footer :copyRight="copyRight"></bt-footer>
  </div>
</template>

<script>
import btFooter from '../../components/footer'
export default {
  data () {
    return {
        orderText: {
            order: 'kegagalan pesanan',//订单失效
            infor: ['Waktu Anda habis, pesanan telah kadaluwarsa', 'Mohon kirim ulang pesanan Anda']//长时间未操作，订单已失效,请重新提交订单
        },
        copyRight: true
    }
  },

  components: {
      btFooter
  },

  computed: {},

  methods: {},

  mounted () {}
}

</script>
<style lang='less' scoped>
    .active-success{
        position: relative;
        text-align: center;
        margin-top: 60px;
        img{
            margin-bottom: 24px;
            width: 45px;
            height: 45px;
        }
        &>p{
            font-weight: 30;
            margin-bottom: 80px;
        }
        .pay-info{
            color: #999;
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