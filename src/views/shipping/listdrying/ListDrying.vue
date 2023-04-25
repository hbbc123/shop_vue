<template>
    <div class="big_boxsd">
        <div class="white_box_title">
            待评价订单
        </div>

        <div class="cmmm_info_box">
            <div class="select_box_list">
                <div @click="data.select_key=0" :class="data.select_key==0?'selecgsdg_change':''" class="select_box_list_item por">待评价订单
                </div>
                <div v-if="data.dai_sum>0">
                    <a-badge class="sdf_hui" :count="data.dai_sum" />
                </div>
                <div @click="data.select_key=1" :class="data.select_key==1?'selecgsdg_change':''"  class="select_box_list_item por">待追评
                </div>
                <div v-if="data.dai_zhui_sum>0">
                    <a-badge class="sdf_hui" :count="data.dai_zhui_sum" />
                </div>
                <div class="cmm_seach_box">
                    <input v-model="data.input_val" type="text" placeholder='商品名称/商品编号/订单号'>
                    <div class="ico_secahr" @click="FnInputFilter">
                        <search-outlined />
                    </div>
                </div>
            </div>
            <div class="fiter_box ">
                <div style="margin-left: 9rem;">
                    订单详情
                </div>
                <div style="margin-left: 13rem;">
                    收货人
                </div>
                <div style="margin-left: 4rem;">
                    金额
                </div>
                <div style="margin-left: 3.5rem;" class="por state_box_show_big_box">
                    {{ data.select_key == 0 ? '全部状态' : data.select_key == 1 ? '等待收货' : '待评价' }}<span>
                        <DownOutlined />
                    </span>
                    <div class="state_box_show">
                        <div @click="data.select_key = 0">
                            全部状态<up-outlined />
                        </div>
                        <div @click="data.select_key = 1">
                            等待收货
                        </div>
                        <div @click="data.select_key = 2">
                            待评价
                        </div>
                    </div>
                </div>
                <div style="margin-left: 3.5rem;">
                    操作
                </div>
            </div>
            <div v-if="!data.change_show">
                <CList v-for="(item, key) in data.data.slice((data.page_key - 1) * 10, (data.page_key) * 10)" :key="key"
                    :data="item" />
                <a-pagination v-if="data.data.length > 10" @change="showSizeChange_son" :total="data.data.length"
                    :pageSize="10" :pageSizeOptions="['10']" />
            </div>
        </div>
    </div>
</template>
<script setup>
import request from '@/request/request';
import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons-vue';
import { reactive, ref, watch } from 'vue';
import CList from '../compoents/CList.vue'
const data = reactive({dai_sum:0,dai_zhui_sum:0, select_key: 0, data: [], page_key: 1, yuan_data: [], change_show: false,
data_zhui_data:[]
})
watch(() => data.select_key, (e) => {
    if (e == 0) {
        data.data = data.yuan_data
    }else if(e==1){
        data.data=data.data_zhui_data
    }
})
request.get('/index/index/additionalreview').then(res=>{
    console.log(res);
    data.dai_zhui_sum=res.data.data.length
    data.data_zhui_data=res.data.data
})

function read(e) {
    request.get('/index/index/usermenu', { time: e }).then(res => {
        const min_arr = []
        let i = 0;
        res.data.data.forEach(val => {
            if (val.evaluate_tf == 0 && val.state == 2) {
                min_arr.push(val)
                i++
            }
        })
        data.data = [...min_arr]
        data.yuan_data = [...min_arr]
        data.dai_sum = i
    })
}
function showSizeChange_son(e, y) {
    data.page_key = e
}
function FnInputFilter() {
    const min_arr = []
    if (data.input_val.length > 0) {
        data.data.forEach(val => {
            if (val.commodity_info_title.indexOf(data.input_val) != -1) {
                min_arr.push(val)
            }
        })
        data.data = min_arr
    } else {
        data.data = data.yuan_data
    }

}
read(FnTime(3, -1))
function FnTime(Z, type) {
    var date = new Date();
    var Y = date.getFullYear();
    let big = null;
    if (type == -1) {
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        if (M - Z < 1) {
            Y = Y - 1 + '-'
            M = (12 - (Z - M)) + '-'
        } else {
            Y = Y + '-'
            M = M - Z + '-'
        }
        big = Y + M + D + h + m + s
    } else {
        var date = new Date();
        big = (Y - type) + '-01' + '-01' + ' 00:' + '00' + ':00'
    }
    return big
}
</script>

<style >
.ant-pagination-prev:hover button,
.ant-pagination-next:hover button {
    border-color: #e33b3d !important;
    color: #e33b3d !important;
}

.ant-pagination-next:hover,
.ant-pagination-prev:hover {
    color: #e33b3d !important;
    background-color: #f7f7f7 !important;
    border: 1px solid #ddd !important;
    box-shadow: 1px 1px 2px rgb(0 0 0 / 10%) !important;
}

.ant-pagination-item:hover a {
    color: #e33b3d !important;
}

.ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon,
.ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
    color: #e33b3d !important;
}

.ant-pagination-options {
    color: red;
    display: none !important;
}

.ant-pagination-item {
    color: #333333 !important;
    background-color: #f7f7f7;
    border: 1px solid #ddd !important;
}

.ant-pagination-item:hover {
    box-shadow: 1px 1px 2px rgb(0 0 0 / 10%) !important;
    color: #e33b3d !important;
}

.ant-pagination-item-active a {
    color: #e33b3d !important;
}
</style>
<style lang="less" scoped>
.selecgsdg_change{
    border-bottom: 2px solid #e4393c !important; 
}
.sdf_hui {
    margin-left: 0.1rem;
    
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
    display: flex;
    color: #e4393c !important;
    font-weight: 700;
    margin-left: 1rem;
   
}

.select_box_list {
    display: flex;

    div {
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