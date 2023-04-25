<template>
    <div class="box_big">
        <div class="box">
            <div class="box_img">

            </div>
            <HomeComponentsSeach :read="true" ref="ref_HomeComponentsSeach" :tf="true" style="margin-right: 10rem;" />
        </div>
    </div>
</template>
<script setup>
import HomeComponentsSeach from '../../../components/homeview/HomeComponentsSeach.vue'
import { ref, reactive, defineProps, watch } from 'vue';
const ref_HomeComponentsSeach = ref(null)
const props = defineProps(['hot'])
watch(()=>props.hot, () => {
    if(props.hot){
        ref_HomeComponentsSeach.value.Hot_word.data = props.hot
    }
})
</script>
<style lang="less" scoped>
.box_big {
    width: 100vw;
    background-color: white;

}

.box {
    width: 50rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

.box_img {
    width: 270px;
    background-position: 0  0.7rem;
    background-image: url('../../../assets/img/jdlogo-201708-@1x.png');
    background-repeat: no-repeat;
}
</style>