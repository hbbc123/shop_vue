<template>
    <div class="big_boxsd" v-if="data.data.type">
        <div class="jind_box">
            <div>
                <div style="color: #666; font-size: 0.48rem;">
                    订单号：{{ data.data.indent_id }}
                </div>
                <div class="wc">
                    {{FnState(data.data.state)}}
                </div>
                <div class="pj" v-if="data.data.state==2&&data.data.evaluate_tf==0">
                    评价
                </div>
            </div>
            <div>
                <div>
                    <a-steps :current="data.bu_key">
                        <a-step v-for="(item, key) in data.arr_o" :key="key" :title="item" />
                    </a-steps>
                </div>
            </div>
        </div>
        <div style="background-color: white;margin-top: 1rem;border-top: 2px solid #eee;">
            <div class="m order-info-mod">
                <div class="order-info order-info-new mc">
                    <div class="ui-switchable-body">
                        <div class="ui-switchable-panel-main">
                            <div class="ui-switchable-panel">
                                <div class="dl">
                                    <div class="dt">
                                        <h4>收货人信息
                                        </h4>
                                    </div>
                                    <div class="dd">
                                        <div class="item">
                                            <span class="label">
                                                收货人：
                                            </span>
                                            <div class="info-rcol">
                                                {{data.data.consignee}}
                                            </div>
                                        </div>
                                        <div class="item">
                                            <span class="label">
                                                地址：
                                            </span>
                                            <div class="info-rcol">
                                                {{data.data.site_region+data.data.site_info}}
                                            </div>
                                        </div>
                                        <div class="item">
                                            <span class="label">
                                                手机号码：
                                            </span>
                                            <div class="info-rcol">
                                                {{data.data.site_iphone}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="dl">
                                    <div class="dt">
                                        <h4>配送信息</h4>
                                    </div>
                                    <div class="dd">
                                        <div class="item">
                                            <span class="label">
                                                配送方式：
                                            </span>
                                            <div class="info-rcol">
                                                快递运输
                                            </div>
                                        </div>
                                        <div class="item">
                                            <span class="label">
                                                期望送货日期：
                                            </span>
                                            <div class="info-rcol">
                                                工作日、双休日与节假日均可送货
                                            </div>
                                        </div>
                                        <div class="item">
                                            <span class="label">

                                            </span>
                                            <div class="info-rcol">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="dl del_r" id="pay-info-nozero ">
                                    <div class="dt ">
                                        <h4>付款信息</h4>
                                    </div>
                                    <div class="dd">
                                        <div class="item">
                                            <span class="label">
                                                付款方式：
                                            </span>
                                            <div class="info-rcol">
                                                在线支付
                                            </div>
                                        </div>
                                        <div class="item">
                                            <span class="label">
                                                付款时间：
                                            </span>
                                            <div class="info-rcol">
                                                {{data.data.pay_time}}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-page">
                            <a href="javascript:void(0)" class="info-prev" style="display:none;">&lt;</a>
                            <a href="javascript:void(0)" class="info-next" style="display:none;" title="查看更多信息">&gt;</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-top: 1rem;background-color: white;">
            <div class="order-goods m">
                <div class="mt goods-head" style="background-color: #f4f4f4;text-align: left;color: #666;">
                    {{data.data.shop_name}}
                </div>
                <div class="mc">
                    <div class="goods-list ">
                        <table class="tb-void tb-order">
                            <colgroup>
                                <col class="grap">
                                <col class="col-goods">
                                <col class="col-number">
                                <col class="col-price">
                                <col class="col-amount">
                                <col class="col-bean">

                                <col class="col-ops">
                                <col class="grap">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th class="grap"></th>
                                    <th>商品</th>
                                    <th>商品编号</th>
                                    <th>京东价</th>
                                    <th>商品数量</th>
                                    <th>京豆</th>
                                    <th>操作</th>
                                    <th class="grap"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="first-tr product-10041063843296">
                                    <td class="grap"></td>
                                    <td>
                                        <div class="p-item" clstag="click|keycount|orderinfo|xqliebiaoshangpin">
                                            <div class="p-img">
                                                <img class=""
                                                    :src="http+data.data.imgs"
                                                     data-lazy-img="done" width="60" height="60">
                                            </div>
                                            <div class="p-info">
                                                <div class="p-name">
                                                {{data.data.commodity_info_title}}
                                                </div>
                                                <div class="clr"></div>
                                                <div id="coupon_10041063843296" class="fl"></div>
                                                <div class="p-extra">
                                                    <span class="txt">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="p-tag mt10">
                                            <span>支持7天无理由退货</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style="position:relative;top: -1rem;">
                                            {{data.data.cmm_id}}
                                        </div>
                                    </td>
                                    <td>
                                        <div style="position:relative;top: -1rem;">
                                            <span class="f-price">
                                                ¥{{data.data.indent_sum}}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style="position:relative;top: -1rem;">{{data.data.sum}}</div>
                                    </td>
                                    <td id="jingdou-10041063843296">
                                        <div style="position:relative;top: -1rem;">{{ data.data.integral>0?data.data.integral:'等待订单完成' }}</div>
                                    </td>
                                    <td>
                                        <div class="p-btns">
                                            <span v-if="data.data.state<=2" @click="router.push(`/shipping/salesinfo/${data.data.indent_id}`)">申请售后</span>
                                            <br>
                                            <span v-if="data.data.evaluate_tf==0" @click="router.push(`/shipping/comment/${data.data.indent_id}`)">评价|晒单</span><br>
                                        </div>
                                    </td>
                                    <td class="grap"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="goods-total">
                        <ul>
                            <li>
                                <span class="label">商品总额：</span>
                                <span class="txt">
                                    ¥{{data.data.type.son.moeny}}</span>
                            </li>
                            <li>
                                <span class="label">运费：</span>
                                <span class="txt">
                                   ¥0.00</span>
                            </li>
                            <li>
                                <span class="label">优惠券抵扣：</span>
                                <span class="txt">
                                    ¥{{data.data.promotion?data.data.promotion:'0.00'}}</span>
                            </li>
                            <li>
                                <span class="label">优积分抵扣：</span>
                                <span class="txt">
                                    ¥{{data.data.cash?data.data.cash:'0.00'}}</span>
                            </li>
                            <li class="ftx-01">
                                <span class="label">实付款：</span>
                                <span class="txt count">¥{{ data.data.indent_sum }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import request from '@/request/request';
import { useRouter, useRoute } from 'vue-router';

import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons-vue';
import { reactive, ref, watch } from 'vue';
import CList from '../compoents/CList.vue'
const data = reactive({
    data: {},
    arr_o: ['提交订单', '付款成功', '商品出库', '等待收货', '完成'],
    bu_key: 0
})
const http=window.$http
const router = useRouter()
const route = useRoute()
const { id } = route.params
request.get('/index/index/waybinfo', { indent_id: id }).then(res => {
    console.log(res);
    if(res.data.data.state>=2){
        data.bu_key=5
    }else if(res.data.data.state==0){
        data.bu_key=2
    }else if(res.data.data.state==1){
        data.bu_key=3
    }
    data.data=res.data.data
})
function FnState(e) {
    let str = '';
    switch (e) {
        case 3: str = '退货申请中'; break;
        case 4: str = '退货申请同意'; break;
        case 5: str = '退货申请用户已发货'; break;
        case 6: str = '商家已收货'; break;
        case 7: str = '退货申请驳回'; break;
        case 8: str = '退款中'; break;
        case 9: str = '退款完成'; break;
        case 10: str = '退款申请驳回'; break;
    }
    return str
}
</script>
<style>
.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)>.ant-steps-item-container[role='button']:hover .ant-steps-item-icon .ant-steps-icon {
    color: #71b247;
}

.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)>.ant-steps-item-container[role='button']:hover .ant-steps-item-icon {
    border-color: #71b247;
}

.ant-steps-item-finish .ant-steps-item-icon {
    background-color: #fff;
    border-color: #71b247;
}

.ant-steps-item-process .ant-steps-item-icon {
    background-color: #fff;
    border-color: #71b247;
}

.ant-steps-item-finish .ant-steps-item-icon>.ant-steps-icon {
    color: #71b247;
}

.ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-icon {
    background: #71b247;
}

.ant-steps .ant-steps-item:not(.ant-steps-item-active)>.ant-steps-item-container[role='button']:hover .ant-steps-item-title,
.ant-steps .ant-steps-item:not(.ant-steps-item-active)>.ant-steps-item-container[role='button']:hover .ant-steps-item-subtitle,
.ant-steps .ant-steps-item:not(.ant-steps-item-active)>.ant-steps-item-container[role='button']:hover .ant-steps-item-description {
    color: #71b247;
}

.ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title::after {
    background-color: #71b247;
}
</style>
<style lang="less" scoped>
.goods-total {
    color: #666;
    font-size: 0.48rem;
}

.p-btns {
    position: relative;
    top: -1.5rem;
}

.goods-total .count {
    font-size: 18px;
    font-weight: 700;
}

.ftx-01,
.ftx01 {
    color: #e4393c;
}

.goods-total li:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.goods-total .txt {
    float: left;
    width: 4.9543rem;
    text-align: right;
    font-family: verdana;
}

.goods-total {
    display: block;
    padding: .7622rem;
}

.goods-total .label {
    float: left;
    width: 38rem;
    text-align: right;
}

.goods-list .grap {
    width: .7622rem;
}

.goods-list .first-tr td {
    border-top: none;
}

.goods-list td.grap {
    border-color: #fff;
}

.goods-list td a {
    color: #333;
}

.f-price {
    font-family: verdana;
}

.goods-list td {
    text-align: center;
    color: #333;
}

.root61 .goods-list td {
    padding: .6479rem 0 .7622rem;
}

.goods-list .p-tag span {
    padding: 1px 2px;
    color: #e4393c;
    border: 1px solid #e4393c;
    border-radius: 2px;
}

.mt10 {
    margin-top: .3811rem;
}

.goods-list .p-tag {
    clear: left;
    text-align: left;
    vertical-align: middle;
}

.goods-list .p-item:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.goods-list .p-info {
    float: left;
    margin-left: .5716rem;
    text-align: left;
    height: 2.3628rem;
    overflow: hidden;
}

.root61 .goods-list .p-info {
    width: 13.529rem;
}

.goods-list .p-img {
    float: left;
    width: 2.2866rem;
    height: 2.2866rem;
    border: 1px solid #eee;
}

.goods-list .p-item {
    margin-top: 3px;
    display: block;
}

.goods-list td {
    text-align: center;
    color: #333;
}

.goods-list .first-tr td {
    border-top: none;
}

.root61 .goods-list td {
    padding: 17px 0 20px;
}

.goods-list td.grap {
    border-color: #fff;
}

.root61 .goods-list .col-goods {
    width: 19.0549rem;
}

.goods-list .grap {
    width: 20px;
    padding: 0;
}

.tb-void {
    width: 100%;
}

.goods-list .tb-order {
    border-bottom: 1px solid #eee;
}

#container .mc {
    background: #fff;
    border: 1px solid #eee;
}

.goods-head {
    line-height: 24px;
    overflow: hidden;
}

.goods-list th {
    height: 1.2195rem;
    line-height: 1.2195rem;
    background: #f9f9f9;
    font-weight: 400;
    color: #333;
    text-align: center;
}

.order-goods {
    position: relative;
    z-index: 1;
}

.del_r {
    border-right: none !important;
}

.order-info .dd {
    color: #333;
    line-height: .7622rem;
}

.order-info:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.order-info .item:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.root61 .order-info .info-rcol {
    width: 6.7835rem;
}

.order-info .info-rcol {
    float: left;
    max-height: 2.7439rem;
    overflow: hidden;
}

.order-info .label {
    float: left;
    width: 3.2012rem;
    text-align: right;
}

.order-info .item {
    line-height: .9146rem;
    display: block;
}

.order-info .dt h4 {
    height: .9146rem;
    color: #333;
    line-height: .9146rem;
    font-size: .5335rem;
    font-weight: 400;
}

.order-info .dt {
    margin-bottom: 5px;
}

.order-info .dl {
    float: left;
    border-right: 1px solid #f1f1f1;
}

.root61 .order-info .dl {
    height: 10.9756rem;
    padding: 0 10px 0 1.1433rem;
    margin: 0 0 0 -1px;
    border-width: 0 0 0 1px;
}

h4 {
    text-align: left;
    text-indent: 0.5rem;
}

.dl {
    padding: 0 0.2rem;
}

.root61 .order-info-new .dl {
    width: 30%;
}

.ui-switchable-panel {
    width: 45rem;
    display: flex;
    box-sizing: border-box;
    padding: 0 1.2rem;
    justify-content: space-between;
    font-size: 0.45rem;
}

.root61 .order-info .ui-switchable-panel {
    width: 45rem;
    display: flex;
    justify-content: space-between;
}

.root61 .order-info .ui-switchable-body {
    height: 10.9756rem;
}

#container .order-info-mod .mc {
    border-top-width: 4px;
}

#container .mc {
    background: #fff;
    border: 1px solid #eee;
}

.root61 .order-info {
    height: 10.9756rem;
    overflow: hidden;
}

.order-info {
    display: block;
    position: relative;
    padding: 15px 0;
}

#container .m {
    margin-bottom: .7622rem;
}

.pj {
    font-weight: 700;
    width: 3.7348rem;
    padding: 4px 0 5px;
    display: block;
    margin: .3811rem auto 0;
    color: #e4393c;
    background: #fff;
    border: 1px solid #e4393c;
    height: 1rem;
    line-height: 0.7rem;
    border-radius: 2px;
}

.wc {
    font: 700 .9146rem/1.2957rem "Microsoft YaHei";
    color: #71b247;
    margin: 0.5rem 0;
}

.jind_box>div:nth-child(1) {
    text-align: center;
    flex: 30%;
    border-right: 1px solid #ddd;
}

.jind_box>div:nth-child(2) {
    flex: 70%;
    box-sizing: border-box;
    padding-left: 0.5rem;
    padding-top: 2rem;
}

.jind_box {
    width: 100%;
    display: flex;
    text-align: left;
    box-sizing: border-box;
    padding: 0.5rem;
    padding-top: 1rem;
    background-color: white;
    padding-bottom: 1rem;
    border-top: 3px solid #71b247;
}

.state_box_show_big_box:hover {
    .state_box_show {
        display: block !important;
    }
}

.state_box_show>div {
    padding: 0 0.5rem;
}

.state_box_show {
    background-color: white;
    position: absolute;
    width: 4rem;
    top: 0;
    display: none;
    box-shadow: 0 0 10px rgb(0 0 0/12%);
    left: -0.5rem;
}

.show_box:hover {
    .time_box {
        display: block !important;
    }
}

.time_box>div {
    padding-left: 0.5rem;
}

.time_box>div:hover,
.state_box_show>div:hover {
    background-color: #f5f5f5 !important;
    color: #e4393c;
}

.time_box {
    position: absolute;
    background-color: white;
    width: 5rem;
    left: -0.5rem;
    top: 0rem;
    display: none;
    box-shadow: 0 0 10px rgb(0 0 0/12%);
}

.ico_secahr {
    background-color: #f5f5f5;
    width: 1rem;
    text-align: center;
    border-left: 1px solid #ddd;
    line-height: 1rem;
}

.cmm_seach_box {
    margin-left: 10rem;
    display: flex;
    border: 1px solid #ccc;
    height: 1rem;

    div {
        margin-right: 0 !important;

    }

    input {
        text-indent: 0.2rem;
        height: 1rem;
    }
}

.fiter_box>div {
    font-size: 0.5rem;
}

.fiter_box {
    display: flex;
    line-height: 1.5rem;
    box-sizing: border-box;
    padding-left: 1rem;
    background-color: #f5f5f5;
    margin-top: 0.5rem;
}

.select_box_list_c {
    margin: 0 2rem;
    padding: 0 0.5rem;
    border-left: 1px dotted #ddd;
    font-weight: 700;
}

.select_box_list_item {
    color: #e4393c !important;
    font-weight: 700;
    border-bottom: 2px solid #e4393c;
}

.select_box_list {
    display: flex;

    div {
        margin-right: 0.5rem;
        font-size: 0.5rem;
    }
}

.cmmm_info_box {
    width: 100%;
    background-color: white;
    margin-top: 0.5rem;
    box-sizing: border-box;
    padding: 0.5rem;
    text-align: left;
}

.big_boxsd {
    width: 45rem;
}

.white_box_title {
    background-color: white;
    line-height: 2rem;
    height: 2rem;
    text-align: left;
    text-indent: 0.5rem;
    color: #666;
}
</style>