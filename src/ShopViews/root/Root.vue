<template>
    <a-collapse>
        <a-collapse-panel key="1" header="所有者" @click="FnChange(0)">
            <a-table :pagination="false" :data-source="data.show_data" :columns="columns">
            </a-table>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="管理员" @click="FnChange(1)">
            <a-table :pagination="false" :data-source="data.show_data" :columns="columns">
            </a-table>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="客服" @click="FnChange(2)">
            <a-table :pagination="false" :data-source="data.show_data" :columns="columns">
            </a-table>
        </a-collapse-panel>
    </a-collapse>
</template>
<script setup>
import { defineComponent, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import request from '@/request/request';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore()
const set = ref(false)
const data = reactive({ data: [], show_data: [] })
const router = useRouter()
function read() {
    request.get('/index/index/getshoproot').then(res => {
        console.log(res);
        res.data.data.forEach((val, k) => {
            res.data.data[k].show = false
        })
        data.data = res.data.data
    })
}
read()
function FnInputChange(e, index, type) {
    if (type == 0) {
        data.show_data[index].r_root = e.target.value
    } else if (type == 1) {
        data.show_data[index].s_root = e.target.value
    }
}

const columns = [
    {
        title: '页面路由',
        dataIndex: 'site',
    },
    {
        title: '查看权限',
        dataIndex: 'r_root',
        customRender: ({ index, record }) => data.show_data[index].show ? <a-input onChange={(e) => FnInputChange(e, index, 0)} style='width:5rem' value={data.show_data[index].r_root} /> : record.r_root
    },
    {
        title: '修改权限',
        dataIndex: 's_root',
        customRender: ({ index, record }) => data.show_data[index].show ? <a-input onChange={(e) => FnInputChange(e, index, 1)} style='width:5rem' value={data.show_data[index].s_root} /> : record.s_root
    },
    {
        title: '编辑',
        customRender: ({ index, record }) => !data.show_data[index].show ? <a-button onClick={(e) => { data.show_data[index].show = true }} type="primary" shape="circle">
            辑
        </a-button> : <a-button onClick={() => { FnSubMit(index) }} type="primary" >
            完成
        </a-button>
    },
];
function FnSubMit(e) {
    console.log(data.show_data[e]);
    data.show_data[e].show = false
    const obj = {
        r_root: data.show_data[e].r_root,
        s_root: data.show_data[e].s_root
    }
    if ((obj.r_root && (parseInt(obj.r_root) == obj.r_root * 1) && obj.r_root * 1 <= 2)
        && (obj.s_root && (parseInt(obj.s_root) == obj.s_root * 1) && obj.s_root * 1 <= 2)) {
        obj.r_root = parseInt(obj.r_root)
        obj.s_root = parseInt(obj.s_root)
        obj.shop_member_root_id = parseInt(data.show_data[e].shop_member_root_id)
        request.post('/index/index/setshoproot', obj).then(res => {
            console.log(res);
            if (res.data.code == 200) {
                read()
                const i = store.state.i + 1;
                store.commit('Set_i', i)
                console.log(store.state.i);
            }
        })

    } else {
        message.error('请输入数字且不大于2')
    }
}
function FnChange(e) {
    const arr = [];
    data.data.forEach(val => {
        if (val.r_root >= e) {
            arr.push(val)
        }
    })
    data.show_data = arr
}

</script>
<style lang="less"></style>