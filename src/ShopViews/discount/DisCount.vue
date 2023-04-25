<template>
    <a-modal cancelText="取消" okText="关闭" style="width: 25rem;" v-model:visible="visible" title="详情" @ok="handleOk">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="优惠券名称" name="username">
                <a-input v-model:value="data.show_data.discount_title" />
            </a-form-item>
            <a-form-item label="优惠券内容" name="password">
                <a-input v-model:value="data.show_data.discount_info" />
            </a-form-item>
            <a-form-item label="使用条件" name="password">
                <a-input v-model:value="data.show_data.man_money" />
            </a-form-item>
            <a-form-item label="优惠内容" name="password">
                <a-input style="width: 10rem;" v-model:value="data.show_data.jian_money" />
                （小于一为折扣）
            </a-form-item>
            <a-form-item label="活动时间" name="commodity_info_title">
                <a-range-picker @change="FnDayTime" show-time v-model:value="activity_time" />
            </a-form-item>
            <a-form-item label="是否部分商品">
                <a-switch
                    @change="data.show_data.portion_tf == 0 ? data.show_data.portion_tf = 1 : data.show_data.portion_tf = 0"
                    :checked="data.show_data.portion_tf == 0" />
            </a-form-item>
            <a-form-item label="部分商品ID" name="password" v-if="data.show_data.portion_tf == 0">
                <div v-for="(item, key) in data.show_data.son" :key="key">
                    <a-select v-model:value="data.show_data.son[key].value" style="width: 120px" :options="data.commodity"
                        danger></a-select>
                    <a-button danger type="primary" shape="circle" @click="data.show_data.son.splice(key, 1)">
                        删
                    </a-button>
                </div>
                <a-button type="primary"
                    @click="data.show_data.son ? data.show_data.son.push({ ...data.show_data.son[0] }) : data.show_data.son = [{ ...data.commodity[0] }]">
                    添加
                </a-button>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" @click="FnSubMit">提交</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
    <a-table :pagination='false' :dataSource="data.data" :columns="columns" />
    <a-button type="primary" @click="visible = true; add_tf = true, data.show_data = {
        discount_info: '',
        discount_title: '',
        end_time: '',
        jian_money: '',
        portion_tf: 1,
        sen_time: '',
        ze_kou: '',

    }">
        添加
    </a-button>
</template>
<script setup>
import { defineComponent, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import request from '@/request/request';
import { useRouter } from 'vue-router';
const data = reactive({ data: [], commodity: [], show_data: null })
const activity_time = ref(null)
const add_tf = ref(false)
const activity_time_jie = ref([])//存放解析之后的活动时间
const router = useRouter()
const visible = ref(false)
function FnDayTime(e) {
    activity_time_jie.value[0] = dayjs(e[0].valueOf()).format('YYYY-MM-DD HH:mm:ss')
    activity_time_jie.value[1] = dayjs(e[1].valueOf()).format('YYYY-MM-DD HH:mm:ss')
}
function FnSubMit() {
    console.log(data.show_data);
    activity_time_jie.value[0] = dayjs(activity_time.value[0].valueOf()).format('YYYY-MM-DD HH:mm:ss')
    activity_time_jie.value[1] = dayjs(activity_time.value[1].valueOf()).format('YYYY-MM-DD HH:mm:ss')
    const obj = {
        discount_info: data.show_data.discount_info,
        discount_title: data.show_data.discount_title,
        portion_tf: data.show_data.portion_tf,
        sen_time: activity_time_jie.value[0],
        end_time: activity_time_jie.value[1],
        man_money: data.show_data.man_money,
    }
    if (data.show_data.portion_tf == 0) {
        obj.son = [];
        data.show_data.son.forEach(val => {
            obj.son.push(parseInt(val.value))
        });
    }
    if (data.show_data.jian_money.length > 0) {
        obj.jian_money = data.show_data.jian_money * 1
    } else {
        message.error('优惠内容不能为空')
        return
    }
    if (obj.discount_info && obj.discount_title && (obj.portion_tf == 0 || obj.portion_tf == 1) && obj.sen_time && obj.end_time && obj.man_money) {
        if (!add_tf.value) {
            obj.type = 0
            obj.discount_id = data.show_data.discount_id
        } else {
            obj.type = 1
        }
        request.post('/index/index/setshopdiscount', obj).then(res => {
            console.log(res);
            if (res.data.code == 200) {
                read()
                visible.value = false
                add_tf.value = false
            }
        })
    }



}
const columns = [
    {
        title: '优惠券ID',
        dataIndex: 'discount_id'
    },
    {
        title: '名称',
        dataIndex: 'discount_title'
    },
    {
        title: '内容',
        dataIndex: 'discount_info'
    },
    {
        title: '使用条件',
        dataIndex: 'man_money'
    },
    {
        title: '优惠内容',
        customRender: ({ index, record }) => record.ze_kou ? (record.ze_kou * 100) + '折' : '-' + record.jian_money
    },
    {
        title: '开始时间',
        dataIndex: 'sen_time'
    },
    {
        title: '结束时间',
        dataIndex: 'end_time'
    },
    {
        title: '是否部分商品',
        customRender: ({ index, record }) => record.son ? <div>
            商品ID
            {
                record.son.map(val => <div>{val.value}</div>)
            }
        </div> : '全部商品'
    },
    {
        title: '操作',
        customRender: ({ index, record }) => <a-button
            onClick={() => {
                data.show_data = data.data[index];
                visible.value = true;
                activity_time.value = [dayjs(Date.parse(data.show_data.sen_time)), dayjs(Date.parse(data.show_data.end_time))]
                data.show_data.jian_money = data.show_data.jian_money || data.show_data.ze_kou
            }}
            type="primary" shape="circle" >
            辑
        </a-button>
    },
]
function read() {
    request.get('/index/index/getshopdiscount').then(res => {
        console.log(res);
        data.data = res.data.data
        data.commodity = res.data.commodity
    })
}
read()
</script>
<style lang="less"></style>