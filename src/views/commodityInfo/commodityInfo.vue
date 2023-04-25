<template>
    <div class="comm_box">
        <HomeIindexTop :home="true" />
        <CommoditySeach :hot="data.data.shop_hot" />
        <div style="padding: 0.7rem 0; background-color: white;"
            v-if="data.data.shop_img && data.data.shop_hard && data.data.channel">
            <CommodityHard :shop_img="data.data.shop_img" :shop_hard="data.data.shop_hard" :channel="data.data.channel" />
        </div>
        <CommodityNav v-if="data.data.channel" :channel="data.data.channel" :shop_id="data.data.shop_id" />
        <router-view :key='router.currentRoute._rawValue.fullPath'></router-view>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import HomeIindexTop from '../home/compoents/HomeIindexTop.vue'
import CommoditySeach from './compoents/CommoditySeach.vue';
import CommodityHard from './compoents/CommodityHard.vue';
import CommodityNav from './compoents/CommodityNav.vue';

import request from '@/request/request';
import { ref, reactive, defineProps, watch } from 'vue';

const router = useRouter();
const route = useRoute();
const data = reactive({ data: {},shop_id:0 })
let id = router.currentRoute.value.params.id
const s = route.path.split('/')[1] + '/' + route.path.split('/')[2]
console.log(route.path, 888,);
if ('shop/goosIndex'.indexOf(s) == -1) {
    request.get('/index/index/commodityinfo', { id,tf:false }).then(res => {
        console.log(res.data.data,7777777777777777);
        data.data = res.data.data
        data.shop_id=id
    })
} else {
    request.get('/index/index/commodityinfo', { id }).then(res => {
        console.log(res.data.data,7777777777777777);
        data.data = res.data.data
    })
}


</script>
<style lang="less" scoped>
.comm_box {
    overflow-x: hidden;
}
</style>