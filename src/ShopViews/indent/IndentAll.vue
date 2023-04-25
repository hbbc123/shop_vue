<template>
    <div>
        <a-modal v-if="data.son.sale_img" width="48rem" v-model:visible="visible" title="服务单信息" @ok="handleOk">
            <div class="f_info_bopx" data-v-eaad5d20="">
                <div class="mc" data-v-eaad5d20="">
                    <table class="tb-void tb-left" data-v-eaad5d20="">
                        <colgroup data-v-eaad5d20="">
                            <col width="110px" data-v-eaad5d20="">
                            <col data-v-eaad5d20="">
                        </colgroup>
                        <tbody data-v-eaad5d20="">
                            <tr data-v-eaad5d20="">
                                <td data-v-eaad5d20="">商品处理方式</td>
                                <td data-v-eaad5d20=""><strong data-v-eaad5d20="">{{ data.state <= 7 ? '退货' : '退款'
                                }}</strong>
                                </td>
                            </tr>
                            <tr data-v-eaad5d20="">
                                <td data-v-eaad5d20="">退款方式</td>
                                <td data-v-eaad5d20=""> 原返 </td>
                            </tr>
                            <tr data-v-eaad5d20="">
                                <td data-v-eaad5d20="">预计退款至</td>
                                <td data-v-eaad5d20=""> 余额 </td>
                            </tr>
                            <tr data-v-eaad5d20="">
                                <td data-v-eaad5d20="">申请原因</td>
                                <td data-v-eaad5d20="">{{ data.son.user_title }}</td>
                            </tr>
                            <tr data-v-eaad5d20="">
                                <td data-v-eaad5d20="">问题描述</td>
                                <td data-v-eaad5d20="">
                                    <div class="row6col2" data-v-eaad5d20="">{{ data.son.user_info }}</div>
                                </td>
                            </tr>
                            <tr data-v-eaad5d20="" v-if="data.son.sale_img.length > 0 || data.son.sale_videl.length > 0">
                                <td data-v-eaad5d20="">
                                    <div class="fu_title" data-v-eaad5d20=""> 附件 </div>
                                </td>
                                <td data-v-eaad5d20="">
                                    <div class="fujian_box" data-v-eaad5d20=""><img v-for="(item, key) in data.son.sale_img"
                                            :key="key" :src="http + item" alt="" srcset="" data-v-eaad5d20=""><video c
                                            v-for="(item, key) in data.son.sale_videl" :key="key" :src="http + item"
                                            data-v-eaad5d20=""></video></div>
                                </td>
                            </tr>
                            <tr data-v-eaad5d20="">
                                <td colspan="2" data-v-eaad5d20="">
                                    <div class="busdf_box" data-v-eaad5d20="">
                                        <div data-v-eaad5d20="">
                                            <div data-v-eaad5d20="" style="font-weight: 700;">退款金额:</div>
                                        </div>
                                        <div data-v-eaad5d20="">
                                            <div data-v-eaad5d20="" style="color: rgb(228, 57, 60); font-weight: 700;">
                                                {{ data.son.sale_money }}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </a-modal>
    </div>

    <a-table @expandedRowsChange="FnRowsChange" @change="FnPageChange"
        :pagination="{ total: data.sum, pageSize: 20, simple }" :dataSource="data.data" :columns="columns">
        <template #expandedRowRender>
            <a-table :pagination="false" :dataSource="data.son" :columns="columns_son" />
        </template>
    </a-table>
</template>
<script setup>
import { defineComponent, reactive, ref, defineProps } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import request from '@/request/request';
const store = useStore()
const data = reactive({ data: [], sum: 0, son: {} })
const current = ref(0)
const visible = ref(false);
const http = window.$http
const showModal = (indent_id) => {
    console.log(444);
    visible.value = true;

    request.get('/index/index/returnlistinfo', { indent_id }).then(res => {
        console.log(res);
        data.son = res.data.data
    })
};
const handleOk = e => {
    console.log(e);
    visible.value = false;
};
request.get('/index/index/shopindentall').then(res => {
    console.log(res);
    data.sum = res.data.sum
    data.data = res.data.data
})
function FnRowsChange(e) {
    console.log(e);
    if (e) {
        const s = data.data.filter((a) => a.indent_id == e)
        data.son = [...s]
    }
}
function FnPageChange({ current }) {
    request.get('/index/index/shopindentall', { offset: (current - 1) * 20 }).then(res => {
        console.log(res);
        data.sum = res.data.sum
        data.data = res.data.data
    })
}
const arr_state = [
    { text: '商家待发货', value: 0 },
    { text: '商家已发货', value: 1 },
    { text: '订单 已完成', value: 2 },
    { text: '退货申请中', value: 3 },
    { text: '退货申请同意', value: 4 },
    { text: '退货申请用户已发货', value: 5 },
    { text: '商家已收货', value: 6 },
    { text: '退货申请驳回', value: 7 },
    { text: '退款中', value: 8 },
    { text: '退款完成', value: 9 },
    { text: '退款申请驳回', value: 10 },
]
function FnState(e) {
    let str = '';
    switch (e) {
        case 0: str = '商家待发货'; break;
        case 1: str = '商家已发货'; break;
        case 2: str = '订单 已完成'; break;
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

const App = defineComponent({
    props: ['str', 'type', 'indent_id'],
    setup(props) {
        const confirm = (e) => {
            let min_type = 0;
            if (props.type == 0) {
                min_type = 1
            } else {
                min_type = 6
            }
            console.log(store.state.Root);
            if (store.state.Root) {
                request.post('/index/index/delivergoods', { indent_id: props.indent_id, state: min_type }).then(res => {
                    if (res.data.code == 200) {
                        message.success('操作成功');
                        request.get('/index/index/shopindentall').then(res => {
                            console.log(res);
                            data.sum = res.data.sum
                            data.data = res.data.data
                        })
                    }
                })
            } else {
                message.error('权限不足')
            }

        };
        return () => (
            <div >
                <APopconfirm
                    title={props.type == 0 ? '商品确认发货' : '确认收到用户退货商品'}
                    ok-text="确认"
                    cancel-text="取消"
                    onConfirm={confirm}
                >
                    <a-button onClick={() => showModal(props.indent_id)} type="primary">{props.str}</a-button>
                </APopconfirm >

            </div>
        );
    },
});
const apppost = (indent_id, state) => {
    if (store.state.Root) {
        request.post('/index/index/delivergoods', { indent_id, state }).then(res => {
            if (res.data.code == 200) {
                message.success('操作成功');
                request.get('/index/index/shopindentall').then(res => {
                    console.log(res);
                    data.sum = res.data.sum
                    data.data = res.data.data
                })
            }
        })
    }else {
        message.error('权限不足')
    }

}

const AppSon = defineComponent({
    props: ['str', 'type', 'indent_id'],
    setup(props) {
        const confirm = (e) => {
            let min_type = 0;
            if (props.type == 6) {
                min_type = 4
            } else {
                min_type = 9
            }
            apppost(props.indent_id, min_type)
        };
        const cancel = (e) => {
            let min_type = 0;
            if (props.type == 6) {
                min_type = 7
            } else {
                min_type = 10
            }
            apppost(props.indent_id, min_type)
        };
        return () => (
            <div >
                <APopconfirm
                    title={props.type == 6 ? '是否同意退款申请' : '是否同意退货申请'}
                    ok-text="同意"
                    cancel-text="驳回"
                    onConfirm={confirm}
                    onCancel={cancel}
                >
                    <a-button type="primary">{props.str}</a-button>
                </APopconfirm >
                <a-button type="primary" shape="circle">
                    详
                </a-button>
            </div>

        );
    },
});

const columns = [
    {
        title: '订单ID',
        dataIndex: 'indent_id',
    },
    {
        title: '用户名',
        dataIndex: 'nickname',
    },
    {
        title: '下单时间',
        dataIndex: 'send_time',
        sorter: (a, b) => new Date(a.send_time).getTime() - new Date(b.send_time).getTime(),
    },
    {
        title: '商品ID',
        dataIndex: 'cmm_id',
    },
    {
        title: '选择类型',
        dataIndex: 'typename',
    },
    {
        title: '原价',
        dataIndex: 'yuanmoney',
    },
    {
        title: '选择数量',
        dataIndex: 'sum',
    },
    {
        title: '优惠券抵扣',
        dataIndex: 'discounts',
    },
    {
        title: 'vip折扣金额',
        dataIndex: 'vip_z',
    },
    {
        title: '积分抵扣',
        dataIndex: 'cash',
    },
    {
        title: '最终价格',
        dataIndex: 'indent_sum',
        sorter: (a, b) => a.indent_sum - a.indent_sum,
    },
    {
        title: '订单状态',
        dataIndex: 'state',
        customRender: (s, j) => {
            const str = FnState(s.record.state)
            return s.record.state == 0 || s.record.state == 5 ?
                <App indent_id={s.record.indent_id} str={str} type={s.record.state}></App> :
                s.record.state == 6 || s.record.state == 8 ? <AppSon indent_id={s.record.indent_id} str={str} type={s.record.state} /> : s.record.state >= 3 ? <div >{str}<a-button onClick={() => showModal(s.record.indent_id)} style='margin-left:1rem' type="primary" shape="circle">
                    详
                </a-button></div> : str

        },
        filters: arr_state,
        onFilter: (value, record) => record.state === value
        ,
    }
]
const columns_son = [
    {
        title: '地址',
        dataIndex: 'site_region',
        customRender: (s, j) => {
            return s.record.site_region + s.record.site_info
        },
    },
    {
        title: '收货人',
        dataIndex: 'consignee',
    },
    {
        title: '联系方式',
        dataIndex: 'site_iphone',
    },
]
</script>
<style>
.ant-pagination-options {
    display: none !important;
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