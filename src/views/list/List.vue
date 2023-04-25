<template>
    <div class="list_box">
        <HomeIindexTop class="sdfsdf" />
        <CommoditySeach :hot="data" />
        <ListAll />
        <ListSeachName @del="FnDel" v-if="!platformgoodslogo.data.router" :name="name" :time_val="data.time_val"
            :brand_val="data.brand" />
        <ListHotCmm v-if="platformgoodslogo.data.hot&&platformgoodslogo.data.hot.length>0" :data="platformgoodslogo.data.hot.slice(0, 4)" />
        <ListBrank ref="ListBrankRef" @time="FnTime" @brand="FnBrand" v-if="platformgoods.brand"
            :data="platformgoods.brand" />
        <ListRuoter @del="FnDel" v-if="platformgoodslogo.data.router" :data="platformgoodslogo.data.router" :time_val="data.time_val"
            :brand_val="data.brand" />
        <div class="sdf">
            <div>
                <ListAdvertising v-if="platformgoodslogo.data.hot" :data="platformgoodslogo.data.hot" />
            </div>
            <div>
                <ListCondition @money="FnMoeny" @order="Fnorder" @offset="Fnoffset" :tiao="data.tiao" :limit="data.limit" />
                <ListInfo :data="platformgoods.data" />
                <a-pagination @change="onChange" :pageSize="1" :total="data.tiao / data.limit" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, computed, defineProps, watch } from 'vue';
import { useRouter } from 'vue-router';
import HomeIindexTop from '../home/compoents/HomeIindexTop.vue'
import CommoditySeach from '../commodityInfo/compoents/CommoditySeach.vue';
import request from '@/request/request';
import ListAll from './compoents/ListAll.vue'
import ListSeachName from './compoents/ListSeachName.vue';
import ListHotCmm from './compoents/ListHotCmm.vue';
import ListBrank from './compoents/ListBrank.vue';
import ListRuoter from './compoents/ListRuoter.vue';
import ListCondition from './compoents/ListCondition.vue'
import ListInfo from './compoents/ListInfo.vue'
import ListAdvertising from './compoents/ListAdvertising.vue'
const router = useRouter();
const ListBrankRef = ref(null)
let name = router.currentRoute.value.params.name
console.log(router.currentRoute.value);
const obj = {
    name
}
const Fnoffset = (e) => {
    data.offset = e - 1
    read()
}

function FnDel(e) {
    if (e == 0) {
        data.brand = ''
        ListBrankRef.value.item_key = -1
    } else {
        data.time = ''
        data.time_val = ''
    }
    read()
}

function FnTime(time, val) {
    data.time = time
    data.time_val = val
    read()
}


function FnBrand(e) {
    if (data.brand == e) {
        data.brand = ''
    } else {
        data.brand = e
    }
    read()
}

let arr = [
    {
        "category_son_title": "短袖T恤",
        "category_son_id": 10
    },
    {
        "category_son_title": "短袖衬衫",
        "category_son_id": 11
    },
]
const data = reactive({
    data: { arr: [] },
    page_key: 1,
    offset: 0,
    limit: 5,
    tiao: 0,
    brand: '',
    time: '',
    min: null,
    max: null,
    money_order: 1,
    time_val: '',
    brand_val: '',
})
const platformgoodslogo = reactive({ data: {} })
const platformgoods = reactive({ data: {}, brand: null })

request.get('/index/index/platformgoodslogo', { ...obj }).then(res => {
    console.log(res);
    platformgoodslogo.data = res.data.data
})
const read = () => {
    request.get('/index/index/platformgoods', {
        name,
        limit: data.limit,
        offset: data.offset,
        min_price: data.min ? data.min : -1,
        max_price: data.max ? data.max : -1,
        order: data.money_order,
        brand: data.brand.length > 0 ? data.brand : -1,
        time: data.time.length > 0 ? data.time : -1,
    }).then(res => {

        platformgoods.data = res.data.data.info
        if (!platformgoods.brand) {
            platformgoods.brand = res.data.data.brank
        }
        if (res.data.data.sum) {
            data.tiao = res.data.data.sum
        }
    })
}
read()
function onChange(newdata, olddata) {
    Fnoffset(newdata)
}
function FnMoeny(type, e1, e2) {
    console.log(type, e1, e2);
    if (type == 0) {
        data.min = -1
        data.max = -1
    } else {
        if (e1) {
            data.min = e1
        }
        if (e2) {
            data.max = e2
        }
    }
    read()
}
function Fnorder(e) {
    if (e == 0) return
    const minArr = platformgoods.data
    if (e == 1) {
        minArr.sort((x, y) => y.store_commodity_sum - x.store_commodity_sum)
    }
    if (e == 2) {
        minArr.sort((x, y) => y.comment_sum - x.comment_sum)
    }
    if (e == 3) {
        minArr.sort((x, y) => new Date(y.commodity_info_state_time) - new Date(x.commodity_info_state_time))
    }
    if (e == 4) {
        data.money_order = 1
        read()
    }
    if (e == 5) {
        data.money_order = 0
        read()
    }

    platformgoods.data = minArr

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

<style>
.ant-select-selector {
    display: none !important;
}
</style>
<style lang="less" scoped>
.sdf>div:nth-child(2) {
    flex: 85%;
    box-sizing: border-box;
    padding-left: 0.5rem;
}

.sdf>div:nth-child(1) {
    flex: 15%;
}

.sdf {
    display: flex;
    width: 50rem;
    margin: 0 auto;
    background-color: white;
}

.list_box {
    background-color: white;
}
</style>