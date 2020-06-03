<!-- 关于我们 -->
<template>
    <div class="about-box">
        <!-- <div class="logo">
             <img src="../../../images/logo-bt.png" alt="">
             <p>{{aboutText.name}}</p>
        </div> -->
        <div class="content">
            <div class="title">
                <span :class="titleObj"></span><b>{{aboutText.title1}}</b>
            </div>
            <p class="inner">{{aboutText.production}}</p>
        </div>
        <div class="content">
            <div class="title">
                <span :class="titleObj"></span><b>{{aboutText.title2}}</b>
            </div>
            <p class="inner">{{aboutText.infor}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            titleObj: {},
            aboutText: {
                name: 'Q Card',
                title1: 'Produk',
                title2: 'BAHASA',
                production: 'Q-Card is a consumer credit product. Users will receive a certain amount of credit after they apply for the service. When shopping online, users can pre-pay the credit line in Q-Card and enjoy the shopping experience of “first purchase, post-pay”. At the same time, the user can set the repayment date according to personal circumstances, and the repayment is convenient and quick.',
                infor: 'Q-Card Adalah produk finansial untuk konsumen. Pengguna Akan mendapat sejumlah limit Kredit setelah mereka mengajukan permohonan secara Online . Saat berbelanja Online, pengguna dapat melakukan pembayaran dnegan Jalur Kredit di Q-Card dan menikmati pengalaman "Beli sekarang, Bayar nanti." Pada saat yang sama, pengguna dapat mengatur tanggal pembayaran sesuai dengan kebutuhan pribadi, dan pelunasan pembayaran dapat dilakukan dengan mudah dan cepat.'
            }
        }
    },

    components: {},

    computed: {},

    methods: {},

    mounted () {
        let channelId = this.$store.state.baitiao.channelId
        this.titleObj = {
            'lazada-title': channelId == this.STATICDATA.channelIds.LAZADA,
            'sepus-title': channelId == this.STATICDATA.channelIds.SEPUS,
        }
    }
}

</script>
<style lang='less' scoped>
@import '../../../styles/_var.less';
    .about-box{
        padding: 45px 27px 36px;
        text-align: center;
        .logo{
            margin-bottom: 36px;
            img{
                width: 70px; 
                height: 70px;
            }
            p{
                margin-top: 10px;
                font-size: 13px;
                color: #666;
                line-height: 18px;
            }

        }
        .content{
            text-align: justify;
            text-justify: inter-ideograph;/*IE*/
            word-break: break-all;
            margin-bottom: 24px;
            font-size: 12px;
            .title{
                position: relative;
                line-height: 22px;
                letter-spacing: 0.15;
                span{
                    position: absolute;
                    left: 0;
                    top: 4px;
                    width: 4px;
                    height: 13px;
                    background: #E2572D;
                    // border: 1px solid #979797;
                    border-radius: 1px;
                    margin-right: 5px;
                    vertical-align: bottom;
                }
                .lazada-title{
                    background: @lazada-button-color;
                }
                .sepus-title{
                      background: @sepus-button-color;
                }
                b{
                    margin-left: 10px;
                    font-weight: 30;
                }
            }
            p.inner{
                text-indent: 25px;
                line-height: 25px;
                color: #333;
                word-break: keep-all;
                text-align: justify;
            }
        }
        .footer{
            height: 62px;
            border-top: 1px solid #DCDCDC;
            border-bottom: 1px solid #DCDCDC;
            padding: 21px 0;
            font-size: 15px;
            line-height: 20px;
            text-align: left;
            position: relative;
            .icon{
                position: absolute;
                right: 0;
                width: 10px;
                height: 18px;
                background: url('../../../images/jiantou4.png') no-repeat;
                background-size: 10px 18px;
            }
            
        }
        
    }
</style>