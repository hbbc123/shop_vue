<template>
    <HomeIindexTop />
    <RedTop />
    <div class="big_box">
        <LeftBar v-if="data.path" class="LeftBar_box"/>
        <div class="view">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import HomeIindexTop from '../home/compoents/HomeIindexTop.vue'
import RedTop from './compoents/RedTop.vue';
import { useRoute } from 'vue-router';
import { reactive, watch } from 'vue';
import LeftBar from './compoents/LeftBar.vue';
const data = reactive({ path: '' })
const router = useRoute()
watch(() => router.path, () => {
    let i=0
    if(router.path.indexOf('/shipping/comment')==-1){
        i++
    }
    if(router.path.indexOf('/shipping/addcomment')==-1){
        i++
    }
    console.log(i);
    if(i==2){
        data.path=true
    }else {
        data.path=false
    }
},{ immediate: true })

</script>
<style lang="less" scoped>

.big_box {
    margin-top: 1rem !important;
    width: 50rem;
    margin: 0 auto;
    display: flex;
    background-color: #f4f4f4;
}

.view {
    box-sizing: border-box;
}
</style>
