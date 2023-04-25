<template v-if="data.data">
    <a-modal v-model:visible="visible" title="编辑" @ok="handleOk" cancelText="取消" okText="关闭">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="商类ID" name="store_commodity_id">
                <a-input v-model:value="data.show_data.store_commodity_id" disabled="true" />
            </a-form-item>

            <a-form-item label="商品折扣" name="ze">
                <a-input v-model:value="data.show_data.ze" />
            </a-form-item>
            <a-form-item label="VIP折扣" name="ze">
                <a-input v-model:value="data.show_data.vip" />
            </a-form-item>
            <a-form-item label="所在店铺频道" name="name">
                <a-cascader v-model:value="data.show_data.pd" :options='data.category' />
            </a-form-item>
            <a-form-item label="选择提示" name="name" v-if="data.show_data.store_commodity_data">
                <a-input style="width: 8rem;margin-right: 0.5rem;"
                    v-model:value="data.show_data.store_commodity_data.name" />

            </a-form-item>
            <a-form-item label="选择提示" name="name" v-if="!data.show_data.store_commodity_data">
                <a-button type="primary" @click="FnAddInfo(0)">添加</a-button>
            </a-form-item>
            <a-form-item label="商品归类" name="ze" v-if="data.show_data.store_commodity_data">
                <a-table :pagination='false' :dataSource="data.show_data.store_commodity_data.data"
                    :columns="columns_data" />
                <a-button type="primary" @click="FnAddInfo(2)">添加</a-button>
            </a-form-item>
            <a-form-item label="商品归类" name="ze" v-if="!data.show_data.store_commodity_data">
                <a-button type="primary" @click="FnAddInfo(1)">添加</a-button>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" @click="FnSubMit" :disabled='!store.state.Root'>提交</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
    <a-table :dataSource="data.data" :columns="columns" />
    <a-button type="primary" @click="FnAddS" :disabled='!store.state.Root'>新增</a-button>
</template>
<script setup>
import { defineComponent, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';
import request from '@/request/request';
import { useRouter } from 'vue-router';
const data = reactive({ data: [], category: [], cmm_id: [], show_data: {} })
const router = useRouter()
const store = useStore()
const visible = ref(null)
const add_cmm = ref(false)
function FnAddS() {
    visible.value = true
    add_cmm.value = true
    data.show_data = {
        store_commodity_id: null,
        ze: null,
        vip: null,
        pd: [],
        store_commodity_data: {
            name: null,
            data: [{
                name: null,
                commodity_info_id: null,
            }]
        }

    }
}
watch(visible, () => {
    if (visible.value == false) {
        add_cmm.value = false
        read()
    }
})
function FnDelC(k) {
    data.show_data.store_commodity_data.data.splice(k, 1)
}
function FnAddInfo(type) {
    if (type == 0) {
        data.show_data.store_commodity_data = { name: '', data: [{ name: '', commodity_info_id: null }] }
    } else if (type == 1) {
        data.show_data.store_commodity_data = { name: '', data: [{ name: '', commodity_info_id: null }] }
    } else if (type == 2) {
        data.show_data.store_commodity_data.data.push({ name: '', commodity_info_id: null })
    }
}
function FnSubMit() {
    console.log(data.show_data);
    const info = data.show_data
    const obj = {}
    if (info.store_commodity_data) {
        if (info.store_commodity_data.name) {
            if (info.store_commodity_data.data) {
                for (let i = 0; i < info.store_commodity_data.data.length; i++) {
                    if (info.store_commodity_data.data[i].name, info.store_commodity_data.data[i].commodity_info_id) {
                    } else {
                        message.error('归类中名称和所属商品ID不能为空')
                        return
                    }
                }
                obj.store_commodity_data = info.store_commodity_data;
            }
        } else {
            message.error('必须填写选择提示')
            return
        }
    } else {
        message.error('必须填写归类')
        return
    }
    if (!info.pd) {
        message.error('必须填写所属店铺频道')
        return
    } else {
        obj.store_channel_id = info.pd[1];
    }
    if (info.vip) {
        if (info.vip * 1 == Math.floor(info.vip * 100) / 100) {
            if (info.vip * 1 <= 1 && info.vip * 1 >= 0.3) {
                obj.vip = info.vip * 1
            } else {
                message.error('0.3<=数值<=1')
                return
            }
        } else {
            message.error('请输入数值')
            return
        }
    }
    if (info.ze) {
        if (info.ze * 1 == Math.floor(info.ze * 100) / 100) {
            if (info.ze * 1 <= 1 && info.ze * 1 >= 0.3) {
                obj.ze = info.ze * 1
            } else {
                message.error('0.3<=数值<=1')
                return

            }
        } else {
            message.error('请输入数值')
            return
        }
    }
    if (!add_cmm.value) {
        obj.type = 0
        obj.store_commodity_id = info.store_commodity_id
    } else {
        obj.type = 1
    }
    if (store.state.Root) {
        request.post('/index/index/upadstorecommodity', obj).then(res => {
            console.log(res);
            if (res.data.code == 200) {
                visible.value = false
                data.show_data = {}
                read()
            }
        })
    }
    console.log(obj);
}
function FnInputChange(e, key, type) {
    if (type == 0) {
        data.show_data.store_commodity_data.data[key].name = e.target.value
    } else if (type == 1) {
        data.show_data.store_commodity_data.data[key].commodity_info_id = e[0]
    }
}
const columns_data = [
    {
        title: '名称',
        dataIndex: 'name',
        customRender: ({ index, record }) => <a-input onChange={(e) => FnInputChange(e, index, 0)} value={data.show_data.store_commodity_data.data[index].name} />
    },
    {
        title: '所属商品ID',
        dataIndex: 'commodity_info_id',
        customRender: ({ index, record }) => <a-cascader onChange={(e) => FnInputChange(e, index, 1)} value={data.show_data.store_commodity_data.data[index].commodity_info_id} options={data.cmm_id} />
    },
    {
        title: '名称',
        dataIndex: 'name',
        customRender: ({ index, record }) => <a-button onClick={() => { FnDelC(index) }} type="primary" shape="circle" danger>
            删
        </a-button>
    },
]
const columns = [
    {
        title: '商类ID',
        dataIndex: 'store_commodity_id',
    },
    {
        title: '商品折扣',
        dataIndex: 'ze',
    },
    {
        title: 'VIP折扣',
        dataIndex: 'vip',
    },
    {
        title: '所在店铺频道',
        dataIndex: 'pd',
        customRender: ({ index, record }) =>
            <a-cascader value={record.pd} options={data.category} disabled={true} />
    },
    {
        title: '销量',
        dataIndex: 'store_commodity_sum',
    },
    {
        title: '好评度',
        customRender: ({ index, record }) => record.store_commodity_grade * 100 + '%'
    },
    {
        title: '商品ID',
        customRender: ({ index, record }) => record.childer ? record.childer.map(val => <span style='margin-right:0.2rem'>{val}  </span>) : false
    },
    {
        title: '编辑',
        dataIndex: 'store_commodity_sum',
        customRender: ({ index, record }) => <a-button onClick={() => { data.show_data = record; visible.value = true }} type="primary" shape="circle">
            辑
        </a-button>
    },
]
const handleOk = (e) => {
    visible.value = false;
};
function read() {
    request.get('/index/index/getstorecommodity').then(res => {
        console.log(res);
        data.category = res.data.category
        data.cmm_id = res.data.cmm_id
        res.data.data.forEach((val, ks) => {
            data.category.forEach((v, k) => {
                if (v.children) {
                    v.children.forEach((s, s_k) => {
                        if (s.value == val.store_channel_id) {
                            console.log(4545);
                            res.data.data[ks].pd = [v.value, s.value]
                        }
                    })
                }
            })
        })
        data.data = res.data.data
        console.log(res.data.data);
    })
}
read()
</script>
<style lang="less" scoped></style>