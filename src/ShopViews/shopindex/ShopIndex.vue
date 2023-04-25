<template>
    <a-table :dataSource="data.data" :pagination="false" :columns="columns" />
</template>
<script setup>
import { defineComponent, reactive, ref, watch, toRefs } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import request from '@/request/request';
import { useRouter } from 'vue-router';
const data = reactive({ data: [], channel: [], commodity: [], show_data: {}, update: true })
const router = useRouter()
const visible = ref(null)
const store = useStore()
function FnChange(e, k, t) {
    console.log(e, k, t);
    if (t == 0) {
        data.data[0].banner[k].key = e
    } else if (t == 1) {
        data.data[0].banner_min[k].key = e
    } else if (t == 2) {
        data.data[0].banner_info[k].key = e
    } else if (t == 3) {
        data.data[0].shop_hard[k] = e
    }
}
const columns = [
    {
        title: '首页轮播图',
        dataIndex: 'banner',
        customRender: ({ index, record }) => <div >
            {
                record.banner.map((val, k) => <div style='margin-bottom:0.3rem'>
                    <a-cascader onChange={(e) => FnChange(e, k, 0)} value={val.key} options={data.channel} disabled={data.update} />
                    {
                        !data.update ? <a-button shape="circle" danger disabled={data.update} type="primary" onClick={() => { data.data[0].banner.splice(k, 1) }}>
                            删
                        </a-button> : false
                    }
                </div>)
            }
            {
                !data.update ? <a-button disabled={data.update} type="primary" onClick={() => data.data[0].banner.push({ ...data.data[0].banner[0] })}>
                    添加
                </a-button> : false
            }
        </div >
    },
    {
        title: '次板块',
        dataIndex: 'banner_min',
        customRender: ({ index, record }) => <div >
            {
                record.banner_min.map((val, k) => <div style='margin-bottom:0.3rem'>
                    <a-cascader onChange={(e) => FnChange(e, k, 1)} value={val.key} options={data.channel} disabled={data.update} />
                    {
                        !data.update ? <a-button shape="circle" danger disabled={data.update} type="primary"
                            onClick={() => { data.data[0].banner_min.splice(index, 1) }}>
                            删
                        </a-button> : false
                    }
                </div>)
            }
            {
                !data.update ? <a-button disabled={data.update} type="primary" onClick={() => data.data[0].banner_min.push({ ...data.data[0].banner_min[0] })}>
                    添加
                </a-button> : false
            }
        </div>
    },
    {
        title: '详细列表',
        dataIndex: 'banner_info',
        customRender: ({ index, record }) => <div>
            {
                record.banner_info.map((val, k) => <div style='margin-bottom:0.3rem'>
                    <a-cascader onChange={(e) => FnChange(e, k, 2)} value={val.key} options={data.channel} disabled={data.update} />
                    {
                        !data.update ? <a-button shape="circle" danger disabled={data.update} type="primary"
                            onClick={() => { data.data[0].banner_info.splice(k, 1) }}
                        >
                            删
                        </a-button> : false
                    }
                </div>)
            }
            {
                !data.update ? <a-button disabled={data.update} type="primary" onClick={() => data.data[0].banner_info.push({ ...data.data[0].banner_info[0] })}>
                    添加
                </a-button> : false
            }
        </div>
    },
    {
        title: '大图商品',
        dataIndex: 'shop_hard',
        customRender: ({ index, record }) => <div>
            {
                record.shop_hard.map((val, k) => <div style='margin-bottom:0.3rem'>
                    <a-select onChange={(e) => FnChange(e, k, 3)} value={val} options={data.commodity} disabled={data.update} />
                    {
                        !data.update ? <a-button shape="circle" danger disabled={data.update} type="primary"
                            onClick={() => { data.data[0].shop_hard.splice(k, 1) }}
                        >
                            删
                        </a-button> : false
                    }
                </div>)
            }
            {
                !data.update ? <a-button disabled={data.update} type="primary" onClick={() => data.data[0].shop_hard.push(data.data[0].shop_hard[0])}>
                    添加
                </a-button> : false
            }
        </div>
    },
    {
        title: '操作',
        dataIndex: 'shop_hard',
        customRender: ({ index, record }) => data.update ? <a-button disabled={!store.state.Root} onClick={() => data.update = false} type="primary" shape="circle">
            辑
        </a-button> : <a-button type="primary" onClick={FnSubMit}>
            完成
        </a-button>
    },
]
function FnSubMit(e) {
    data.update = true
    console.log(data.data[0]);
    const info = data.data[0]
    const arr = [[], [], [], []]
    info.banner.forEach(val => {
        arr[0].push([...val.key])
    })
    info.banner_min.forEach(val => {
        arr[1].push([...val.key])
    })
    info.banner_info.forEach(val => {
        arr[2].push([...val.key])
    })
    info.shop_hard.forEach(val => {
        arr[3].push(val)
    })
    console.log(arr);
    if (store.state.Root) {
        request.post('/index/index/setshophome', { data: arr }).then(res => {
            if (res.data.code == 200) {
                read()
            }
        })
    }
}
function read() {
    request.get('/index/index/getshophome').then(res => {
        console.log(res);
        data.data = res.data.data
        data.channel = res.data.channel
        data.commodity = res.data.commodity
    })
}
read()
</script>
<style lang="less"></style>