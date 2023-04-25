<template>
    <div class="c_list_box">
        <div class="c_list_box_top_title">
            <div style="color: #aaaaaa;">
                {{ props.data.pay_time }}
            </div>
            <div style="color: #aaaaaa;">
                订单号： <span style="color: #333;">{{ props.data.indent_id }}</span>
            </div>
            <div>
                {{ props.data.shop_name }}
            </div>
        </div>
        <div class="c_list_box_cmm">
            <div class="c_list_box_cmm_item">
                <img :src="http + props.data.imgs" alt="">
                <div class="title_item">
                    {{ props.data.commodity_info_title }}
                </div>
                <div style="margin-left: 2rem;color: #999;">
                    X{{ props.data.sum }}
                </div>
                <div style="margin:0 2rem; width: 3rem;">
                    <span v-if="props.data.state == 2" class="sdfsdfsdf">
                        申请售后
                    </span>
                </div>
            </div>
            <div class="user_name">
                {{ props.data.consignee }}
            </div>
            <div class="moeny">
                <div>
                    <div style="border-bottom: 1px solid #e5e5e5;">
                        ¥{{ props.data.indent_sum }}
                    </div>
                    <div style="font-size: 0.48rem;">
                        在线支付
                    </div>
                </div>
            </div>
            <div class="state_box">
                <div>
                    <div style="color: #aaa;" v-if="props.data.state == 2">
                        已完成
                    </div>
                    <div style="color: #aaa;" v-if="props.data.state == 2">
                        积分 <span style="color: #e4393c;">{{ props.data.integral }}</span>
                    </div>
                    <div class="sdfsdfsdf" @click="router.push(`/shipping/waybinfo/${props.data.indent_id}`)">
                        订单详情
                    </div>
                </div>
            </div>
            <div class="cao_box">
                <div class="hover_red" v-if="props.data.evaluate_tf == 0&&props.data.state==2&&!props.data.commodity_comment_parent_send_time" @click="FnPush(props.data.indent_id)">
                    评价|晒单
                </div>
                <div class="sdfsdfsdf" v-if="props.data.state>2" @click="router.push(`/shipping/salesschedule/${props.data.indent_id}`)">
                    {{
                        FnState(props.data.state)
                    }}
                </div>
                <div @click="router.push(`/shipping/addcomment/${props.data.indent_id}`)" class="hover_red"
                    v-if="!props.data.commodity_comment_parent_info_add_time && props.data.evaluate_tf == 1&&props.data.state==2">
                    追评
                </div>
                <div class="hover_red" style="padding-top: 0.2rem;"  v-if="props.data.state==2">
                    查看发票
                </div>
                <div @click="FnCmmS(props.data.indent_id)" class="qureitem" v-if="props.data.state == 0 || props.data.state == 1">
                    确认收货
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import request from '@/request/request';
import { message } from 'ant-design-vue';
import { reactive, ref, defineProps,defineEmits } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps(['data'])
const http = window.$http
const emit =defineEmits(['refresh'])
function FnState(e){
    let str='';
    switch(e){
        case 3: str='退货申请中 等待用户发货'; break;
        case 4: str='商家同意退货申请'; break;
        case 5: str='退货申请 用户已发货'; break;
        case 6: str='商家已收货 等待商家处理'; break;
        case 7: str='退货申请驳回'; break;
        case 8: str='退款中 等待商家处理'; break;
        case 9: str='退款完成'; break;
        case 10: str='退款申请驳回'; break;
    }
    return str
}
function FnPush(e) {
    router.push(`/shipping/comment/${e}`)
}
function FnCmmS(indent_id){
    request.post('/index/index/receiving',{indent_id}).then(res=>{
        if(res.data.code==200){
            message.success('收货成功');
            emit ('refresh')
        }
    })
}
</script>
<style lang="less" scoped>
.sdfsdfsdf:hover {
    color: #e4393c !important;
}
.qureitem:hover {
    background: #fff;
    border-color: #e4393c;
    color: #e4393c;
}

.qureitem {
    width: 60%;
    margin: 0 auto;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    text-align: center;
    color: #333;
    border-radius: 0.1rem;
}
.hover_red:hover {
    color: #f30213 !important;
}

.cao_box {
    text-align: center;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    width: 5rem;
    color: #666;
}

.state_box>div {
    padding: 0 0.5rem;
    padding-top: 0.5rem;
    width: 5rem;
    text-align: center;
}

.state_box {
    border-right: 1px solid #e5e5e5;
}

.moeny>div {
    padding: 0.5rem;
    width: 5rem;
    text-align: center;
}

.moeny {
    border-right: 1px solid #e5e5e5;
    color: #aaa;

}

.user_name {
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    text-align: center;
    width: 5rem;
    padding-top: 0.5rem;
}

.title_item {
    width: 10rem;
    overflow: hidden;

}

.c_list_box_cmm_item {
    display: flex;
    font-size: 0.5rem;
    padding: 0.5rem;

    img {
        width: 3rem;
        height: 3rem;
        margin-right: 0.5rem;
    }
}

.c_list_box_cmm {
    width: 100%;
    box-sizing: border-box;
    display: flex;
}

.c_list_box_top_title {
    display: flex;
    background-color: #ddd;
    padding-left: 1rem;

    div {
        margin-right: 1rem;
    }
}

.c_list_box {
    margin: 1rem 0;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
}</style>