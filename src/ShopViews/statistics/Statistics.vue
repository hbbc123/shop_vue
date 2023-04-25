<template>
    <a-descriptions title="店铺统计图" bordered>
        <a-descriptions-item label="店铺粉丝">{{ data.data.attention }}</a-descriptions-item>
        <a-descriptions-item label="上架商品数">{{ data.data.shang_sum }}</a-descriptions-item>
        <a-descriptions-item label="下架商品数">{{ data.data.xia_sum }}</a-descriptions-item>
        <a-descriptions-item label="店铺资金">{{ data.data.shop_money }}</a-descriptions-item>
        <a-descriptions-item label="托管资金">{{ data.data.money }}</a-descriptions-item>
        <a-descriptions-item label="店铺积分">{{ data.data.shop_jf }}</a-descriptions-item>
        <a-descriptions-item label="托管积分">{{ data.data.jf }}</a-descriptions-item>
        <a-descriptions-item label="总销量">{{ data.data.xiao_zong }}</a-descriptions-item>
        <a-descriptions-item label="总销量金额">{{ data.data.xiao_sum }}</a-descriptions-item>
        <a-descriptions-item label="总退款数量">{{ data.data.tui_zong }}</a-descriptions-item>
        <a-descriptions-item label="待退款/退货数量">{{ data.data.dai_zong ? data.data.dai_zong : '0' }}</a-descriptions-item>
        <a-descriptions-item label="待退款/退货金额">{{ data.data.dai_sum ? data.data.dai_sum : '0' }}</a-descriptions-item>
        <a-descriptions-item label="售后评分">{{ data.data.after_score }}</a-descriptions-item>
        <a-descriptions-item label="商品评分">{{ data.data.service_score }}</a-descriptions-item>
        <a-descriptions-item label="物流评分">{{ data.data.logistics_score }}</a-descriptions-item>
        <a-descriptions-item label="销量统计图">
            <a-select style="width: 5rem;" v-model:value="data.day" :options="options1"></a-select>
            <div class="ec" ref="ec_ref"></div>
        </a-descriptions-item>
    </a-descriptions>
</template>
<script setup>
import { defineComponent, reactive, ref, watch } from 'vue';
import request from '@/request/request';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
const data = reactive({ data: {}, day: 7, day_arr: [], ec: {} })
const ec_ref = ref(null)
const options1 = [
    {
        label: '7天',
        value: 7
    },
    {
        label: '半个月',
        value: 15
    },
    {
        label: '一个月',
        value: 30
    },
    {
        label: '半年',
        value: 180
    },
    {
        label: '一年',
        value: 360
    },
]
watch(() => data.day, (e) => {
    raed_e(data.day)
}, { immediate: true })
function raed_e(day) {
    request.get('/index/index/echartsshop', { day }).then(res => {
        console.log(res);
        data.ec = res.data.data
        var chartDom = ec_ref.value;
        var myChart = echarts.init(chartDom);
        var option;
        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['销量', '销售金额', '退款数', '退款金额', 'Search Engine']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.day_arr
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '销量',
                    type: 'line',
                    stack: 'Total',
                    data: data.ec.xzong
                },
                {
                    name: '销售金额',
                    type: 'line',
                    stack: 'Total',
                    data: data.ec.xsum
                },
                {
                    name: '退款数',
                    type: 'line',
                    stack: 'Total',
                    data: data.ec.tzong
                },
                {
                    name: '退款金额',
                    type: 'line',
                    stack: 'Total',
                    data: data.ec.tsum
                },
            ]
        };

        option && myChart.setOption(option);
    })
}
raed_e()
const format = time => {
    const date = new Date(time)

    const year = date.getFullYear()
    const month = date.getMonth() + 1 // 月份是从0开始的
    const day = date.getDate()
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    const newTime =
        year +
        '-' +
        (month < 10 ? '0' + month : month) +
        '-' +
        (day < 10 ? '0' + day : day)
    return newTime
}
watch(() => data.day, () => {
    const arr_min = []
    var timestamp = (new Date()).getTime();
    for (let i = 0; i < data.day; i++) {
        var onday = 1000 * 60 * 60 * 24 * i
        arr_min.unshift(format(timestamp - onday))
    }
    data.day_arr = arr_min
}, { immediate: true })




request.get('/index/index/shopstatistics').then(res => {
    console.log(res);
    if (res.data.code == 200) {
        data.data = res.data.data
    }
})
</script>
<style lang="less" scoped>
.ec {
    width: 20rem;
    height: 10rem;
}

.fen_si_box {
    display: inline-block;

}

.bigs_box {
    width: 100%;
    text-align: left;

}
</style>