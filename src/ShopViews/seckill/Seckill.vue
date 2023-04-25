<template v-if="data.data[0].value">
    <a-table :pagination="false" :data-source="data.data" :columns="columns">
    </a-table>
</template>
<script setup>
import { defineComponent, reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import request from '@/request/request';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore()
const set = ref(false)
const data = reactive({ data: [], show_data: [], commodity: [] })
const router = useRouter()
function read() {
    request.get('/index/index/getshopseckill').then(res => {
        console.log(res);
        data.data = res.data.data
        data.commodity = res.data.commodity
        console.log(data.data);
    })
}
read()
const columns = [
    {
        title: '秒杀ID',
        dataIndex: 'value',
    },
    {
        title: '秒杀时间',
        dataIndex: 'label',
    },
    {
        title: '秒杀商品ID',
        customRender: ({ index, record }) => <div>
            {
                data.data[index].cmm.map((val, k) => <div>
                    {!data.data[index].show ? val.commodity_info_id :
                        <div>
                            <a-select
                                value={val.commodity_info_id}
                                onChange={(e) => FnInputChange(e, index, k)}
                                style="width: 120px"
                                options={data.commodity}
                            ></a-select>
                            <a-button onClick={(e) => { FnDel(index, k) }} type="primary" danger shape="circle" dar>
                                删
                            </a-button>
                        </div>
                    }

                </div >)
            }
            {
                data.data[index].show ? <a-button onClick={() => { FnAdd(index) }} type="primary" >
                    添加
                </a-button> : false
            }
        </div>
    },
    {
        title: '操作',
        customRender: ({ index, record }) => !data.data[index].show && store.state.Root ? <a-button onClick={(e) => { data.data[index].show = true }} type="primary" shape="circle">
            辑
        </a-button> : <a-button onClick={() => { FnSubMit(index) }} type="primary" >
            完成
        </a-button>
    },
]
function FnSubMit(e) {
    const min_arr = [];
    let tf = true
    if (data.data[e].cmm.length >= 0) {
        data.data[e].cmm.forEach(val => {
            if (min_arr.indexOf(parseInt(val.commodity_info_id)) == -1) {
                min_arr.push(parseInt(val.commodity_info_id))
            } else {
                tf = false
                read()
                message.error('不能有相同商品')
            }
        });
        if (tf) {
            console.log(min_arr);
            request.post('/index/index/setshopseckill', {
                seckill_time_id: data.data[e].value,
                info: min_arr
            }).then(res => {
                if (res.data.code == 200) {
                    read()
                }
            })
        }
    }
    data.data[e].show = false
}
function FnInputChange(e, i, k) {
    console.log(e);
    data.data[i].cmm[k].commodity_info_id = e
}
function FnDel(i, k) {
    data.data[i].cmm.splice(k, 1)
}
function FnAdd(i, k) {
    data.data[i].cmm.push({ ...data.data[i].cmm[0] })
}
</script>
<style lang="less" scoped></style>