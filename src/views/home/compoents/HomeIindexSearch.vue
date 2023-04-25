<template>
    <div class="search_box">
        <div>
            <div><img src="../../../assets/img/105f3d456f0905bb.jpg" alt=""></div>
            <div>
            <HomeComponentsSeach :tf="true" ref="HomeComponentsRef" :Fixedsearch="props.Fixedsearch" />
                <div class="center_botton" v-if="props.Iindex_Top">
                    <span class="Iindex_Top" v-for="(i, k) in props.Iindex_Top.Channel_Data.data.slice(5, 14)" :key="k">
                        {{
    i.category_parent_title
                        }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import HomeComponentsSeach from '../../../components/homeview/HomeComponentsSeach.vue'
import { ref, reactive, onBeforeMount, defineProps } from 'vue';
const HomeComponentsRef = ref(null)
const props = defineProps(['Iindex_Top','Fixedsearch'])
defineExpose({
    Hot_word: HomeComponentsRef
});
</script>
<style lang="less" >
.Iindex_Top:hover {
    color: #e1251b;
 
}

.candidate {
    width: 17.75rem;
    display: block;
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    left: -0.15rem;
    top: 1.35rem;
    z-index: 2;
    display: none;
    box-sizing: border-box;
}

.my_car_div {
    width: 20rem;
    height: 10rem;
    position: absolute;
    background-color: white;
    z-index: 1;
    border: 1px solid #e1251b !important;
    top: 1.4rem;
    left: -0.02rem;
    display: none;
}
.center_botton {
    display: flex;
    box-sizing: border-box;
    padding-left: 4rem;
    margin-top: 0.4rem;
}

.center_botton>span {
    font-size: 0.6rem;
    font-weight: 520;
    padding: 0.1rem 0.4rem !important;
    color: #666;
}

.my_car_div::before {
    content: '';
    position: absolute;
    left: 0;
    width: 4.95rem;
    top: -0.05rem;
    border: 2px solid white !important;

}

.change_card {
    border: 1px solid #e1251b !important;
}

.my_car {
    margin-top: 0.8rem;
    margin-left: 2rem;
    width: 5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border: 1px solid #eee;
    color: #e1251b;
    position: relative;
    z-index: 2;

    img {
        width: 0.8rem;
        height: 0.8rem;
        display: inline-block;
        margin-top: -0.2rem;
    }
}

input {
    background: none;
    outline: none;
    border: none;
}

.center_top {
    display: flex;
}

.center_top_search {
    width: 20rem;
    height: 1.5rem;
    border: 0.15rem solid #e1251b;
    margin-left: 5rem;
    margin-top: 0.8rem;
    display: flex;
    position: relative;

    input {
        margin-left: 0.5rem;
        width: 19.5rem;
    }

    div {
        width: 2.5rem;
        height: 110%;
        margin-top: -0.06rem;
        background-color: #e1251b;
    }

    div:hover {
        background-color: #c81623;
    }
}

.search_box {
    width: 100%;
    background-color: white;
    margin-bottom: 0.2rem;

}

.search_box>div>div>img {
    width: 8rem;
    height: 4.8rem;
}

.search_box>div {
    width: 50rem;
    margin: 0 auto;
    display: flex;
}
</style>