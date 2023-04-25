<template>
    <ShopIndexBanner/>
</template>
<script setup>
import ShopIndexBanner from './compoents/ShopIndexBanner.vue';
import request from '@/request/request';
import { useRouter } from 'vue-router';
const router = useRouter();
let shop_id = router.currentRoute.value.params.id

// request.get('/index/index/getshopindex',{shop_id}).then(res=>{
//     console.log(res.data);
// })
</script>
<style lang="less" scoped></style>