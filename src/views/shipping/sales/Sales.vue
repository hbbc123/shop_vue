<template>
    <div class="big_boxsd">
        <div class="mt mb10">
            <ul class="extra-l">
                <li class="fore-1" @click="data.select_key = 0" :class="data.select_key == 0 ? 'change_select' : ''">
                    <b>申请退款退货</b>
                </li>
                <li class="fore-2" @click="data.select_key = 1" :class="data.select_key == 1 ? 'change_select' : ''">
                    <b>申请退款退货记录</b>
                </li>
            </ul>
        </div>
        <div class="mc" v-if="data.select_key == 0">
            <table class="tb-void tb-top">
                <colgroup>
                    <col width="110">
                    <col width="">
                    <col width="70">
                    <col width="220">
                </colgroup>
                <thead>
                    <tr>
                        <th>订单编号</th>
                        <th>订单商品</th>
                        <th></th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in data.data" :key="key">
                        <td><span class="lh_box">{{item.indent_id}}</span>
                        </td>
                        <td>
                            <div class="list-h">
                                <ul class="ul_box">
                                    <li style="width:auto;">
                                        <div class="p-img" waretype="0">
                                            <img width="50" height="50" :title="item.commodity_info_title"
                                                :src="http + item.imgs">
                                        </div>
                                        <div class="btns">
                                            <span @click="router.push(`/shipping/salesinfo/${item.indent_id}`)">申请</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </td>
                        <td>
                            <span class="lh_box">
                                联系卖家
                            </span>
                        </td>
                        <td>
                            <div class="ftx03  c6">{{ item.send_time.slice(0, item.send_time.indexOf(' ')) }}<br>
                                {{ item.send_time.slice(item.send_time.indexOf(' ')) }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mc" v-else>
            <tbdoy>
            </tbdoy>
            <table class="tb-void tb-top">
                <colgroup>
                    <col width="120">
                    <col width="120">
                    <col width="">
                    <col width="120">
                    <col width="120">
                    <col width="110">
                </colgroup>
                <thead>
                    <tr>
                        <th>退货/退款编号</th>
                        <th>订单编号</th>
                        <th>商品名称</th>
                        <th>
                            <select @change="FnChangeSelect" v-model="data.one_time" class="selt" id="dateTypeId" style="width: 90px;">
                                <option value="0">最近三个月</option>
                                <option value="1">三个月以前</option>
                            </select>
                        </th>
                        <th>
                            <select @change="FnChangeSelect"  v-model="data.one_type" class="selt" id="stateTypeId" style="width: 90px;">
                                <option value="0">全部状态</option>
                                <option value="2">处理中</option>
                                <option value="1">已完成</option>
                            </select>
                        </th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,key) in data.data_y" :key="item.indent_id">
                        <td align="center" style="line-height: 1.3861rem;">
                            <span ></span>
                            {{item.sale_id}}
                        </td>
                        <td>
                            {{item.indent_id}}
                        </td>
                        <td>
                            <div class="p-name">
                               {{item.commodity_info_title}}
                            </div>
                        </td>
                        <td>{{item.send_time.slice(0,item.send_time.indexOf(' '))}}</td>
                        <td>
                            {{item.state==4||item.state==9||item.state==10||item.state==7?'已完成':'待处理'}}
                        </td>
                        <td class="sdf_chagn" @click="router.push(`/shipping/salesschedule/${item.indent_id}`)">
                            查看
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import request from '@/request/request';
import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons-vue';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const data = reactive({ select_key: 0, data: [], page_key: 1, data_y: [], one_time: 0, one_type: 0 })
const http = window.$http;
const router = useRouter()
const read = () => {
    request.get('/index/index/sales').then(res => {
        console.log(res);
        data.data = res.data.data
    })
}
function FnChangeSelect(e){
    read_change()
}

const read_change = () => {  //起床写出获取申请的列表
    let time;
    if (data.one_time == 0) {
        var date = new Date();
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        if (M - 3 < 1) {
            Y = Y - 1 + '-'
            M = (12 - (3 - M)) + '-'
        } else {
            Y = Y + '-'
            M = M - 3 + '-'
        }
        time = Y + M + D + h + m + s
    } else {
        time = false;
    }
    request.get('/index/index/returnlist', { time, type: parseInt(data.one_type) }).then(res => {
        console.log(res);
        data.data_y = res.data.data
    })
}
watch(() => data.select_key, (e) => {
    if (e == 0 && data.data.length == 0) {
        read()
    } else if (e == 1 && data.data_y.length == 0) {
        read_change()
    }
}, { immediate: true })
</script>
<style lang="less" scoped>
.sdf_chagn:hover {
    color: #e4393c !important;
}
.lh_box {
    display: inline-block;
}

.btns {
    margin-top: 0.2rem;
}

.ul_box {
    box-sizing: border-box;
    padding: 0.5rem;
    display: flex;
    margin-bottom: 0 !important;
}

.btns span {
    text-decoration: none;
    background-color: #f5fbef;
    color: #333;
    background-image: linear-gradient(to bottom, #f5fbef 0, #eaf6e2 100%);
    border-radius: .0762rem;
    display: inline-block;
    height: .686rem;
    line-height: 0.55rem;
    border: 1px solid #bfd6af;
    padding: .0762rem .5335rem .1143rem;
}

.mod-main .list-h li {
    float: left;
    padding: 0 10px;
    width: 60px;
}

.mod-main .list-h {
    overflow: hidden;
    zoom: 1;
}

.tb-void {
    width: 100%;
}

.mod-main .tb-void td {
    padding: .3811rem;
}

.tb-void td {
    border: 1px solid #f2f2f2;
}

.tb-void {
    line-height: .686rem;
    text-align: center;
    color: #333;
}

.tb-void th {
    background: #f5f5f5;
    height: 1.2195rem;
    line-height: 1.2195rem;
    padding: 0 .1905rem;
    text-align: center;
    font-weight: 400;
}

.extra-l {
    display: flex;
}

.change_select {
    padding-bottom: 0;
    color: #e4393c !important;
    border-bottom: 2px solid #e4393c;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
}

.extra-l {
    li {
        margin-right: 0.5rem;
    }
}

.mod-main .mt .extra-l li {}

.mod-comm .mt {
    padding: .3811rem 0;
    margin-bottom: .3811rem;
    overflow: hidden;
    zoom: 1;
}

.big_boxsd {
    width: 45rem;
    box-sizing: border-box;
    padding: .3811rem .7622rem .7622rem;
    background-color: white;

}
</style>