<template>
    <div class="big_boxsd">
        <div class="white_box_title">
            <div @click="data.select_key = 0" :class="data.select_key == 0 ? 'select_Calss' : ''"
                class="sdf_box_white_box_title">
                我的积分
            </div>
            <div @click="data.select_key = 1" :class="data.select_key == 1 ? 'select_Calss' : ''"
                class="sdf_box_white_box_title">
                积分明细
            </div>
        </div>
        <div class="two_box" v-if="data.select_key == 0">
            <div>
                <div class="my_d">
                    我的积分
                </div>
                <div class="bi-icon">

                </div>
                <div class="bi-number">
                    {{ data.data.my_integral }}
                </div>
            </div>
            <div class="bean-stats">
                <div class="bs-hd">
                    <h5>最近三个月京豆统计</h5>
                    <div>开通PLUS会员, 10倍 购物返京豆 >
                    </div>
                </div>
                <div class="bs-bd">
                    <ul class="stats-list">
                        <li>
                            <div class="s-label">购物返豆</div>
                            <div class="s-value">
                                <strong>
                                    +{{ data.data.rework }}
                                </strong>
                            </div>
                        </li>
                        <li>
                            <div class="s-label">评价晒单返豆</div>
                            <div class="s-value">
                                <strong>
                                    +{{ data.data.comment }}
                                </strong>
                            </div>
                        </li>
                        <li>
                            <div class="s-label">其它返豆</div>
                            <div class="s-value">
                                <strong>
                                    +0.00
                                </strong>
                            </div>
                        </li>
                        <li>
                            <div class="s-label">京豆支付订单数</div>
                            <div class="s-value"><strong>{{ data.data.cmm_sum }}</strong>单</div>
                        </li>
                        <li>
                            <div class="s-label">京豆抵扣节省</div>
                            <div class="s-value"><strong>{{ (data.data.jie_sum/100).toFixed(2) }}</strong>元</div>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
        <div class="main-module module-details">
            <div class="bean-details">
                <div class="details-hd">
                    <h5 class="details-title">最近京豆明细{{ data.select_key == 1 ? '  (全部)' : '(仅展示最近三个月)' }}</h5>
                </div>
                <div class="details-bd">

                    <table class="bean-details-table">
                        <thead>
                            <tr>
                                <th class="c1">时间</th>
                                <th class="c2">收入/支出(积分)</th>
                                <th class="c3">详细说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, key) in data.data.data" :key="key">
                                <td class="c1">{{ item.time }}</td>
                                <td class="c2"><span class="ftc01">{{ item.z == 0 ? parseInt(-item.money) : '+' + parseInt(item.money)
                                }}</span></td>
                                <td class="c3">{{ item.msg }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="data.select_key==0" @click="data.select_key=1" class="view-all ftc02" style="color: #005ea7;">
                        查看全部明细&gt;
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import request from '@/request/request';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const router = useRoute()
const http = window.$http;
const data = reactive({ data: {}, select_key: 0 })
watch(() => data.select_key, (e) => {
    let time = false;
    if (e == 0) {
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
    request.get('/index/index/userintegral', { time }).then(res => {
        console.log(res);
        data.data = res.data
    })
}, { immediate: true })

</script>
<style lang="less" scoped>
.c1,
.c3 {
    color: #666;
}

.ftc01 {
    color: #e4393c;
    font-size: .5335rem;
    font-weight: 700;

}

.bean-details-table td.c2 {
    font-weight: 700;
}

.root61 .bean-details-table .c1 {
    width: 10.0991rem;
}

.bean-details-table .c1 {
    padding-left: 1.5244rem;
    padding-right: 1.5244rem;
    text-align: left;
}

.bean-details-table td {
    line-height: .9146rem;
    padding: .3049rem 0;
    border-bottom: 1px solid #f5f5f5;
}

.bean-details-table .c1 {
    width: 10.0991rem;

    padding-left: 1.5244rem;
    padding-right: 1.5244rem;
    text-align: left;
}

.bean-details-table th {
    height: 1.1433rem;
    line-height: 1.1433rem;
    font-weight: 400;
    color: #434343;
    background: #f8f6f6;
}

thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
}

.bean-details-table {
    width: 100%;
    font-size: .5335rem;
}

table {
    border-collapse: collapse;
}

table {
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: grey;
}

.bean-details .details-bd {
    width: 100%;
    overflow: hidden;
}

.m-help-tips em {
    display: inline-block;
    height: 16px;
    vertical-align: top;
    color: #005ea7;
}

.bean-details .details-hd {
    width: 100%;
    height: .9527rem;
    margin-bottom: .4573rem;
    overflow: hidden;
}

.bean-details .details-hd .m-help-tips {
    float: right;
    margin-top: 4px;
}

.bean-details .details-title {
    float: left;
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    color: #333;
}

.module-details {
    padding: .5716rem .7622rem;
}

.main-module {
    margin-bottom: .3811rem;
    background: #fff;
}

.s-value {
    line-height: 2rem;
    font-size: 1.1433rem;
}

.stats-list li {
    box-sizing: content-box;
    height: 3.3155rem;
    padding-top: 1.3338rem;
    border-bottom: 1px solid #f5f5f5;
    overflow: hidden;
}

.stats-list li {
    width: 6.8598rem;
}

.stats-list {
    height: 9.3369rem;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
}

.bs-hd {
    height: 1.6768rem;
    line-height: 1.5244rem;
    padding-top: .7622rem;
    overflow: hidden;
    box-sizing: content-box;

    h5 {
        position: relative;
        float: left;
        margin-right: .9146rem;
        font-size: .6098rem;
    }

    div {
        font-size: .5335rem;
        text-align: left;
    }

    div:hover {
        color: #e4393c;
    }
}

.bean-stats {
    padding-left: 1.3338rem;
}

.bi-number {
    line-height: 1.753rem;
    font-size: 1.372rem;
    font-family: "Helvetica Neue", verdana, arial, sans-serif;
}

.bi-icon {
    display: block;
    width: 3.9634rem;
    height: 2.2866rem;
    margin: 0 auto;
    overflow: hidden;
    background: url('../../../assets/img/sprite-bean.png');
}

.my_d {
    width: 100%;
    text-align: center;
    height: 1.5244rem;
    line-height: 1.5244rem;
    margin-bottom: 1.029rem;
    font-size: .7622rem;
}

.two_box>div:nth-child(1) {
    border-right: 1px solid #eee;
    flex: 35%;
}

.two_box>div {
    flex: 65%;
    padding-top: 1rem;
}

.two_box {
    margin-top: 1rem;
    width: 45rem;
    display: flex;
    background-color: white;
}

.select_Calss {
    border-bottom: 2px solid #e4393c;
    color: #e4393c;

}

.big_boxsd {
    width: 45rem;
}

.white_box_title {
    background-color: white;
    line-height: 2rem;
    height: 2rem;
    text-align: left;
    color: #333;
    display: flex;
    text-align: center;

}

.sdf_box_white_box_title {
    height: 1.5rem;
    margin-left: 0.5rem;
    width: 2.7rem;
}
</style>