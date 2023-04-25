<template>
    <div class="fixed_box_big">
        <div class="fixed_box">
            <div class="img"></div>
            <HomeComponentsSeach  ref="HomeComponentsRef" :tf="false"/>
        </div>
    </div>
</template>
<script setup>
import HomeComponentsSeach from '@/components/homeview/HomeComponentsSeach.vue';
import { ref,defineProps } from 'vue';
const HomeComponentsRef = ref(null)
const props = defineProps(['Hot_word'])
defineExpose({
    Hot_word: HomeComponentsRef
});
</script>
<style lang="less" scoped>
.img {
   background: url('../../../assets/img/sprite.png');
   height: 2rem;
   width: 5rem;
   margin-top: 0.5rem;
   background-position: 0px -4.5rem;
   background-repeat: no-repeat;

}
.fixed_box_big {
    width: 100vw;
    background-color: white;
    padding-bottom: 0.5rem;
    box-sizing: border-box;
    padding-left: 6rem;
  
    border-bottom:2px solid #f10214;
}
.fixed_box {
    width: 50rem;
    margin: 0 auto;
    display: flex;
}
</style>