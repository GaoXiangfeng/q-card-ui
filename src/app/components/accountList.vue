<!-- 未出账单 订单列表 -->
<template>
    <div>
        <div class="bill-detail-out-account" @click="next">
            <div class="infor" :style="styleObj">
                <div class="left" :class="{'isSingle': !item.leftDown}">
                    <p>{{item.leftTop}}</p>
                    <p v-if="item.leftDown">{{item.leftDown}}</p>
                </div>
                <div class="right" :class="{'isSingle': !item.rightDown}">
                    <p :class="{'m-r':item.isMore}">{{item.rightTop}}</p>
                    <p v-if="item.rightDown">{{item.rightDown}}</p>
                    <i class="more" v-if="item.isMore"></i>
                </div>
            </div>
       </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        item: {
            type: Object,
            default: function (){
                return {}
            }
        },
        styleObj: {
            type: Object,
            default: function (){
                return {}
            }
        }
    },
    data () {
        return {

        }
    },

    components: {},

    computed: {},

    methods: {
        next() {
            this.$emit('click')
        }
    },

    mounted () {}
}

</script>
<style lang='less' scoped>
@import "../../styles/_var.less";
    .bill-detail-out-account{
        .infor{
            height: 61px;
            display: -webkit-flex;
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            margin: 0 24px;
            border-bottom: 1px solid @border-blue;
            margin-bottom: -1px;
            .left{
                width: 71%;
                p:first-child{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .left,.right{
                p:first-child{
                    font-weight: 40;
                    font-size: 14px;
                    line-height: 16px;
                    margin-bottom: 7px;
                    white-space:nowrap;
                }
                p:nth-child(2){
                    color: @font-color-white;
                    font-size: @font-size-small;
                    line-height: @font-size-small;
                    white-space: word-break;
                    font-weight: 40;
                }
            }
            .right{
                text-align: right;
                position: relative;
                .m-r{ margin-right: 20px;}
                .more{
                    position: absolute;
                    right: 0;
                    top: 10px;
                    width: 8px;
                    height: 16px;
                    background: url('../../images/jiantou2.png') no-repeat;
                    background-size: 8px 16px;
                }
            }
            .isSingle{
                line-height: 18px;
                padding-top: 10px;
            }
        }
    }
</style>