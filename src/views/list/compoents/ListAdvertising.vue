<template>
    <div class="gg_box_sd" v-if="props.data&&props.data.length>0">
        <div class="title_sdf">
            <div>商品精选</div>
            <div>广告</div>
        </div>
        <ListAdvertisingList  v-for="(item,key) in props.data" :key="key" :data="item"/>
    </div>
</template>
<script setup>
import ListAdvertisingList from './ListAdvertisingList.vue';
import { reactive, ref, computed, defineProps, watch } from 'vue';
const props=defineProps(['data'])
</script>
<style lang="less" scoped>
.title_sdf>div:nth-child(1) {
    font-weight: 700;
    color: #666;
}

.title_sdf>div:nth-child(2) {
    color: #e3e3e3;
    font-size: 0.4rem;
}

.title_sdf {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0.3rem;

}

.gg_box_sd {
    border: 1px solid #ddd;
}
</style>