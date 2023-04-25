<template>
    <div class="box_info">
        <ListInfoList  v-for="(item,key) in props.data" :key="key" :data="item"/>

    </div>
</template>
<script setup>
import ListInfoList from './ListInfoList.vue';
import { reactive, ref, computed, defineProps, watch } from 'vue';
const props=defineProps(['data'])
console.log(props.data);
</script>
<style lang="less" scoped>

.box_info {
    padding-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
}
</style>