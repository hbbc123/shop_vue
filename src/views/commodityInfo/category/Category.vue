<template>
    <div class="big_box">
        <CategoryNav :id="id"></CategoryNav>
        <div>
            <div class="select_box">
                <ul class="ul_se">
                    <li>
                        <ul>
                            <li @click="data.select == 0 ? data.order = !data.order : data.select = 0"
                                :class="data.select == 0 ? 'changebgc' : ''"><arrow-up-outlined
                                    v-if="data.select == 0 && data.order == true" />
                                <arrow-down-outlined v-if="data.select == 0 && data.order == false" />上架时间
                            </li>
                            <li @click="data.select == 1 ? data.order = !data.order : data.select = 1"
                                :class="data.select == 1 ? 'changebgc' : ''"><arrow-up-outlined
                                    v-if="data.select == 1 && data.order == true" /> <arrow-down-outlined
                                    v-if="data.select == 1 && data.order == false" />好评度</li>
                            <li @click="data.select == 2 ? data.order = !data.order : data.select = 2"
                                :class="data.select == 2 ? 'changebgc' : ''"><arrow-up-outlined
                                    v-if="data.select == 2 && data.order == true" /> <arrow-down-outlined
                                    v-if="data.select == 2 && data.order == false" />价格</li>
                            <li @click="data.select == 3 ? data.order = !data.order : data.select = 3"
                                :class="data.select == 3 ? 'changebgc' : ''"><arrow-up-outlined
                                    v-if="data.select == 3 && data.order == true" /> <arrow-down-outlined
                                    v-if="data.select == 3 && data.order == false" />销量</li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li>共116件商品</li>
                            <li><span class="ce">{{ data.firstpage }}</span>/{{ data.totalpages }}</li>
                            <li :class="data.firstpage == 1 ? 'f' : 't'"
                                @click="data.firstpage == 1 ? false : data.firstpage--"><left-outlined /></li>
                            <li :class="data.totalpages == data.firstpage ? 'f' : 't'"
                                @click="data.totalpages != data.firstpage ? data.firstpage++ : false"><right-outlined />
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="list_box">
                <ProductList @FnChangeImgKey="FnChangeImgKey" v-for="(item, key) in  axios_info.data" :key="key"
                    :index="key" :data="item" />
            </div>
        </div>
    </div>
</template>
<script setup>
import CategoryNav from './compoents/CategoryNav.vue';
import { useRouter } from 'vue-router';
import {
    LeftOutlined,
    RightOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons-vue';
import { ref, reactive, defineProps, watch } from 'vue';
import request from '@/request/request';
import ProductList from '@/components/commodityInfoView/ProductList.vue';
const router = useRouter()
const { id, type, gory_id } = router.currentRoute.value.params
console.log(id, type, gory_id);
const data = reactive({ firstpage: 1, totalpages: 5, select: 0, order: true })
const axios_info = reactive({ data: [] })
request.get('/index/index/shopcminfo', { id, type, gory_id }).then(res => {
    console.log(res);
    axios_info.data = res.data.data
})
const FnChangeImgKey = (index, key) => {
    axios_info.data[index].key = key
}
const FnChangeSelect = (select, order, arr) => {
    let min_arr = [];
    function s(obj1, obj2, str) {
        if (obj1[str] < obj2[str]) {
            return -1
        } else if (obj1[str] > obj2[str]) {
            return 1
        } else {
            return 0
        }
    }
    if (select == 0) {
        if (order == true) {
            arr.sort((a, b) => s(a, b, 'commodity_info_state_time'))
        } else {
            arr.sort((a, b) => s(b, a, 'commodity_info_state_time'))
        }
    }
    if (select == 1) {
        if (order == true) {
            arr.sort((a, b) => a.store_commodity_grade * 1 < b.store_commodity_grade * 1 ? -1 : a.store_commodity_grade * 1 > b.store_commodity_grade * 1 ? 1 : 0)
        } else {
            arr.sort((a, b) => b.store_commodity_grade * 1 < a.store_commodity_grade * 1 ? -1 : b.store_commodity_grade * 1 > a.store_commodity_grade * 1 ? 1 : 0)
        }
    }
    if (select == 2) {
        if (order == true) {
            arr.sort((a, b) => {
                const a1 = a.activity_tf == 0 ? a.commodity_info_data.data[0].money : a.commodity_info_activity.data[0].money
                const a2 = b.activity_tf == 0 ? b.commodity_info_data.data[0].money : b.commodity_info_activity.data[0].money
                if (a1 < a2) {
                    return -1
                } else if (a1 > a2) {
                    return 1
                } else {
                    return 0
                }
            })

        } else {
            arr.sort((a, b) => {
                const a1 = a.activity_tf == 0 ? a.commodity_info_data.data[0].money : a.commodity_info_activity.data[0].money
                const a2 = b.activity_tf == 0 ? b.commodity_info_data.data[0].money : b.commodity_info_activity.data[0].money
                if (a1 < a2) {
                    return 1
                } else if (a1 > a2) {
                    return -1
                } else {
                    return 0
                }
            })
        }
    }
    if(select == 3){
        if (order == true) {
            arr.sort((a, b) => s(a, b, 'store_commodity_sum'))
        } else {
            arr.sort((a, b) => s(b, a, 'store_commodity_sum'))
        }
    }
    return arr
}
watch(() => data.select, () => {
    axios_info.data = FnChangeSelect(data.select, data.order, axios_info.data)
})
watch(() => data.order, () => {
    axios_info.data = FnChangeSelect(data.select, data.order, axios_info.data)
})
</script>
<style lang="less" scoped>
.changebgc {
    background-color: #e4393c !important;
    color: white !important;
    border: 1px solid #e4393c !important;
}

.t {
    border: 1px solid #333333;
    color: #333333;
}

.f {
    border: 1px solid #c9c9c9;
    color: #c9c9c9;
}

.ul_se>li:nth-child(1) {
    ul {
        display: flex;
        justify-content: space-between;
        margin-left: 0.3rem;
        margin-top: 0.2rem;

        li {
            cursor: pointer;
            background-color: white;
            padding: 0.1rem 0.3rem;
            border: 1px solid #e1e1e1;
            color: #333333;
        }
    }
}

.ul_se>li:nth-child(2) {
    ul {
        display: flex;
        justify-content: space-between;
        margin-top: 0.2rem;
    }

    li {
        cursor: pointer;
        margin-right: 0.3rem;
    }

    ul>li:nth-child(1) {
        color: #999;
    }

    ul>li:nth-child(2) {
        color: #666666;
    }

    ul>li:nth-child(1),
    ul>li:nth-child(2) {
        line-height: 1rem;
    }

    ul>li:nth-last-child(1),
    ul>li:nth-last-child(2) {
        cursor: pointer;
        background-color: white;
        padding: 0.1rem 0.3rem;
        line-height: 1rem;

        padding: 0 0.3rem;
        border-radius: 2px;
    }

    ul>li:nth-last-child(2) {
        margin-right: 0.3rem;
    }
}

.ul_se {
    background-color: #F8F8F8;
    height: 1.5rem;
    margin-left: 0.5rem;
    display: flex;
    justify-content: space-between;

}

.select_box {
    width: 100%;
    background-color: white;
    height: 2rem;
    padding-bottom: 2rem;
    margin-bottom: 0;
}

.list_box>div:nth-child(4n) {
    margin-right: 0rem !important;
}

.list_box>div {
    margin-bottom: 0.3rem;
    margin-right: 1.165rem;
}

.list_box {
    width: 40rem;
    background-color: white;
    box-sizing: border-box;
    padding-left: 0.5rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.big_box {
    width: 50rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
</style>