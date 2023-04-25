<template>
    <div class="big_boxsd" v-if="data.data.indent_id">
        <div class="ssdfsdf-bvox">
            <div class="mt mb10">
                <ul class="extra-l">
                    <li class="fore-1  c6" style="margin-left: 0.3rem;position: relative;top: 0.2rem;">
                        申请服务详情
                    </li>
                </ul>
            </div>
            <div class="you_box" style="background-color: white;">
                <div>本次售后服务由<span class="ered_shop">
                        {{ data.data.shop_name }}
                    </span>为您提供</div>
                <div>
                    <div>
                        <img :src="http + '/user_img/123.jpeg'" alt="">
                    </div>
                    <div>
                        <div>
                            售后服务单号：{{ data.data.indent_id }}
                        </div>
                        <div>
                            {{ data.data.commodity_info_title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="jintu_g">
        <span>{{ FnState(data.data.state) }}</span>
    </div>
    <div class="info_box">
        <div class="c6">
            售后信息
        </div>
        <div style="margin-top: 0.5rem;">
            <a-steps :current="data.b_z" size="small">
                <a-step v-for="(item, key) in data.data.state < 8 ? data.arr_z : data.arr_o" :key="key"
                    :title="item.name" />
            </a-steps>
        </div>
        <div class="btn_fn">
            <div class="sdf_fa" v-if="data.data.state == 3" @click="FnEnter">确认发货</div>
            <div class="del_ding" @click="FnDelSale" v-if="data.data.state!=4||data.data.state!=7||data.data.state!=9||data.state!=10">
                删除服务单
            </div>
        </div>
    </div>
    <div class="f_info_bopx">
        <div class="xx">
            服务单信息
        </div>
        <div class="mc">
            <table class="tb-void tb-left">
                <colgroup>
                    <col width="110px">
                    <col>
                </colgroup>
                <tbody>
                    <tr v-if="data.data.state >= 8">
                        <td>商品返回方式</td>
                        <td>
                            <strong>上门取件</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>商品处理方式</td>
                        <td>
                            <strong>{{ data.data.state >= 8 ? '退款' : '退货' }}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>退款方式</td>
                        <td>
                            原返
                        </td>
                    </tr>
                    <tr>
                        <td>预计退款至</td>
                        <td>
                            余额
                        </td>
                    </tr>
                    <tr>
                        <td>申请原因</td>
                        <td>
                            {{ data.data.user_title }}
                        </td>
                    </tr>
                    <tr>
                        <td>问题描述</td>
                        <td>
                            <div class="row6col2">{{ data.data.user_info }}
                            </div>
                        </td>
                    </tr>
                    <tr v-if="data.data.sale_img.length > 0 || data.data.sale_videl.length > 0">
                        <td>
                            <div class="fu_title">
                                附件
                            </div>
                        </td>
                        <td>
                            <div class="fujian_box">
                                <img v-for="(item, key) in data.data.sale_img" :src="http + item" :key="key" alt=""
                                    srcset="">
                                <video Controls v-for="(item, key) in data.data.sale_videl" :src="http + item"
                                    :key="key"></video>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="busdf_box">
                                <div>
                                    <div style="font-weight: 700;">退款金额:</div>
                                    <div v-if="data.data.state==4||data.data.state==9">到账时间:</div>
                                </div>
                                <div>
                                    <div style="color: #e4393c; font-weight: 700;">¥{{ data.data.sale_money }}</div>
                                    <div v-if="data.data.state==4||data.data.state==9">{{ data.data.ent_time ? data.data.ent_time : '等待商家确认' }}</div>
                                </div>
                            </div>
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
import { message } from 'ant-design-vue';
import { reactive, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const data = reactive({
    select_key: 0, data: {}, b_z: 0,
    arr_z: [{ key: 3, name: '退货申请中' }, { key: 5, name: '已发货' }, { key: 6, name: '商家已收货' }],
    arr_o: [{ key: 8, name: '退款申请中' }],
})
const http = window.$http;
const router = useRouter()
const route = useRoute()
const { id } = route.params
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
function FnDelSale(){
    request.post('/index/index/delivergoods', { indent_id: data.data.indent_id, state: -1 }).then(res => {
        if (res.data.code == 200) {
            message.success('删除成功')
            setTimeout(()=>{
                router.go(-1)
            },500)
        }
    })
}

function FnEnter() {
    request.post('/index/index/delivergoods', { indent_id: data.data.indent_id, state: 5 }).then(res => {
        if (res.data.code == 200) {
            read()
        }
    })
}
const read = () => {
    request.get('/index/index/returnlistinfo', { indent_id: id }).then(res => {
        console.log(res);
        data.data = res.data.data

        if (res.data.data.state < 8) {
            let b_z;
            const arr_z = data.arr_z
            data.arr_z.forEach((val, k) => {
                if (val.key == res.data.data.state) {
                    b_z = k;
                }
            });
            if (res.data.data.state == 4 || res.data.data.state == 7) {
                b_z = 9;
                if (res.data.data.state == 4) {
                    arr_z.push({ key: 4, name: '退货申请已同意' })
                } else {
                    arr_z.push({ key: 8, name: '退款申请已驳回' })
                }
            }else {
                arr_z.push({ key: 8, name: '商家处理结果' })
            }
       
            data.b_z = b_z
            data.arr_z = arr_z
            console.log(b_z);
        } else {
            let b_z;
            const arr_o = data.arr_o
            data.arr_o.forEach((val, k) => {
                if (val.key == res.data.data.state) {
                    b_z = k;
                }
            });
            if (res.data.data.state == 9 || res.data.data.state == 10) {
                b_z = 9;
                if (res.data.data.state == 9) {
                    arr_o.push({ key: 9, name: '退货申请已同意' })
                } else if (res.data.data.state == 10) {
                    arr_o.push({ key: 10, name: '退货申请已驳回' })
                }
            } else if (res.data.data.state == 8) {
                arr_o.push({ key: 10, name: '等待商家同意' })
            }
            data.b_z = b_z
            data.arr_o = arr_o
        }
    })
}
read()
</script>
<style>
.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)>.ant-steps-item-container[role='button']:hover .ant-steps-item-icon .ant-steps-icon {
    color: #e43f3d;
}

.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)>.ant-steps-item-container[role='button']:hover .ant-steps-item-icon {
    border-color: #e43f3d;
}

.ant-steps-item-finish .ant-steps-item-icon {
    background-color: #fff;
    border-color: #e43f3d;
}

.ant-steps-item-process .ant-steps-item-icon {
    background-color: #fff;
    border-color: #e43f3d;
}

.ant-steps-item-finish .ant-steps-item-icon>.ant-steps-icon {
    color: #e43f3d;
}

.ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-icon {
    background: #e43f3d;
}

.ant-steps .ant-steps-item:not(.ant-steps-item-active)>.ant-steps-item-container[role='button']:hover .ant-steps-item-title,
.ant-steps .ant-steps-item:not(.ant-steps-item-active)>.ant-steps-item-container[role='button']:hover .ant-steps-item-subtitle,
.ant-steps .ant-steps-item:not(.ant-steps-item-active)>.ant-steps-item-container[role='button']:hover .ant-steps-item-description {
    color: #e43f3d;
}

.ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title::after {
    background-color: #e43f3d;
}
</style>
<style lang="less" scoped>
.fu_title {
    box-sizing: border-box;
    position: relative;
    top: -1.2rem;
}

.fujian_box {
    width: 100%;
    display: flex;

    img,
    video {
        width: 3rem;
        height: 3rem;
        margin-right: 0.2rem;
    }

}

.busdf_box>div:nth-child(1) {
    flex: 85%;
}

.busdf_box>div:nth-child(2) {
    flex: 15%;
}

.busdf_box {
    display: flex;

    div {
        line-height: 1rem;
        text-align: right;
    }
}

.repair-summary .summ-item .label {
    float: left;
    width: 180px;
    text-align: right;
}

.repair-summary {
    text-align: right;
    margin-right: 1rem;
}

td {
    padding: .3811rem;
    font-size: 0.50rem;
}

tr {
    text-align: left;
    text-indent: 0.2rem;

}

.xx {
    font-size: .503rem;
    color: #666;
    font-family: '\5b8b\4f53';
    line-height: .686rem;
}

.f_info_bopx {
    text-align: left;
    margin-top: 1rem;
    width: 45rem;
    box-sizing: border-box;
    padding: .3811rem .7622rem .7622rem;
    background-color: white;
}

.btn_fn>div:nth-child(1) {
    margin-right: 1rem;
    background: white;
    color: #333;
    border: 1px solid #ddd;
}

.btn_fn {
    display: flex;
    margin-top: 0.5rem;

    div {
        display: inline-block;
        vertical-align: middle;
        background: #e43f3d;
        padding: 0 .3811rem;
        height: .8003rem;
        line-height: .8003rem;
        color: #fff;
        border-radius: .0762rem;

    }
}

.info_box {
    box-sizing: border-box;
    width: 45rem;
    text-align: left;
    background-color: white;
    padding: .3811rem .7622rem .7622rem;
}

.ssdfsdf-bvox {
    box-sizing: border-box;
    background-color: white;
}

.jintu_g {
    width: 45rem;
    background-color: white;
    color: #7abd53;
    text-align: left;
    margin-top: 1rem;
    text-indent: 1rem;
    border-left: 2px solid #7abd53;
    height: 1.5rem;
    line-height: 1.5rem;
}

.ered_shop {
    color: #e4393c;
    font-weight: 700;
}

.you_box>div:nth-child(1) {
    flex: 30%;
    text-align: left;
    box-sizing: border-box;
    padding-right: 0.5rem;
    color: #666;
    font-size: .6rem;
    font-weight: 700;
    border-right: 1px solid #edd28b;
}

.you_box>div:nth-child(2) {
    flex: 70%;
    display: flex;
    box-sizing: border-box;
    padding-left: 0.5rem;

    img {
        width: 2rem;
        margin-right: 0.5rem;
    }

    line-height: 1rem;
}

.you_box {
    padding: 0.5rem;
    width: 100%;
    text-align: left;
    display: flex;
    background-color: #fffdee;
    border: 1px solid #edd28b;
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