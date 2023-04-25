<template>
    <a-modal cancelText="取消" okText="关闭" v-model:visible="visible" title="添加成员" @ok="handleOk">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="用户ID" name="username">
                <a-input v-model:value="data.show_data.user_id" />
            </a-form-item>
            <a-form-item label="角色" name="username">
                <a-select v-model="data.show_data.shop_post" :options="options1"></a-select>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
                <a-button type="primary" @click="FnFromAdd">添加</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
    <a-table :pagination="false" :dataSource="data.data" :columns="columns" />
    <a-button @click="FnAdd" type="primary">
        新增成员
    </a-button>
</template>
<script setup>
import { defineComponent, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import request from '@/request/request';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore()
const data = reactive({ data: [], show_data: {} })
const router = useRouter()
const visible = ref(false)
const handleOk = e => {
    visible.value = false;
};
function FnFromAdd() {
    console.log(data.show_data);
    const obj = {
        type: 2,
        user_id: data.show_data.user_id,
        shop_post: data.show_data.shop_post
    }
    if (obj.user_id && (obj.user_id * 1 == parseInt(obj.user_id)) && obj.shop_post) {
        post(obj)
        visible.value = false
        data.show_data = {}
    } else {
        message.error('ID为数字')
        return
    }
}
function FnAdd() {
    visible.value = true;
    data.show_data = {
        user_id: '',
        shop_post: 1,
    }
}
function read() {
    request.get('/index/index/getshopjue').then(res => {
        console.log(res);
        res.data.data.forEach((val, k) => {
            res.data.data[k].show = false
        })
        data.data = res.data.data
    })
}
read()
const options1 = [

    {
        value: 1,
        label: '管理员',
    },
    {
        value: 2,
        label: '客服',
    },
]
function post(obj) {
    request.post('/index/index/setshopjue', obj).then(res => {
        if (res.data.code == 200) {
            read()
        } else {
            message.error(res.data.msg)
        }
    })
}
function FnSubMit(e) {
    data.data[e].show = false
    const obj = {
        type: 0,
        user_id: data.data[e].user_id,
        shop_post: data.data[e].shop_post
    }
    if (obj.type && obj.user_id && obj.shop_post) {
        post(obj)
    }

}
function FnSelectChange(e, k) {
    data.data[k].shop_post = e
}
function FnDelC(e) {
    const obj = {
        type: 1,
        user_id: data.data[e].user_id,
    }
    if (obj.type && obj.user_id) {
        post(obj)
    }

}

const columns = [
    {
        title: '用户ID',
        dataIndex: 'user_id',
    },
    {
        title: '用户昵称',
        dataIndex: 'nickname',
    },
    {
        title: '用户角色',
        customRender: ({ index, record }) => data.data[index].show.shop_post != 0 && data.data[index].show ? <a-select select
            value={record.shop_post}
            style="width: 120px"
            onChange={(e) => FnSelectChange(e, index)}
            options={options1}
        ></a-select >
            : record.shop_post == 0 ? '所有者' : record.shop_post == 1 ? '管理员' : '客服'
    },
    {
        title: '辑',
        customRender: ({ index, record }) => !data.data[index].show ? <a-button disabled={data.data[index].shop_post != 0 ? false : true} onClick={(e) => { data.data[index].show = true }} type="primary" shape="circle">
            辑
        </a-button> : <div>
            <a-button style='margin-right:1rem' onClick={(e) => { FnDelC(index) }} type="primary" shape="circle" danger>
                删
            </a-button>
            <a-button onClick={(e) => { FnSubMit(index) }} type="primary" >
                完成
            </a-button>
        </div>
    },
]


</script>
<style lang="less"></style>