<!-- 选择银行 -->
<template>
    <div class="bank-box">
        <div class="input-box">
            <input type="text" v-model="value" >
            <i class="icon"></i>
            <i :class="{'close':value}" @click="deleteFn"></i>
        </div>
        <div class="bank-name" v-for="(item,index) in bankData" @click="select(item)" :key="index">
            {{item.name}}
        </div>
    </div>
</template>

<script>
import activeApi from '../../api/activeOrPay.api'
export default {
    data () {
        return {
            value: '',
            bankList: []
        }
    },

    components: {},

    computed: {
        bankData () {
    		return this.userName === ''
	    		? this.bankList
	    		: this.bankList.filter( data => {
	    			return data.name.toLowerCase().includes(this.value.toLowerCase())
	    		})
        }
    },

    methods: {
        //选择银行
        select(value) {
            this.$router.replace({path: '/personalInfor', query: {bank: JSON.stringify(value)}})
        },
        //获取银行列表
        getBankList () {
            activeApi.getBankList().then( res => {
                this.bankList = res.data
            })
        },
        deleteFn() {
            this.value = ''
        }
    },
    mounted () {
        this.getBankList()
    }
}

</script>
<style lang='less' scoped>
    .bank-box{
        .input-box{
            padding: 9px 24px;
            background: #E6E6E6;
            border-bottom: 1px solid #E6E6E6;
            position: relative;
            .icon{
                position: absolute;
                left:32px;
                top: 18px;
                width: 14px;
                height: 14px;
                background: url('../../../images/search.png') no-repeat;
                background-size: 14px 14px;
            }
            .close{
                position: absolute;
                right:32px;
                top: 16px;
                width: 14px;
                height: 14px;
                background: url('../../../images/search_close.png') no-repeat;
                background-size: 14px 14px;
            }
            input{
                background: #fff;
                height: 30px;
                width: 100%;
                padding-left: 30px;
                font-size: 14px;
            }

        }
        .bank-name{
            padding: 13px 24px;
            color: #333333;
            font-size: 14px;
            line-height: 16px;
            font-weight: 40;
            border-bottom: 1px solid #E6E6E6;
        }
    }
</style>